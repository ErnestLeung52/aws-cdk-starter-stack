import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

// CloudFormation stack: a group of AWS resources managed together, and are configured in the same tempalte file

/* CDK - Cloud development Kid
1. cdk init app --language typescript
  - Initiate a new project 

2. cdk bootstrap
  - Boostrap environment to make a starter environment
  - Create a stack in CF. S3 stagingBucket contains files required by AWS CDK in order to deploy

3. cdk synth
  - Generates a CF template for each stack specified in the bin file
  - Created cdk.out locally, generated files that will be rewritten over again

4. cdk deploy
  - contains CF template that is actually deployed

• Other commands
  - cdk list: show local stacks
  - cdk diff: show difference in locally vs remotely deployed in CF environment
  - cdk doctor: go to settings, versions of your different libraries related to CDK and tell you if there are any problems
  - cdk destroy [nameOfStack]: delete the stack
*/

/* CDK Constructs
  - Basic building blocks of CDK application. Generate L1 constructs to use on the cloudx
  - L1: Low level constructs- CFN resources. When used, must configure all properties, write everything ourselves
  - L2 (most popular): AWS resources with higher level- CDK provides additional functionality like defaults, boiler plate, type safety for many parameters
  - L3: Patterns: combine multiple types of resources and help with common tasks in AWS (LambdaRestApis)
*/

/* CloudFormation
  • CF Output: CfnOutput
    - different CF stacks can share information between them
  • CDK delpoyment parameters
    - cdk deploy --parameters [duration=1]
    - provide data or specify parameters before deploying to CF
    - eg. broad of log level at test / production
  • CDK core
    - delete stacks
    - buckets are not deleted, since CDK created S3 has a default orphaned (not associated) removal policy
    - don't delete the with -assets- otherwise wont be able to delete anything created by CDK becuz this contians IAM roles and policies
 */

class L3Bucket extends Construct {
	constructor(scope: Construct, id: string, expiration: number) {
		super(scope, id);

		new Bucket(this, 'L3Bucket', {
			lifecycleRules: [{ expiration: cdk.Duration.days(expiration) }],
		});
	}
}

export class CdkStarterStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Create an S3 bucket 3 ways:
		// 'this' bucket belongs to CdkStartStack; provides ID; provides properties

		// L1
		new CfnBucket(this, 'MyL1Bucket', {
			lifecycleConfiguration: {
				rules: [
					{
						expirationInDays: 1,
						status: 'Enabled',
					},
				],
			},
		});

		// L2

		const duration = new cdk.CfnParameter(this, 'duration', {
			default: 6,
			minValue: 1,
			maxValue: 10,
			type: 'Number',
		});

		const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
			lifecycleRules: [
				{
					expiration: cdk.Duration.days(duration.valueAsNumber),
				},
			],
		});

		new cdk.CfnOutput(this, 'MyL2BucketName', { value: myL2Bucket.bucketName });
		// console.log(myL2Bucket.bucketName); //${Token[TOKEN.29]}

		// L3
		new L3Bucket(this, 'MyL3Bucket', 3);
	}
}
