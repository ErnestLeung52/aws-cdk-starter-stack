#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStarterStack } from '../lib/cdk-starter-stack';

// Application starts here

const app = new cdk.App();

// Initialize of a new stack defined in lib, can have multiple stack
new CdkStarterStack(app, 'CdkStarterStack', {});
