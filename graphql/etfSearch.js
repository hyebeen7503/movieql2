import Promise from "bluebird";
import {
  queryModel,
  queryEqual,
  querySkIndex,
} from "../../../../../libs/dynamodb";
import { mergeItems } from "../helper";
import { searchStockByKeyword, getInvestProductList } from "../libs/Search";
import { ErrorHandler } from "../../../../../libs/errorHandler";
import { count } from "console";

export default async (event) => {
  try {
    // 그래프큐엘로 들어온 변수 저장
    const { keyword, sector, stockType} = event;
    //현재 환율 받아오기
    const usdString = "exchangeRate";
    const currentUsd = (await queryEqual(usdString, `${usdString}-USD`))[0];

    // DynamoDB 에서 SK 로 쿼리하여 주식 정보 리스트 받아오기
    const etfLists = await getInvestProductList(stockType);

    //ETF리스트 중에서 sector에 따라서 리스트를 분리해줘야함 
    //전체 ETF리스트 받아서 sector별로 구분한 etf리스트를 반환해줘야 함
    const etfSectorLists = await etfGroupBySector(sector,etfLists); 

    // 검색어와 주식정보 리스트를 받아서, 검색 결과 주식 리스트 받기
    const searchResults = searchStockByKeyword(keyword, etfSectorLists);

    const finalFoundArray = mergeItems(searchResults, currentUsd.rate);
    return finalFoundArray;
  } catch (err) {
    console.log("errr", err);
    return ErrorResponse(err, "foreignStockChart");
  }
};
