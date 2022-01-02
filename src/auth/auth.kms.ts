import { IKey, Key } from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';

export class AuthKms extends Construct {
  masterKey: IKey;

  constructor(scope: Construct, id: string) {
    super(scope, id+'-kms');
    this.masterKey = new Key(this, id+'-kms-key');
  }
}