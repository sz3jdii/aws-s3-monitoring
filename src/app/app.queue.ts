

import * as path from 'path';
import { IKey } from 'aws-cdk-lib/aws-kms';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class AppQueue extends Construct {
  queue: Queue;
  constructor(scope: Construct, id: string, encryptionKey: IKey, snsTopic: Topic) {
    super(scope, id+'-sqs');

    // SQS
    this.queue = new sqs.Queue(this, id+'-sqs', {
      queueName: id+'-sqs',
      encryption: sqs.QueueEncryption.KMS,
      encryptionMasterKey: encryptionKey,
    });

    // SNS subscriber

    const snsSendFunction = new lambda.Function(this, 'sns-send-lambda-function', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../functions/sns-send')),
      environment: {
        SNS_TOPIC_ARN: snsTopic.topicArn,
      },
    });
    snsTopic.grantPublish(snsSendFunction);
    const eventSource = new lambdaEventSources.SqsEventSource(this.queue);

    snsSendFunction.addEventSource(eventSource);
  }
}