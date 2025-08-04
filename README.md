# SNS Infrastructure CDK Project

AWS CDK project that creates SNS infrastructure for a Spring Boot notification application.

## Overview

This CDK stack creates:
- **SNS Topic**: `spring-boot-notifications` for handling email subscriptions and message publishing
- **IAM Role**: `SpringBootSnsRole` with permissions for SNS operations
- **CloudFormation Outputs**: Topic ARN, Role ARN, and Topic Name for application integration

## Prerequisites

- AWS CLI configured with appropriate credentials
- Node.js and npm installed
- AWS CDK CLI installed (`npm install -g aws-cdk`)

## Deployment

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy the stack**:
   ```bash
   npx cdk deploy --require-approval never
   ```

## Stack Outputs

After deployment, you'll get these outputs:

- **TopicArn**: Use this in your Spring Boot `application.properties`
- **IAMRoleArn**: For EC2 instance profile configuration
- **TopicName**: Topic name for reference

## Spring Boot Integration

Update your Spring Boot application's `application.properties`:
```properties
aws.sns.topic.arn=<TopicArn-from-deployment-output>
```

## Useful Commands

* `npm run build`   - Compile TypeScript to JavaScript
* `npm run watch`   - Watch for changes and compile
* `npm run test`    - Run Jest unit tests
* `npx cdk deploy`  - Deploy stack to AWS
* `npx cdk diff`    - Compare deployed stack with current state
* `npx cdk synth`   - Generate CloudFormation template
* `npx cdk destroy` - Delete the deployed stack
