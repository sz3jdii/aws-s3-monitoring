const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'aws-s3-monitoring',
  packageName: 'aws-s3-monitoring',
  deps: [],
  repository: 'https://github.com/sz3jdii/aws-s3-monitoring.git',

});
project.synth();