import * as Hangul from 'hangul-js';

export const people = [
    {
      id: "0",
      name: "Nicolas",
      age: 18,
      gender: "female"
    },
    {
      id: "1",
      name: "Jisu",
      age: 18,
      gender: "female"
    },
    {
      id: "2",
      name: "Japan Guy",
      age: 18,
      gender: "male"
    }
  ];

  export const getById = id  => {
      const filteredPeople = people.filter(person => person.id === String(id));
      return filteredPeople[0];
  }

export const stockLists = [
  {
    nameKo: "애플",
    nameEng: "Apple",
    symbol: "AAPL",
    sector: "index",
    stockType: "STOCK_US"
  },
  {
    nameKo: "아마존",
    nameEng: "Amazon",
    symbol: "AMZN",
    sector: "futures",
    stockType: "STOCK_US"
  },
  {
    nameKo: "테슬라",
    nameEng: "Tesla",
    symbol: "TSLA",
    sector: "personality",
    stockType: "ETF_US"
    
  },
  {
    nameKo: "마이크로소프트",
    nameEng: "Microsoft",
    symbol: "MSFT",
    sector: "index",
    stockType: "STOCK_US"
  },
  {
    nameKo: "페이스북",
    nameEng: "Facebook",
    symbol: "FB",
    sector: "futures",
    stockType:"ETF_US"
  },
  {
    nameKo: "디즈니",
    nameEng: "Disney",
    symbol: "DIS",
    sector: "personality",
    stockType: "ETF_US"
  },
  {
    nameKo: "넷플릭스",
    nameEng: "Netflix",
    symbol: "NFLX",
    sector: "futures",
    stockType: "STOCK_US"
  },
  {
    nameKo: "구글",
    nameEng: "Google",
    symbol: "GOOGL",
    sector: "personality",
    stockType: "ETF_US"
  },
  {
    nameKo: "스타벅스",
    nameEng: "Starbucks",
    symbol: "SBUX",
    sector: "futures",
    stockType: "ETF_US"
  },
  {
    nameKo: "코카콜라",
    nameEng: "Coca-Cola",
    symbol: "KO",
    sector: "personality",
    stockType: "STOCK_US"
  },
  {
    nameKo: "티파니앤코",
    nameEng: "Tiffany & Co.",
    symbol: "TIF",
    sector: "personality",
    stockType: "ETF_US"
  },
  {
    nameKo: "켈로그",
    nameEng: "Kellogg's",
    symbol: "K",
    sector: "personality",
    stockType: "ETF_US"
  },
  {
    nameKo: "시티그룹",
    nameEng: "Citigroup",
    symbol: "C",
    sector: "index",
    stockType: "ETF_US"
  },
  {
    nameKo: "델타항공",
    nameEng: "Delta Air Lines",
    symbol: "DAL",
    sector: "theme",
    stockType: "STOCK_US"
  },
  {
    nameKo: "포드",
    nameEng: "Ford",
    symbol: "F",
    sector: "futures",
    stockType: "ETF_US"
  },
  {
    nameKo: "엔비디아",
    nameEng: "NVIDIA",
    symbol: "NVDA",
    sector: "theme",
    stockType: "ETF_US"
  },
  {
    nameKo: "에이엠디",
    nameEng: "AMD",
    symbol: "AMD",
    sector: "index",
    stockType: "STOCK_US"
  },
  {
    nameKo: "몬스터 베버리지",
    nameEng: "Monster Beverage",
    symbol: "MNST",
    sector: "personality",
    stockType: "STOCK_US"
  },
  {
    nameKo: "월마트",
    nameEng: "Walmart",
    symbol: "WMT",
    sector: "theme",
    stockType: "ETF_US"
  },
  {
    nameKo: "쓰리엠",
    nameEng: "3M",
    symbol: "MMM",
    sector: "theme",
    stockType: "ETF_US"
  }
];

//ETF전체검색할때, sector별로 구분해서 새로운 리스트 생성
export const etfGroupBySector = (_sector,_stockLists) => {
  let produceObj = [];

  switch (_sector) {
    case "index": {
      _stockLists.forEach((stock)=> {if(stock.sector == "index"){produceObj.push(stock);}});
      break;
    }
    case "futures": {
      _stockLists.forEach((stock)=> {if(stock.sector == "futures"){produceObj.push(stock);}});
      break;
    }
    case "personality": {
      _stockLists.forEach((stock)=> {if(stock.sector == "personality"){produceObj.push(stock);}});
      break;
    }
    case "theme": {
      _stockLists.forEach((stock)=> {if(stock.sector == "theme"){produceObj.push(stock);}});
      break;
    }
    case "":{
      _stockLists.forEach((stock)=> {if(stock.sector == "index" || "futures" || "personality" || "theme"){produceObj.push(stock);}});
      break;
    }
      default: {
      break;
    }
  };
  return produceObj;
}

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

//초성검색 안하려면 이거
// export const searchStockInKo = (_keyword, _stockLists) => 
// {
//   var searchStockInKoResults = [];
//   for(let stock of _stockLists){
//     if(Hangul.search(stock.nameKo,_keyword) >= 0){
//       searchStockInKoResults.push(stock);
//     }
//   }
//   return searchStockInKoResults;
// }



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
        if(_keyword === "ALL")
        return "all"
      else return "eng";
      }
      else {
        return "오류..?";
      }
  };

