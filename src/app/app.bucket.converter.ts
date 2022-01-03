
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import { Construct } from 'constructs';

export class AppBucketConverter extends Construct {
  constructor(scope: Construct, id: string, bucket: Bucket) {
    super(scope, id+'-bucket-converter');
    // Lambda MD5 converter
    const md5ConverterLambdaFunction = new lambda.Function(this, 'md5-converter-lambda-function', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../functions/md5-converter')),
    });
    // S3 Convert MD5
    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(md5ConverterLambdaFunction),
    );
  }
}