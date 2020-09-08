import {stockLists, searchStockByKeyword, test} from "./db";    

const resolvers = {
    Query: {
        //처음에는 현재 object를 보내는 object임
        //foreignInvestSearch: (_, {keyword}) => searchStockByKeyword(keyword, stockLists)
        foreignInvestSearch: (_, {keyword, stockType}) => test(keyword, stockType)
        // keyward: () => refineKeyword2(), //영문, 한글, 특수문자 구별하는 것
        // stockLists: () => searchStockInKo("ㅡ", stockLists),
        // stockLists: () => searchStockInEng("a", stockLists),
        // stockLists: () => searchStockInSPC("-", stockLists)
    }
};
export default resolvers;