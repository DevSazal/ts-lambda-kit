import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

/*
|--------------------------------------------------------------------------
| API Handler: AWS Lambda Function
|--------------------------------------------------------------------------
| @apiVersion   1.0
| 
| Here is where you can define all the endpoints for your application.
| Enjoy building your API!
|
*/

const main = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const data = {
        ...JSON.parse(event.body || '{}'),
        ...event.queryStringParameters,
        ...event.pathParameters,
    };

    const routeKey = `${event.httpMethod} ${event.resource}`;

    switch (routeKey) {
        case 'POST /users':
            return postUser(data as IRequestDataPostUser);

        case 'GET /users':
            return getUsers();

        case 'GET /users/{id}':
            return getUserById(data as IRequestDataGetUserById);

        case 'PATCH /users/{id}':
            return patchUser(data as IRequestDataPatchUser);

        default:
            return {
                statusCode: 404,
                body: 'resource not found.',
            };
    }

    // All log statements are written to AWS CloudWatch
    // console.info(`response from: ${event.path}`);
};

enum EState {
    active = 'active',
    deleted = 'deleted',
    disabled = 'disabled',
    inactive = 'inactive',
}

interface IRequestDataPostUser {
    id: number;
    firstName: string;
    lastName: string;
    state?: EState.active | EState.disabled;
}

interface IRequestDataGetUserById {
    id: number;
}

interface IRequestDataPatchUser {
    id: number;
    firstName: string;
    lastName: string;
    state?: EState.active | EState.disabled;
}

const postUser = async (request: IRequestDataPostUser) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `POST /v1/users accepted => hello ${request.firstName}`,
        }),
    };
};

const getUsers = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `GET /v1/users accepted`,
        }),
    };
};

const getUserById = async (request: IRequestDataGetUserById) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `GET /v1/users/${request.id} accepted`,
        }),
    };
};

const patchUser = async (request: IRequestDataPatchUser) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `PATCH /v1/users/${request.id} accepted`,
        }),
    };
};

export const lambdaHandler = main;
