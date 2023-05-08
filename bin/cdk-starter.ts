#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarterStack } from '../lib/cdk-starter-stack';
import { PhotosStack } from '../lib/PhotosStack';
import { PhotosHandlerStack } from '../lib/PhotosHandlerStack';

// Application starts here

const app = new cdk.App();

// Initialize of a new stack defined in lib, can have multiple stack
// new CdkStarterStack(app, 'CdkStarterStack', {});

/*  Multiple Stack 
  - CDK does not deploy stacks in the below order, need to specify in cli to deploy which stack first
*/
new PhotosStack(app, 'PhotosStack');
new PhotosHandlerStack(app, 'PhotosHandlerStack');
