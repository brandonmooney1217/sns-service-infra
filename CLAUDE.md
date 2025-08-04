# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AWS CDK project that creates SNS infrastructure for a Spring Boot notification application. The project creates:
- **SNS Topic**: `spring-boot-notifications` for handling email subscriptions and message publishing  
- **IAM Role**: `SpringBootSnsRole` with permissions for SNS operations
- **CloudFormation Outputs**: Topic ARN, Role ARN, and Topic Name for application integration

## Architecture

The codebase follows standard AWS CDK structure:
- `bin/sns-infra.ts`: CDK app entry point that instantiates the stack with `us-east-1` region
- `lib/sns-infra-stack.ts`: Main stack definition containing SNS topic and IAM role resources
- `test/sns-infra.test.ts`: Jest test file (currently contains placeholder test)

The stack creates a single SNS topic with an associated IAM role that has permissions for publish, subscribe, and topic management operations. The role is configured for EC2 service principal assumption.

## Development Commands

### Building and Testing
- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and compile continuously  
- `npm test` - Run Jest unit tests

### CDK Operations
- `npx cdk deploy --require-approval never` - Deploy stack to AWS
- `npx cdk diff` - Compare deployed stack with current state
- `npx cdk synth` - Generate CloudFormation template locally
- `npx cdk destroy` - Delete the deployed stack

### Prerequisites
- AWS CLI configured with appropriate credentials
- Node.js and npm installed
- AWS CDK CLI installed (`npm install -g aws-cdk`)

## Configuration Notes

- Default region is hardcoded to `us-east-1` in `bin/sns-infra.ts:9`
- CDK context includes extensive feature flags for modern CDK behavior
- TypeScript is configured with strict mode and ES2022 target
- Jest is configured to run tests from the `test/` directory with `.test.ts` pattern