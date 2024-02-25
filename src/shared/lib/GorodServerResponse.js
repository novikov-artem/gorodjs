import { DocumentTypes } from '../constants/server.js';

export class GorodServerResponse {
    constructor({
        type = DocumentTypes.html,
        code,
        body
    }) {
        this._type = DocumentTypes[type] || 'text/plain';
        this._code = code;
        this._body = body;
    }

    get type() {
        return this._type;
    }

    get code() {
        return this._code;
    }

    get body() {
        return this._body;
    }
}
