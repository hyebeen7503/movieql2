import * as Hangul from "hangul-js";

export const searchStockByKeyword = (_keyword, _stockLists) => {
    const languageToFind = refineKeyword(_keyword);
    switch (languageToFind) {
      case "ko": {
        return searchStockInKo(_keyword, _stockLists);
      }
      case "eng": {
        console.log("영어로 인식");
        return searchStockInEng(_keyword, _stockLists);
      }
      case "all": {
        console.log("all로 인식");
        return _stockLists;
      }
      default: {
        return [];
      }
  };
}

export const searchStockInKo = (_keyword, _stockLists) => 
{
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
}

export const searchStockInEng = (_keyword, _stockLists) => 
{
  const searchStockInEngResults = _stockLists.filter (
    _stockLists => _stockLists.nameEng.toLowerCase().includes(_keyword.toLowerCase()) || 
    _stockLists.symbol.toLowerCase().includes(_keyword.toLowerCase())
    );
  return searchStockInEngResults;
} 

export const refineKeyword = (_keyword) => {
      const checkKo = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣 ]*$/;  //한글체크                                                                                                                                                   
      const checkEng = /^[a-zA-Z&-. 0-9]*$/;   //영어, 특수문자, 숫자 체크
      // const checkNull = /^\s+|\s+$/g;
      if (_keyword.match(checkKo)){ 
        return "ko";
      }
      if(_keyword.match(checkEng)){
        if(_keyword == "ALL")
        return "all"
      else return "eng";
      }
      else {
        return "오류";
      }
  };

  export const getInvestProductList = (_stockType, _stockLists) => {
    let produceObj = [];
  
    switch (_stockType) {
      case "ALL": {
        _stockLists.forEach((stock)=> {if(stock.stockType === "STOCK_US"){produceObj.push(stock);}});
        _stockLists.forEach((stock)=> {if(stock.stockType === "ETF_US"){produceObj.push(stock);}});
        break;
      }
      case "STOCK_US": {
        _stockLists.forEach((stock)=> {if(stock.stockType === "STOCK_US"){produceObj.push(stock);}});
        break;
      }
      case "ETF_US": {
        _stockLists.forEach((stock)=> {if(stock.stockType === "ETF_US"){produceObj.push(stock);}});
        break;
      }
        default: {
        break;
      }
    };
    return produceObj;
  }