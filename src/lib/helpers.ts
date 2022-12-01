import { randomUUID } from 'crypto';

/**
 * To generate a random [RFC 4122](https://www.rfc-editor.org/rfc/rfc4122.txt) v4 UUID
 * @return cryptographic strong random value
 */
export const UUID = async (): Promise<string> => {
    return randomUUID();
};
