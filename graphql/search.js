import { querySkIndex } from "../../../../../libs/dynamodb";

// 검색어와, 주식 정보 리스트를 받아 검색 결과를 return
export const searchStockByKeyword = (_keyword, _stockLists) => {
  try {
    const languageToFind = refineKeyword(_keyword); // 영어로만 이루어져 있는지, 한글 검색가능 포맷에 일치하는지 체크, 맞다면 eng or ko return.

    switch (languageToFind) {
      case "ko": {
        return searchStockInKo(_keyword, _stockLists);
      }
      case "eng": {
        return searchStockInEng(_keyword, _stockLists);
      }
      default: {
        return [];
      }
    }
  } catch (err) {
    throw new ErrorHandler(err, "ERR_INTERNAL_SERVER");
  }
};

const refineKeyword = (_keyword) => {
  try {
    const checkKo = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;  //한글체크
    const checkEng = /^[a-zA-Z&-. 0-9]*$/;   //영어체크
    if (_keyword.match(checkKo)){ 
      return "ko";
    }
    if(_keyword.match(checkEng)){
      return "eng";
      }
    else return [];
  } catch (err) {
    throw new ErrorHandler(err, "ERR_INTERNAL_SERVER");
  }  
};

// 아래 둘이 실제 검색 기능
const searchStockInKo = (_keyword, _stockLists) => {
  try {
    const searchStockInKoResults = [];

    //초성검색_stockLists에 초성필드 추가
    _stockLists.forEach((stock) => {
      const disassemble = Hangul.disassemble(stock.nameKo, true);
      const initial = disassemble.reduce((prev, elem) => {
        elem = elem[0] ? elem[0] : elem;
        return prev + elem;
      }, "");
      stock.disassembled = initial;
  });
    //문자검색 || 초성검색
    for(let stock of _stockLists){
      if(Hangul.search(stock.nameKo,_keyword) >= 0 || stock.disassembled.includes(_keyword) == 1 ){
        searchStockInKoResults.push(stock);
      }
    }
    return searchStockInKoResults;
  } catch (err) {
    throw new ErrorHandler(err, "ERR_INTERNAL_SERVER");
  }
};


const searchStockInEng = (_keyword, _stockLists) => {
  //키워드 조건에 맞는 stock obj array
  try {
    const searchStockInEngResults = _stockLists.filter (
      _stockLists => _stockLists.nameEng.toLowerCase().includes(_keyword.toLowerCase()) || 
      _stockLists.symbol.toLowerCase().includes(_keyword.toLowerCase())
      );
    return searchStockInEngResults;
  } catch (err) {
    throw new ErrorHandler(err, "ERR_INTERNAL_SERVER");
  }
};

export const getInvestProductList = async (_productName) => {
  let produceObj = [];

  switch (_productName) {
    case "all": {
      produceObj.push(...(await querySkIndex("stockDetail"))); // 주식 db쿼리로 채워주고
      produceObj.push(...(await querySkIndex("stockDetail-ETF"))); // etf db쿼리로 채워주고
      break;
    }
    case "usStock": {
      produceObj.push(...(await querySkIndex("stockDetail"))); // 주식 db쿼리로 채워주고
      break;
    }
    case "usETF": {
      produceObj.push(...(await querySkIndex("stockDetail-ETF"))); // etf db쿼리로 채워주고
      break;
    }
    default: {
      break;
    }
  }
  return produceObj;
};


