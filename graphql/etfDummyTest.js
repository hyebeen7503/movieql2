import Promise from "bluebird";
import {
  queryModel,
  queryEqual,
  querySkIndex,
} from "./dynamodb";
import { mergeItems } from "./helper";
const ETF_US = "ETF_US";
const STOCK_US = "STOCK_US";
const ALL = "ALL";

const createETFList = (_stockLists) => {
  let produceObj = [];
  _stockLists.forEach((stock)=> {if(stock.stockType === ETF_US){produceObj.push(stock);}});
  return produceObj;
}
const etfLists = createETFList(stockListsDB2);

//stockType이 ETF_US인걸로 먼저 추리고
//sector가 all, theme, index 등등 이럴 때 어케할건지

export default async (event) => {
    // 그래프큐엘로 들어온 변수 저장
    const { keyword, sector } = event.arguments;
    const results = await dummySearchResult(keyword, sector);
    return results;
};

const dummySearchResult = async (_keyword, _sector) => {
    await Promise.delay(Math.random() * 1500); // 쿼리 돈다 치고 최대 1.5초간의 지연
    let dummyResultArray = [];
    switch (_sector) {
      case "theme": {
        let stocks = etfLists.slice();
        if (_keyword !== ALL) {
          const count = Math.floor(Math.random() * stocks.length);
          stocks = stocks.slice(0, count);
        }
        stocks = stocks.map((stock) =>
          Object.assign({}, randomAdderObj(), stock, { sector : "theme" })
        );
        dummyResultArray = stocks;
        break;
      }
      case "tendency": {
        let stocks = etfLists.slice();
        if (_keyword !== ALL) {
          const count = Math.floor(Math.random() * stocks.length);
          stocks = stocks.slice(0, count);
        }
        stocks = stocks.map((stock) =>
          Object.assign({}, randomAdderObj(), stock, { sector : "tendency" })
        );
        dummyResultArray = stocks;
        break;
      }
      case "futures": {
        let stocks = etfLists.slice();
        if (_keyword !== ALL) {
          const count = Math.floor(Math.random() * stocks.length);
          stocks = stocks.slice(0, count);
        }
        stocks = stocks.map((stock) =>
          Object.assign({}, randomAdderObj(), stock, { sector : "futures" })
        );
        dummyResultArray = stocks;
        break;
      }
      case "index": {
        let stocks = etfLists.slice();
        if (_keyword !== ALL) {
          const count = Math.floor(Math.random() * stocks.length);
          stocks = stocks.slice(0, count);
        }
        stocks = stocks.map((stock) =>
          Object.assign({}, randomAdderObj(), stock, { sector : "index" })
        );
        dummyResultArray = stocks;
        break;
      }
      case "ALL": {
        let themes = await dummySearchResult(_keyword, "theme");
        let tendencies = await dummySearchResult(_keyword, "tendency");
        let futures = await dummySearchResult(_keyword, "future");
        let indexes = await dummySearchResult(_keyword, "index");
        dummyResultArray = indexes.concat(themes).concat(tendencies).concat(futures);
        break;
      }
      default:
        return [];
    }
    dummyResultArray.sort((a, b) => b.fluctuationRate - a.fluctuationRate);
    return dummyResultArray;
};

const randomAdderObj = () => {
  return {
    marketCapitalization: Math.floor(Math.random() * 100000000000000),
    fluctuationRate: (Math.random() * 30 - Math.random() * 15).toFixed(2),
    lastTradeVolume: (Math.random() * 1000000).toFixed(2),
    lastPrice: (Math.random() * 50000).toFixed(2),
  };
};

let ETF_DUMMYS = [
  {
    nameEn: "Global X Social Media ETF",
    nameKo: "SNS",
    symbol: "SOCL",
    sector: "theme",
    stockType: "ETF_US",
    brandColor: "#DD471D",
    data: "US5949181045",
    imgRound:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoft.png",
    imgSquare:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoftsb.png",
  },
  {
    nameEn: "Global X FinTech ETF",
    nameKo: "핀테크",
    symbol: "FINX",
    sector: "theme",
    stockType: "ETF_US",
    brandColor: "#DD471D",
    data: "US5949181045",
    imgRound:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoft.png",
    imgSquare:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoftsb.png",
  },
  {
    nameEn: "iShares Core Conservative Allocation ETF",
    nameKo: "안정 추구형",
    symbol: "AOK",
    sector: "tendency",
    stockType: "ETF_US",
    brandColor: "#DD471D",
    data: "US5949181045",
    imgRound:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoft.png",
    imgSquare:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoftsb.png",
  },
  {
    nameEn: "iShares Core Growth Allocation ETF",
    nameKo: "적극 투자형",
    symbol: "AOR",
    sector: "tendency",
    stockType: "ETF_US",
    brandColor: "#DD471D",
    data: "US5949181045",
    imgRound:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoft.png",
    imgSquare:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoftsb.png",
  },
  {
    nameEn: "iShares Gold Trust",
    nameKo: "금",
    symbol: "IAU",
    sector: "futures",
    stockType: "ETF_US",
    brandColor: "#DD471D",
    data: "US5949181045",
    imgRound:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoft.png",
    imgSquare:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoftsb.png",
  },
  {
    nameEn: "Invesco DB U.S. Dollar Index Bullish Fund",
    nameKo: "달러",
    symbol: "UUP",
    sector: "futures",
    stockType: "ETF_US",
    brandColor: "#DD471D",
    data: "US5949181045",
    imgRound:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoft.png",
    imgSquare:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoftsb.png",
  },
  {
    nameEn: "SPDR S&P 500 ETF Trust",
    nameKo: "S&P 500",
    symbol: "SPY",
    sector: "index",
    stockType: "ETF_US",
    brandColor: "#DD471D",
    data: "US5949181045",
    imgRound:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoft.png",
    imgSquare:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoftsb.png",
  },
  {
    nameEn: "Invesco QQQ Trust",
    nameKo: "NASDAQ 100",
    symbol: "QQQ",
    sector: "index",
    stockType: "ETF_US",
    brandColor: "#DD471D",
    data: "US5949181045",
    imgRound:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoft.png",
    imgSquare:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoftsb.png",
  },
];

const stockListsDB2 = [
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

export { default as etfDummyTest } from "./etfDummyTest";