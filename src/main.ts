import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppBuckets } from './app/app.buckets';
import { AuthKms } from './auth/auth.kms';

export class AWSS3MonitoringStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    // KMS
    const { masterKey } = new AuthKms(this, id);
    // S3
    new AppBuckets(this, id, masterKey);
  }
}

const app = new App();
const envProd = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
new AWSS3MonitoringStack(app, 'aws-s3-monitoring', { env: envProd });

app.synth();