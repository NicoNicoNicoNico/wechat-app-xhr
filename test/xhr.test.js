// const simulate = require('miniprogram-simulate')

var XMLHttpRequest = require('../index.js');
var assert = require('chai').assert;
// const {describe, it} = require('mocha');

const requestApi = require('./request.js');
global.wx = {
  request: requestApi.request
} 

describe('xhr的测试', function() {
  it('abort', function(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://www.apiopen.top/journalismApi');
    request.onreadystatechange = function () { // 状态发生变化时，函数被回调
      if(request.readyState === 4) {
        assert.fail('未能停止请求');
      }
    }
    request.send();
    request.abort();
  });

  it('getAllResponseHeaders', function(done){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://www.apiopen·.top/journalismApi');
    request.send();
    request.onreadystatechange = function () { // 状态发生变化时，函数被回调
      if(request.readyState === 4) {
        assert.include(request.getAllResponseHeaders(), 'Access-Control-Allow-Methods', '返回headers失败');
        done();
      }
    }
  });

  it('getResponseHeader', function(done){
    var request = new XMLHttpRequest();
    var _property = 'Access-Control-Allow-Methods';
    request.open('GET', 'https://www.apiopen.top/journalismApi');
    request.send();
    request.onreadystatechange = function () { // 状态发生变化时，函数被回调
      if(request.readyState === 4) {
        assert.include(request.getResponseHeader(_property), 'POST', '返回getResponseHeader失败');
        done();
      }
    }
  });

  it('overrideMimeType', function(done){
    var request = new XMLHttpRequest();
    var _property = 'Content-Type';
    request.overrideMimeType("text/plain");
    request.open("GET", 'https://www.apiopen.top/journalismApi');
    request.send();
    request.onreadystatechange = function () { // 状态发生变化时，函数被回调
      if(request.readyState === 4) {
        assert.include(request.getResponseHeader(_property), 'text/plain', '更改MIME类型失败');
        done();
      }
    }
  });

  it('setRequestHeader', function(done){
    var request = new XMLHttpRequest();
    request.open("GET", 'https://www.apiopen.top/journalismApi');
    request.setRequestHeader('X-Test', 'one');
    request.setRequestHeader('X-Test', 'two');
    request.send();
    request.onreadystatechange = function () { // 状态发生变化时，函数被回调
      if(request.readyState === 4) {
        assert.include(request.getResponseHeader('X-Test'), 'one,two', 'setRequestHeader失败');
        done();
      }
    }
  });
});