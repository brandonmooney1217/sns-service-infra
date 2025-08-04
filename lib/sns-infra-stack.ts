import * as cdk from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class SnsInfraStack extends cdk.Stack {
  public readonly notificationTopic: sns.Topic;
  public readonly topicArn: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create SNS topic for Spring Boot application notifications
    this.notificationTopic = new sns.Topic(this, 'NotificationTopic', {
      displayName: 'Spring Boot Application Notifications',
      topicName: 'spring-boot-notifications',
    });

    this.topicArn = this.notificationTopic.topicArn;

    // Create IAM role for Spring Boot application to access SNS
    const springBootRole = new iam.Role(this, 'SpringBootSnsRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      roleName: 'SpringBootSnsRole',
      description: 'IAM role for Spring Boot application to access SNS',
    });

    // Add SNS permissions for publish, subscribe, and topic management
    springBootRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'sns:Publish',
        'sns:Subscribe',
        'sns:Unsubscribe',
        'sns:CreateTopic',
        'sns:GetTopicAttributes',
        'sns:ListTopics',
        'sns:ListSubscriptionsByTopic',
      ],
      resources: [
        this.notificationTopic.topicArn,
        `arn:aws:sns:${this.region}:${this.account}:*`,
      ],
    }));

    // Export values for Spring Boot application configuration
    new cdk.CfnOutput(this, 'TopicArn', {
      value: this.topicArn,
      description: 'ARN of the SNS topic for Spring Boot application',
      exportName: 'SpringBootSnsTopicArn',
    });

    new cdk.CfnOutput(this, 'IAMRoleArn', {
      value: springBootRole.roleArn,
      description: 'ARN of the IAM role for Spring Boot application',
      exportName: 'SpringBootSnsRoleArn',
    });

    new cdk.CfnOutput(this, 'TopicName', {
      value: this.notificationTopic.topicName,
      description: 'Name of the SNS topic',
      exportName: 'SpringBootSnsTopicName',
    });
  }
}
