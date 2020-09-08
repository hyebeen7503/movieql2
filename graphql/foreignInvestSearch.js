import Promise from "bluebird";
import {
  queryModel,
  queryEqual,
  querySkIndex,
} from "../../../../../libs/dynamodb";
import { mergeItems } from "../helper";
import {
  searchStockByKeyword,
  getInvestProductList,
} from "./foreignStockSearchHelper";

export default async (event) => {
  try {
    // 그래프큐엘로 들어온 변수 저장
    const { keyword, stockType } = event.arguments;
    const results = await dummySearchResult(
      keyword === "" ? "ALL" : keyword,
      stockType
    );
    return { items: results };
    //현재 환율 받아오기
    const usdString = "exchangeRate";
    const currentUsd = (await queryEqual(usdString, `${usdString}-USD`))[0];

    // DynamoDB 에서 SK 로 쿼리하여 주식 정보 리스트 받아오기
    const stockLists = await getInvestProductList(stockType);

    // 검색어와 주식정보 리스트를 받아서, 검색 결과 주식 리스트 받기
    const searchResults = searchStockByKeyword(
      keyword === "" ? "ALL" : keyword,
      stockLists
    );

    const finalFoundArray = mergeItems(searchResults, currentUsd.rate);
    return finalFoundArray;
  } catch (err) {
    return ErrorResponse(err, "foreignStockSearch");
  }
};

const dummySearchResult = async (_keyword, _stockType) => {
  await Promise.delay(Math.random() * 1500); // 쿼리 돈다 치고 최대 1.5초간의 지연
  let dummyResultArray = [];
  switch (_stockType) {
    case "ETF_US": {
      let stocks = ETF_DUMMYS;
      if (_keyword !== "ALL") {
        const count = Math.floor(Math.random() * stocks.length);
        stocks = stocks.slice(0, count);
      }
      stocks = stocks.map((stock) =>
        Object.assign({}, randomAdderObj(), stock, { stockType: "ETF_US" })
      );
      dummyResultArray = stocks;
      break;
    }
    case "STOCK_US": {
      let stocks = await querySkIndex("stockDetail");

      if (_keyword !== "ALL") {
        const count = Math.floor(Math.random() * stocks.length);

        stocks = stocks.slice(0, count);
      }
      dummyResultArray = stocks.map((stock) =>
        Object.assign({}, randomAdderObj(), stock, { stockType: "STOCK_US" })
      );
      break;
    }
    case "ALL": {
      let etfs = await dummySearchResult(_keyword, "ETF-US");
      let stocks = await dummySearchResult(_keyword, "STOCK_US");
      dummyResultArray = stocks.concat(etfs);
      break;
    }
    default:
      throw "unhandled parameter : _searchProduct";
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
    stockType: "ETF-US",
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
    stockType: "ETF-US",
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
    stockType: "ETF-US",
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
    stockType: "ETF-US",
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
    stockType: "ETF-US",
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
    stockType: "ETF-US",
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
    stockType: "ETF-US",
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
    stockType: "ETF-US",
    brandColor: "#DD471D",
    data: "US5949181045",
    imgRound:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoft.png",
    imgSquare:
      "https://tickle-foreignstock.s3.ap-northeast-2.amazonaws.com/microsoftsb.png",
  },
];

