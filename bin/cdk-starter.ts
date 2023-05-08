#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarterStack } from '../lib/cdk-starter-stack';
import { PhotosStack } from '../lib/PhotosStack';
import { PhotosHandlerStack } from '../lib/PhotosHandlerStack';
import { BucketTagger } from './Tagger';

// Application starts here

const app = new cdk.App();

// Initialize of a new stack defined in lib, can have multiple stack
// new CdkStarterStack(app, 'CdkStarterStack', {});

/*  Multiple Stack 
  - CDK does not deploy stacks in the below order, need to specify in cli to deploy which stack first
*/

/* Sharing resources with CDK
  - Passing in Arn from photosStack to PhotosHanlderStack to get the reference
  - Extending the props field of a stack
  - This way, CDK will understand the order of deployment of multiple stacks
*/
const photosStack = new PhotosStack(app, 'PhotosStack');

new PhotosHandlerStack(app, 'PhotosHandlerStack', {
	targetBucketArn: photosStack.photosBucketArn,
});

/* CDK Aspects
  - Check or modify resources after they were created
  - visitor pattern
  - simple usecase: add tags
  - popular usecase: enfore security or best practices (like a code linter)
    - cdk-nag library to check for security compliance
*/
const tagger = new BucketTagger('level', 'test');

cdk.Aspects.of(app).add(tagger);
