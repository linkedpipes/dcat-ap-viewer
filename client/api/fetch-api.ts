/**
 * Error types.
 */
export enum ErrorType {
  NONE = 0,
  FETCH = 1,
  PARSE = 2,
  SERVER = 3
}

export class Response {
  error?: ErrorType;
  data?: {};

  constructor(error?: ErrorType, data?: any) {
    this.error = error;
    this.data = data;
  }
}

export function fetchJson(url: string): Promise<Response> {
  return fetch(url, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
    },
  }).catch(failureToResponse).then(json);
}

function failureToResponse(error: any): Promise<any> {
  console.error("Fetch error code:", error);
  return Promise.reject(new Response(ErrorType.FETCH));
}

function json(response: any): Promise<Response> {
  return response.json().catch(() => {
    return Promise.reject(new Response(ErrorType.PARSE));
  }).then((data: {}) => {
    if (response.ok) {
      return Promise.resolve(new Response(undefined, data));
    } else {
      return Promise.resolve(new Response(ErrorType.SERVER));
    }
  });
}
