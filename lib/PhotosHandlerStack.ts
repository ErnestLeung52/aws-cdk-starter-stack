import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Fn } from 'aws-cdk-lib';
import {
	Code,
	Function as LambdaFunction,
	Runtime,
} from 'aws-cdk-lib/aws-lambda';

// CDK IDs
export class PhotosHandlerStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Reference the target bucket by importing it
		const targetBucket = Fn.importValue('photos-bucket');

		// Lambda logic to place photo into S3
		new LambdaFunction(this, 'PhotosHandler', {
			runtime: Runtime.NODEJS_16_X,
			handler: 'index.handler',
			code: Code.fromInline(`
			exports.handler = async (event) => {
				console.log("hello!zxzxc: " + process.env.TARGET_BUCKET)
			};
		`),
			environment: {
				TARGET_BUCKET: targetBucket,
			},
		});
	}
}
