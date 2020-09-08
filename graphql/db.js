import {getInvestProductList, searchStockByKeyword, etfGroupBySector} from "./tickle";

export const stockListsDB = [
  {
    nameKo: "애플",
    nameEn: "Apple",
    symbol: "AAPL",
    sector: "index",
    stockType: "STOCK_US"
  },
  {
    nameKo: "아마존",
    nameEn: "Amazon",
    symbol: "AMZN",
    sector: "futures",
    stockType: "STOCK_US"
  },
  {
    nameKo: "테슬라",
    nameEn: "Tesla",
    symbol: "TSLA",
    sector: "personality",
    stockType: "STOCK_US"
    
  },
  {
    nameKo: "마이크로소프트",
    nameEn: "Microsoft",
    symbol: "MSFT",
    sector: "index",
    stockType: "STOCK_US"
  },
  {
    nameKo: "페이스북",
    nameEn: "Facebook",
    symbol: "FB",
    sector: "futures",
    stockType:"STOCK_US"
  },
  {
    nameKo: "디즈니",
    nameEn: "Disney",
    symbol: "DIS",
    sector: "personality",
    stockType: "STOCK_US"
  },
  {
    nameKo: "넷플릭스",
    nameEn: "Netflix",
    symbol: "NFLX",
    sector: "futures",
    stockType: "STOCK_US"
  },
  {
    nameKo: "구글",
    nameEn: "Google",
    symbol: "GOOGL",
    sector: "personality",
    stockType: "STOCK_US"
  },
  {
    nameKo: "스타벅스",
    nameEn: "Starbucks",
    symbol: "SBUX",
    sector: "futures",
    stockType: "STOCK_US"
  },
  {
    nameKo: "코카콜라",
    nameEn: "Coca-Cola",
    symbol: "KO",
    sector: "personality",
    stockType: "STOCK_US"
  },
  {
    nameKo: "티파니앤코",
    nameEn: "Tiffany & Co.",
    symbol: "TIF",
    sector: "personality",
    stockType: "STOCK_US"
  },
  {
    nameKo: "켈로그",
    nameEn: "Kellogg's",
    symbol: "K",
    sector: "personality",
    stockType: "STOCK_US"
  },
  {
    nameKo: "시티그룹",
    nameEn: "Citigroup",
    symbol: "C",
    sector: "index",
    stockType: "STOCK_US"
  },
  {
    nameKo: "델타항공",
    nameEn: "Delta Air Lines",
    symbol: "DAL",
    sector: "theme",
    stockType: "STOCK_US"
  },
  {
    nameKo: "포드",
    nameEn: "Ford",
    symbol: "F",
    sector: "futures",
    stockType: "STOCK_US"
  },
  {
    nameKo: "엔비디아",
    nameEn: "NVIDIA",
    symbol: "NVDA",
    sector: "theme",
    stockType: "STOCK_US"
  },
  {
    nameKo: "에이엠디",
    nameEn: "AMD",
    symbol: "AMD",
    sector: "index",
    stockType: "STOCK_US"
  },
  {
    nameKo: "몬스터 베버리지",
    nameEn: "Monster Beverage",
    symbol: "MNST",
    sector: "personality",
    stockType: "STOCK_US"
  },
  {
    nameKo: "월마트",
    nameEn: "Walmart",
    symbol: "WMT",
    sector: "theme",
    stockType: "STOCK_US"
  },
  {
    nameKo: "쓰리엠",
    nameEn: "3M",
    symbol: "MMM",
    sector: "theme",
    stockType: "STOCK_US"
  },
  {
    nameEn: "Global X Social Media ETF",
    nameKo: "SNS",
    symbol: "SOCL",
    sector: "theme",
    stockType: "ETF_US"
  },
  {
    nameEn: "Global X FinTech ETF",
    nameKo: "핀테크",
    symbol: "FINX",
    sector: "theme",
    stockType: "ETF_US"
  },
  {
    nameEn: "iShares Core Conservative Allocation ETF",
    nameKo: "안정 추구형",
    symbol: "AOK",
    sector: "tendency",
    stockType: "ETF_US"
  },
  {
    nameEn: "iShares Core Growth Allocation ETF",
    nameKo: "적극 투자형",
    symbol: "AOR",
    sector: "tendency",
    stockType: "ETF_US"
  },
  {
    nameEn: "iShares Gold Trust",
    nameKo: "금",
    symbol: "IAU",
    sector: "futures",
    stockType: "ETF_US"
  },
  {
    nameEn: "Invesco DB U.S. Dollar Index Bullish Fund",
    nameKo: "달러",
    symbol: "UUP",
    sector: "futures",
    stockType: "ETF_US",
  },
  {
    nameEn: "SPDR S&P 500 ETF Trust",
    nameKo: "S&P 500",
    symbol: "SPY",
    sector: "index",
    stockType: "ETF_US",
  },
  {
    nameEn: "Invesco QQQ Trust",
    nameKo: "NASDAQ 100",
    symbol: "QQQ",
    sector: "index",
    stockType: "ETF_US",
  }
];

export const stockTest = (_keyword, _stockType) => {
  //const { keyword, stockType } = event.arguments;
  const stockLists = getInvestProductList(_stockType, stockListsDB);
  const searchResults = searchStockByKeyword(
    _keyword === "" ? "ALL" : _keyword,
    stockLists
  );
  return searchResults;
}

export const etfTest = (_keyword, _stockType, _sector) => {
  const stockLists = getInvestProductList(_stockType, stockListsDB);
  const etfSectorLists = etfGroupBySector(
    _sector === "" ? "ALL" : _sector,
    stockLists
    );
  const searchResults = searchStockByKeyword(
    _keyword === "" ? "ALL" : _keyword,
    etfSectorLists
  );
  return searchResults;
}
