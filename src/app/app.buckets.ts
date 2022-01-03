import { IKey } from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class AppBuckets extends Construct {
  bucket: Bucket;
  constructor(scope: Construct, id: string, encryptionKey: IKey) {
    super(scope, id+'-buckets');
    // S3
    this.bucket = new s3.Bucket(this, 'documents-bucket', {
      encryption: s3.BucketEncryption.KMS,
      encryptionKey: encryptionKey,
    });
  }
}