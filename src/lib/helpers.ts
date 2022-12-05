import { randomUUID } from 'crypto';

/**
 * To generate a random [RFC 4122](https://www.rfc-editor.org/rfc/rfc4122.txt) v4 UUID
 * @return cryptographic strong random value
 */
export const UUID = async (): Promise<string> => {
    return randomUUID();
};

/**
 * To escape html special characters by converting string
 * @param {string} str - string value
 * @return {string} - safe string value
 */
export const escapeHtmlSpecialChars = async (str: string) => {
    const chars: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };

    const matcher = new RegExp(`[${Object.keys(chars)}]`, 'g');
    return str.replace(matcher, (s) => chars[s]);
};
