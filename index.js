var RES_TYPE_ARR = ['text', 'arraybuffer'];

XMLHttpRequest = (function () {
  function XMLHttpRequest(name) {
    this.requestMethod = null;
    this.requestAsync = null;
    this.requestUser = null;
    this.requestPassword = null;
    this.requestHeader = {
      'content-type': 'application/json',
    };

    this.onreadystatechange = null;
    this.readyState = 0;  
    this.response = null;
    this.responseText = ''; 
    this.responseType = 'text';
    this.responseURL = null;
    this.status = null;
    this.statusText = null;
    this.timeout = null;
    this.withCredentials = false;

    // 事件
    this.onabort = null;
    this.onerror = null;
    this.onload = null;
    this.onloadend = null;
    this.ontimeout = null;

    this._requestTask = null;
    this._sendTimer = null;
    this._headers = null;
  }
  XMLHttpRequest.prototype.abort = function () {
    RequestTask.abort();
    if(typeof this.onabort === 'function'){
      this.onabort();
    }
  };
  XMLHttpRequest.prototype.getAllResponseHeaders = function () {
    var _context = '';
    var _headers = this._headers;
    if(_headers){
      for(var header in this._headers){
        _context += header + ':' + _headers[header] +'\r\n';
      }
    }
    if(_context){
      return _context;
    }else{
      return null;
    }
  };
  XMLHttpRequest.prototype.getResponseHeader = function (header) {
    var _info = null;
    if(this._headers && this._headers[header]) _info = this._headers[header];
    return _info;
  };
  XMLHttpRequest.prototype.overrideMimeType = function (MIMEtype) {
    this.requestHeader['content-type'] = MIMEtype;
  };
  XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    this.readyState = 1;
    this._execStateChanged();
    this.requestMethod = method;
    this.responseURL = url;
    this.requestAsync = async;
    this.requestUser = user;
    this.requestPassword = password;
  };
  XMLHttpRequest.prototype.send = function (data) {
    var self = this;
    if(!this.responseURL) return;
    if(this.withCredentials) {
      this.requestHeader['cookie'] = window.document.$$cookie;
    }
    if(!wx && !wx.request) console.warn('请在微信小程序环境下运行');
    this._requestTask = wx.request({
      url: this.responseURL,
      data: data,
      header: this.requestHeader,
      method: this.requestMethod,
      dataType: 'json',
      responseType: this._validateResType(this.responseType),
      success: function(res) {
        var _data = res.data;
        self.response = _data.data;
        self.status = _data.code;
        self._headers = res.header;
        self.responseText = typeof _data.data === 'string' ? _data.data : JSON.stringify(_data.data);
        if(typeof self.onload === 'function'){
          self.onload(res);
        }
      },
      fail: function(res) {
        if(typeof self.onerror === 'function'){
          self.onerror(res);
        }
      },
      complete: function(res) {
        self.readyState = 4;
        self._execStateChanged();
        self.statusText = res.errMsg;
        clearTimeout(self._sendTimer);
        if(typeof self.onloadend === 'function'){
          self.onloadend(res);
        }
      }
    });
    this._requestTask.onHeadersReceived(function(res){
      self.readyState = 2;
      self._execStateChanged();
      if(typeof self.onloadstart === 'function'){
        self.onloadstart(res);
      }
    });
    if(this.timeout){
      this._sendTimer = setTimeout(function(){
        if(typeof self.ontimeout === 'function'){
          self.ontimeout(res);
        }
        self._requestTask.abort();
      }, this._sendTimer);
    }
  };
  XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
      this.requestHeader[header] = value;
  };
  
  //内部
  XMLHttpRequest.prototype._validateResType = function (type) {
    if(RES_TYPE_ARR.indexOf(type) >= 0){
      return type;
    }else{
      this.responseType = 'text';
      console.warn('当前设置responseType = [' + type + ']小程序不支持');
      return 'text';
    }
  };
  XMLHttpRequest.prototype._execStateChanged = function () {
    if(typeof this.onreadystatechange === 'function'){
      this.onreadystatechange()
    }
  };

  return XMLHttpRequest;
})();

exports = module.exports = XMLHttpRequest;