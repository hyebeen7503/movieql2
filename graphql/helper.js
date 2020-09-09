export const mergeItems = (array, currentUsd) => {
    const object = {
      items: [
        ...array
          .reduce(
            (a, b) =>
              a.set(
                b.PK,
                Object.assign(
                  a.get(b.PK) || {
                    symbol: null,
                    imgRound: null,
                    imgSquare: null,
                    imgUnclicked: null,
                    nameEn: null,
                    nameKo: null,
                    about: null,
                    brandColor: null,
                    fluctuationRate: null,
                    lastPrice: null,
                  },
                  makeStockUniqueObject(b, currentUsd)
                )
              ),
            new Map()
          )
          .values(),
      ],
    };
    return object;
  };
  
  const makeStockUniqueObject = (obj, currentUsd) => {
    if (
      obj.buy !== undefined &&
      obj.hold !== undefined &&
      obj.buy !== undefined
    ) {
      obj.expertOpinion = {
        hold: obj.hold,
        sell: obj.sell,
        buy: obj.buy,
      };
      delete obj.sell;
      delete obj.hold;
      delete obj.buy;
    }
    if (obj.lastPrice) {
      obj.lastPrice = makeIntNumber(
        getZeroOnePercentOfPrice(exchangePrice(obj.lastPrice, currentUsd))
      );
    }
    return obj;
  };
  
  export const makeIntNumber = (number) => {
    var result;
    if (number % 1 === 0) {
      result = number;
    } else {
      result = parseInt(number) + 1;
    }
    return result;
  };
  
  export const getZeroOnePercentOfPrice = (price) => {
    return price * 0.01;
  };
  
  export const exchangePrice = (usd, exchangeCurr) => {
    return usd * exchangeCurr;
  };
  
  //declare function parseInt(s: string, radix?: number): number;
  
  
  