export async function queryModel(model) {
    try {
      var results = [];
  
      const params = {
        TableName: process.env.tickleTable,
        IndexName: "model-PK-index",
        KeyConditionExpression: "model = :model",
        ExpressionAttributeValues: {
          ":model": model,
        },
        ScanIndexForward: false,
      };
  
      do {
        var items = await call("query", params);
        items.Items.forEach((item) => results.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey != "undefined");
  
      return results;
    } catch (e) {
      console.log(e);
      throw new Error("D0000");
    }
  }
  
  
  export async function queryEqual(PK, SK) {
    try {
      var results = [];
  
      const params = {
        TableName: process.env.tickleTable,
        KeyConditionExpression: "PK = :PK and SK = :SK",
        ExpressionAttributeValues: {
          ":PK": PK,
          ":SK": SK,
        },
        ScanIndexForward: false,
      };
  
      do {
        var items = await call("query", params);
        items.Items.forEach((item) => results.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey != "undefined");
  
      return results;
    } catch (e) {
      console.log(e);
      throw new Error("D0000");
    }
  }
  
  export async function querySkIndex(SK) {
    try {
      var results = [];
  
      const params = {
        TableName: process.env.tickleTable,
        IndexName: "SK-PK-index",
        KeyConditionExpression: "SK = :SK",
        ExpressionAttributeValues: {
          ":SK": SK,
        },
      };
  
      do {
        var items = await call("query", params);
        items.Items.forEach((item) => results.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey != "undefined");
  
      return results;
    } catch (e) {
      console.log(e);
      throw new Error("D0000");
    }
  }
  