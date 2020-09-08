import {people, getById, stockLists, searchStockByKeyword, etfGroupBySector} from "./db";    

const resolvers = {
    Query: {
        people: () => people,
        person: (_, {id}) => getById(id),
        //처음에는 현재 object를 보내는 object임

        //foreignInvestSearch: (_, {keyword}) => searchStockByKeyword(keyword, stockLists)
        foreignInvestSearch: (_, {keyword, sector}) => {
            const etfSectorLists = etfGroupBySector(sector, stockLists);
            return searchStockByKeyword(keyword, etfSectorLists);
        }
        // keyward: () => refineKeyword2(), //영문, 한글, 특수문자 구별하는 것
        // stockLists: () => searchStockInKo("ㅡ", stockLists),
        // stockLists: () => searchStockInEng("a", stockLists),
        // stockLists: () => searchStockInSPC("-", stockLists)
    }
};
export default resolvers;