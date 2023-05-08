import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Fn } from 'aws-cdk-lib';

// CDK IDs
export class PhotosStack extends cdk.Stack {
	private stackSuffix: string;

	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		// Changing construct ID will also change the logical ID of this resource
		// Create a new source and delete the old one, need to manually delete old one
		// Physical ID is used to reference this resource outside of this stack
		// const myBucket = new Bucket(this, 'PhotosBucket2', {
		// 	bucketName: 'photosbucket-234kjadsf13',
		// });

		// (myBucket.node.defaultChild as CfnBucket).overrideLogicalId(
		// 	'PhotosBucket22234kjadsf13'
		// );

		this.initializeSuffix();

		// Create a unique name for the basket
		new Bucket(this, 'PhotosBucket2', {
			bucketName: `photos-bucket-${this.stackSuffix}`,
		});
	}

	private initializeSuffix() {
		// Fn object provided by AWS CDK to extract a unique suffix for the bucket name.
		const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
		this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId));
	}
}
