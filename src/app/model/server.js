'use string'

import { createServer, ServerResponse, IncomingMessage } from 'node:http';
import { HOST_NAME, PORT } from '../constants/server.js';

import { GorodServerResponse } from '../../shared/lib/GorodServerResponse.js';
import { GorodResponseTypes } from '../../shared/constants/server.js';

const types = {
    /**
     * 
     * @param {*} data 
     * @param {IncomingMessage} req 
     * @param {ServerResponse} res 
     * @returns {GorodServerResponse}
     */
    object: (data, req, res) => {
        return new GorodServerResponse({
            type: GorodResponseTypes.json,
            code: 200,
            body: JSON.stringify(data)
        });
    },
    /**
     * 
     * @param {string} data 
     * @param {IncomingMessage} req 
     * @param {ServerResponse} res 
     * @returns {GorodServerResponse}
     */
    string: (data, req, res) => {
        return new GorodServerResponse({
            code: 200,
            type: GorodResponseTypes.html,
            body: data
        });
    },
    /**
     * 
     * @param {number} data 
     * @param {IncomingMessage} req 
     * @param {ServerResponse} res 
     * @returns {GorodServerResponse}
     */
    number: (data, req, res) => {
        return new GorodServerResponse({
            code: 200,
            type: GorodResponseTypes.raw,
            body: data.toString()
        });
    },
    /**
     * @param {(req: IncomingMessage, res: ServerResponse) => { toServerResponse: () => GorodServerResponse}} fn 
     * @param {IncomingMessage} req 
     * @param {ServerResponse} res 
     * @returns {GorodServerResponse}
     */
    function: (fn, req, res) => {
        return fn(req, res).toServerResponse();
    },

    /**
     * 
     * @param {*} data 
     * @param {IncomingMessage} req 
     * @param {ServerResponse} res 
     * @returns {GorodServerResponse}
     */
    undefined: (data, req, res) => new GorodServerResponse({
        type: GorodResponseTypes.raw,
        code: 404,
        body: 'Page no fount'
    })
}

const routing = {
    '/': '<h1>asdasdasdasdsa</h1>',
    '/api': {
        test: 3123
    }
}

export class Server {
    constructor() {
        this._server = createServer((req, res) => {
            console.log(req.headers.host);
            console.log('req', req.url, new URL(req.url, `http://${req.headers.host}`))
            const data = routing[req.url];
            const type = typeof data;
            const serializer = types[type];
            const result = serializer(data, req, res);
            res.statusCode = result.code;
            res.setHeader('Content-Type', result.type);
            res.end(result.body);
        })
    }

    run() {
        this._server.listen(PORT, HOST_NAME, () => {
            console.log(`Server started at http://${HOST_NAME}:${PORT}`)
        });

        this._server.on('error', error => {
            if (error.code === 'EACCES') {
                console.log(`No access to port: ${PORT}`);
            }
        })
    }
}








