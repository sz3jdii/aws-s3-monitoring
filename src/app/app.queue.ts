

import { IKey } from 'aws-cdk-lib/aws-kms';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class AppQueue extends Construct {
  queue: Queue;
  constructor(scope: Construct, id: string, encryptionKey: IKey) {
    super(scope, id+'-sqs');

    // SQS
    this.queue = new sqs.Queue(this, id+'-sqs', {
      queueName: id+'-sqs',
      encryption: sqs.QueueEncryption.KMS,
      encryptionMasterKey: encryptionKey,
    });
  }
}