import queryString from 'query-string';


export default class Client {

  constructor(baseUri) {
    this.baseUri = baseUri;
  }

  get(params) {
    return this.fetchJson({
      ...params,
      method: 'GET',
    });
  }

  post(params) {
    return this.fetchJson({
      ...params,
      method: 'POST',
    });
  }

  put(params) {
    return this.fetchJson({
      ...params,
      method: 'PUT',
    });
  }

  patch(params) {
    return this.fetchJson({
      ...params,
      method: 'PATCH',
    });
  }

  delete(params) {
    return this.fetchJson({
      ...params,
      method: 'DELETE',
    });
  }

  fetchJson(params) {
    const { path, query, method, body, headers, hasOutput } = {
      method: 'GET',
      hasOutput: true,
      ...params,
    };

    let bodyStr = undefined;
    if (body) {
      bodyStr = JSON.stringify(body);
    }

    const realHeaders = {
      'Accept': 'application/json',
      ...headers,
    };
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      realHeaders['Content-Type'] = 'application/json';
    }

    const fetchParams = {
      method: method,
      headers: realHeaders,
      body: bodyStr,
    };

    const url = this.createUrl({ path, query });

    return fetch(url, fetchParams)
      .then(response => {
        if (!response.ok) {
          throw new ClientError(`Got failed response on ${url}: ${response.status} ${response.statusText}`);
        }

        if (hasOutput !== undefined && !hasOutput) {
          return null;
        }

        return response.json();
      });
  }

  createUrl({ path, query }) {
    let pathStr = '';
    if (path) {
      if (!path.startsWith('/')) {
        pathStr += '/';
      }
      pathStr += path;
    }

    let url = `${this.baseUri}${pathStr}`;
    if (query) {
      const formattedParams = queryString.stringify(query);
      url += `?${formattedParams}`;
    }

    return url;
  }

}


export class ClientError {

  constructor(message) {
    this.message = message;
  }

  toString() {
    return `ZucchiniClientError(${this.message})`;
  }

}
