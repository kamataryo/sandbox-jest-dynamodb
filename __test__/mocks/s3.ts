// proxy dynamodb with test env

import AWS from "aws-sdk";

const S3 = AWS.S3;

class MockS3 {
  getSignedUrl = (_0: any, _1: any, cb: any) => cb(null, "some url");
}

// @ts-ignore
AWS.S3 = MockS3;
