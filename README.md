# `ts-lambda-kit`

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)

#### A quick-start kit to Build REST API's using Typescript, AWS Lambda & SAM CLI.


By running single command, you will get a `production-ready` [TypeScript](https://typescriptlang.org) lambda application and fully configured on your machine. Our goal is to provide you with a very cool, opinionated architecture. It will provide you with things like generic functionalities for the [lambda](https://docs.aws.amazon.com/lambda/) function and cool request handling support with [Amazon API Gateway](https://aws.amazon.com/api-gateway/), [AWS CloudFormation](https://aws.amazon.com/cloudformation/), and [Amazon DynamoDB](https://aws.amazon.com/dynamodb/).

It makes things very easy when the question comes with build, and deploy. It has a strong focus on making sure everything is developer-friendly.


### Requirements:

* Node.js - [Install Node.js 18](https://nodejs.org/en/)
* NPM
* TypeScript
* Git
* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community) optional.


## Quick Installation

To create a project, simply run:

```bash
npx ts-lambda-kit <project-name>
```

or

```bash
npm init ts-lambda-kit <project-name>
```

#### 🥇 Cool! You are ready to make your amazing product.
#### 🎯 I know you liked it. Please, give a star to the [repository](https://github.com/DevSazal/ts-lambda-kit.git)
<br />

## Architecture
This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

- `src` - Code for the application's Lambda function written in TypeScript.
- `events` - Invocation events that you can use to invoke the function.
- `__tests__` - Unit tests for the application code.
- `serverless.yml` - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions and an API Gateway API. These resources are defined in the `serverless.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

## Developer Guide

install `awscliv2`, `aws-sam-cli`, `nodejs 18` (and `make` only for macOS and Linux) on your machine and ensure that your aws iam account is configured. the configuration profile should be located at `~/.aws/config`, access credentials should be located at `~/.aws/credentials`.

To build and deploy your application for the first time, run the following commands in your shell using `makefile` (only for macOS and Linux):

```bash
make i
make build
make deploy
make destroy
```

The 2nd command will build the source of your application. The 3rd command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your API Gateway Endpoint URL in the output values displayed after deployment.

#### 🎯 For more information, please check out out [details guide](https://github.com/DevSazal/ts-lambda-kit/blob/main/DEVGUIDE.md)
<br />

## Key Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

## Contributing

Contributions are more than welcome! We are excited to explore how we can create something truly remarkable together!

## License

ISC © 2023
