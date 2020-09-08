import {getInvestProductList, searchStockByKeyword} from "./tickle";

export const stockListsDB = [
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
    stockType: "STOCK_US"
    
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
    stockType:"STOCK_US"
  },
  {
    nameKo: "디즈니",
    nameEng: "Disney",
    symbol: "DIS",
    sector: "personality",
    stockType: "STOCK_US"
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
    stockType: "STOCK_US"
  },
  {
    nameKo: "스타벅스",
    nameEng: "Starbucks",
    symbol: "SBUX",
    sector: "futures",
    stockType: "STOCK_US"
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
    stockType: "STOCK_US"
  },
  {
    nameKo: "켈로그",
    nameEng: "Kellogg's",
    symbol: "K",
    sector: "personality",
    stockType: "STOCK_US"
  },
  {
    nameKo: "시티그룹",
    nameEng: "Citigroup",
    symbol: "C",
    sector: "index",
    stockType: "STOCK_US"
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
    stockType: "STOCK_US"
  },
  {
    nameKo: "엔비디아",
    nameEng: "NVIDIA",
    symbol: "NVDA",
    sector: "theme",
    stockType: "STOCK_US"
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
    stockType: "STOCK_US"
  },
  {
    nameKo: "쓰리엠",
    nameEng: "3M",
    symbol: "MMM",
    sector: "theme",
    stockType: "STOCK_US"
  },
  {
    nameEn: "Global X Social Media ETF",
    nameKo: "SNS",
    symbol: "SOCL",
    sector: "theme",
    stockType: "ETF-US"
  },
  {
    nameEn: "Global X FinTech ETF",
    nameKo: "핀테크",
    symbol: "FINX",
    sector: "theme",
    stockType: "ETF-US"
  },
  {
    nameEn: "iShares Core Conservative Allocation ETF",
    nameKo: "안정 추구형",
    symbol: "AOK",
    sector: "tendency",
    stockType: "ETF-US"
  },
  {
    nameEn: "iShares Core Growth Allocation ETF",
    nameKo: "적극 투자형",
    symbol: "AOR",
    sector: "tendency",
    stockType: "ETF-US"
  },
  {
    nameEn: "iShares Gold Trust",
    nameKo: "금",
    symbol: "IAU",
    sector: "futures",
    stockType: "ETF-US"
  },
  {
    nameEn: "Invesco DB U.S. Dollar Index Bullish Fund",
    nameKo: "달러",
    symbol: "UUP",
    sector: "futures",
    stockType: "ETF-US",
  },
  {
    nameEn: "SPDR S&P 500 ETF Trust",
    nameKo: "S&P 500",
    symbol: "SPY",
    sector: "index",
    stockType: "ETF-US",
  },
  {
    nameEn: "Invesco QQQ Trust",
    nameKo: "NASDAQ 100",
    symbol: "QQQ",
    sector: "index",
    stockType: "ETF-US",
  }
];

export const test = (_keyword, _stockType) => {
  //const { keyword, stockType } = event.arguments;
  const stockLists = getInvestProductList(_stockType, stockListsDB);
  const searchResults = searchStockByKeyword(
    _keyword === "" ? "ALL" : _keyword,
    stockLists
  );
  return searchResults;
}



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