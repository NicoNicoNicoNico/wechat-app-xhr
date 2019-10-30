const simulate = require('miniprogram-simulate')
// var add = require('../index.js');
// var expect = require('chai').expect;

// describe('', function() {
//   it('1 加 1 应该等于 2', function() {
//     expect(add(1, 1)).to.be.equal(2);
//   });
// });
test('test sth', () => {
  const id = simulate.load('/index') // 加载自定义组件
  const comp = simulate.render(id) // 渲染自定义组件

  console.log('id', id);
  console.log('comp', id);

  // 使用自定义组件封装实例 comp 对象来进行各种单元测试
})
// describe('xhr的测试', function() {
//   it('abort', function(){
//     const request = new XMLHttpRequest();
    

//   });

//   it('getAllResponseHeaders', function(){

//   });

//   it('getResponseHeader', function(){

//   });

//   it('overrideMimeType', function(){

//   });

//   it('open', function(){

//   });

//   it('send', function(){

//   });

//   it('setRequestHeader', function(){

//   });

//   it('_validateResType', function(){

//   });

//   it('_execStateChanged', function(){

//   });

//   // 事件
//   it('onabort', function(){

//   });

//   it('onerror', function(){

//   });

//   it('onload', function(){

//   });

//   it('onloadend', function(){

//   });

//   it('ontimeout', function(){

//   });
// });