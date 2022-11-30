import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Works for endpoint response with Lambda
 * by following Rest API or HTTP API integration Payload Format version 1.0
 * @param {Number} statusCode
 * @param {String | Object} body
 * @returns {Object} object - Output Format
 */

export const response = async (
    param1: any,
    param2?: string | object,
    isBase64Encoded?: boolean | undefined,
    headers?:
        | {
              [header: string]: boolean | number | string;
          }
        | undefined,
    multiValueHeaders?:
        | {
              [header: string]: Array<boolean | number | string>;
          }
        | undefined,
): Promise<APIGatewayProxyResult> => {
    let statusCode: number;
    let body: string | object;

    if (typeof param1 === 'number' && param2 != null) {
        statusCode = param1;
        body = param2;
    } else {
        statusCode = 200;
        body = param1;
    }

    if (typeof body === 'string') body = { message: body };
    if (headers == null) headers = {};
    if (multiValueHeaders == null) multiValueHeaders = {};

    return {
        statusCode,
        body: JSON.stringify(body),
        isBase64Encoded: false,
        headers,
        multiValueHeaders,
    };
};
