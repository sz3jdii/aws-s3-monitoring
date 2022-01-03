import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppBucketConverter } from './app/app.bucket.converter';
import { AppBuckets } from './app/app.buckets';
import { AppNotify } from './app/app.notify';
import { AppQueue } from './app/app.queue';
import { AuthKms } from './auth/auth.kms';

export class AWSS3MonitoringStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    // KMS
    const { masterKey } = new AuthKms(this, id);
    // S3
    const { bucket } = new AppBuckets(this, id, masterKey);
    // SNS
    const { topic } = new AppNotify(this, id, process.env.AWS_DEFAULT_ADMIN_EMAIL || 'admin@example.com');
    // SQS
    const { queue } = new AppQueue(this, id, masterKey, topic);
    // MD5 converter
    new AppBucketConverter(this, id, bucket, queue);

  }
}

const app = new App();
const envProd = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
new AWSS3MonitoringStack(app, 'aws-s3-monitoring', { env: envProd });

app.synth();