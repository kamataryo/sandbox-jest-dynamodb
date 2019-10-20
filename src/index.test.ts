// proxy dynamodb with test env

import AWS from "aws-sdk";

const testConfig = {
  convertEmptyValues: true,
  endpoint: "localhost:8000",
  sslEnabled: false,
  region: "local-env"
};

const DocumentClient = AWS.DynamoDB.DocumentClient;

class MockDynamoDB__DockumentClient {
  constructor(config: any) {
    return new DocumentClient({ ...config, ...testConfig });
  }
}

// @ts-ignore
AWS.DynamoDB.DocumentClient = MockDynamoDB__DockumentClient;

it("Should create item", async () => {
  const client = new AWS.DynamoDB.DocumentClient();
  await client
    .put({
      TableName: "test-table",
      Item: {
        id: "hello",
        value: "world"
      }
    })
    .promise();
  const { Item } = await client
    .get({ TableName: "test-table", Key: { id: "hello" } })
    .promise();

  expect((Item as any).value).toEqual("world");
});
