/* eslint-disable multiline-ternary,no-return-assign */
import request   from 'request-promise';
import ApiConfig from '../config/api.conf';

class ApiRequestService {

    constructor() {
        this.apiGateway = new ApiConfig().env.gateway;
        this.apis = new ApiConfig().env.apis;
    }

    obj2queryStr(query = {}) {

        let queryString = '';

        Object.keys(query).forEach((queryParam, index) =>
            queryString += `${index === 0 ? '?' : '&'}${queryParam}=${typeof query[queryParam] === 'object'
                ? JSON.stringify(query[queryParam]) : query[queryParam].toString()}`
        );

        return queryString;
    }

    getUrl(apiName, path, query) {
        return this.apis[apiName].mode === 'gateway'
            ? `${this.apiGateway.baseUrl}${apiName}/${path}${this.obj2queryStr(query)}`
            : `${this.apis[apiName].baseUrl}${path}${this.obj2queryStr(query)}`;
    }

    post(api, path, body, query = {}, headers = {}) {
        return this._requestApi('POST', api, path, query, body, headers);
    }

    put(api, path, body, query = {}, headers = {}) {
        return this._requestApi('PUT', api, path, query, body, headers);
    }

    get(api, path, query = {}, headers = {}) {
        return this._requestApi('GET', api, path, query, null, headers);
    }

    _requestApi(method, api, path, query = {}, body = null, headers = {}) {

        const url = this.getUrl(api, path, query);

        // Ignore self assigned certificate
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        // Request options
        const options = {
            method : method.toUpperCase(),
            json   : method.toUpperCase() === 'GET' ? true : body,
            uri    : url,
            headers: headers
        };

        // Return request promise
        return request(options);
    }
}

export default new ApiRequestService();
