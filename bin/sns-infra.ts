#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SnsInfraStack } from '../lib/sns-infra-stack';

const app = new cdk.App();
new SnsInfraStack(app, 'SnsInfraStack', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: 'us-east-1'
  },
  description: 'SNS infrastructure for Spring Boot notification application',
});