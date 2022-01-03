

import * as sns from 'aws-cdk-lib/aws-sns';
import { Topic } from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

export class AppNotify extends Construct {
  topic: Topic;
  constructor(scope: Construct, id: string, adminEmail: string) {
    super(scope, id+'-sns');
    // SNS
    this.topic = new sns.Topic(this, 'S3-Upload', {
      displayName: 'S3-Upload',
    });
    // SNS Subscription
    this.topic.addSubscription(new subscriptions.EmailSubscription(adminEmail));

  }
}