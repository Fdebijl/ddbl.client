/* eslint-disable */
enum ReadyState {
  UNSENT = 0, // open() has not been called yet.
  OPENED = 1, // send() has been called.
  HEADERS_RECEIVED = 2, // send() has been called, and headers and status 
                        // are available.
  LOADING = 3, // Downloading; responseText holds partial data.
  DONE = 4 // The operation is complete.
}

export class MockXMLHttpRequest {

  static requests: MockXMLHttpRequest[] = [];

  get readyState(): number {
    return this._readyState;
  }

  get response(): any {
    return this._response;
  }

  get responseText(): string {
    return String(this._response);
  }

  get responseType(): string {
    return this._responseType;
  }

  get status(): number {
    return this._status;
  }

  get statusText(): string {
    return this._statusText;
  }

  get timeout(): number {
    return this._timeout;
  }

  set timeout(timeout: number) {
    throw Error('Not implemented');
    this._timeout = timeout;
  }

  set onload(cb: () => void) {
    this._onLoad = cb;
  }

  set onerror(cb: (evt?: Event) => void) {
    this._onError = cb;
  }

  set onprocess(cb: () => void) {
    throw Error('Not implemented');
    this._onProgress = cb;
  }

  set onreadystatechange(cb: () => void) {
    this._onReadyState = cb;
  }

  open(method: string, url: string, async?: boolean, user?: string, password?: string): void {
    this._method = method;
    this._url = url;
    if (async !== void 0) {
      this._async = async;
    }
    if (user !== void 0) {
      this._user = user;
    }
    if (password !== void 0) {
      this._password = password;
    }
    this._readyState = ReadyState.OPENED;

    if (this._onReadyState) {
      this._onReadyState();
    }
  }

  overrideMimeType(mime: string): void {
    this._mimetype = mime;
  }

  send(data?: any): void {
    if (data !== void 0) {
      this._data = data;
    }
    
    MockXMLHttpRequest.requests.push(this);
  }

  setRequestHeader(header: string, value: string): void {
    this._requestHeader[header] = value;
  }

  getResponseHeader(header: string): string {
    if (this._responseHeader.hasOwnProperty(header)) {
      return this._responseHeader[header];
    }
  }

  respond(statusCode: number, header: any, response: any): void {
    this._status = statusCode;
    this._response = response;
    this._responseHeader = header;
    this._readyState = ReadyState.DONE;
    if (statusCode >= 400) {
      if (this._onError) {
        const evt = new Event('Invalid status code');
        this._onError(evt);
      }
    } else {
      if (this._onReadyState) {
        this._onReadyState();
      }
      console.log('onload?', this._onLoad);
      if (this._onLoad) {
        this._onLoad();
      }
    }
  }

  private _readyState = ReadyState.UNSENT;
  private _response: any = '';
  private _responseType = '';
  private _status = -1;
  private _statusText = '';
  private _timeout = -1;
  private _mimetype = '';
  private _data: any;
  private _method = '';
  private _url = '';
  private _async = true;
  private _user = ''
  private _password = '';
  private _onLoad: () => void = null;
  private _onError: (evt?: Event) => void = null;
  private _onProgress: () => void = null;
  private _requestHeader: any = {};
  private _responseHeader: any = {};
  private _onReadyState: () => void = null;
}