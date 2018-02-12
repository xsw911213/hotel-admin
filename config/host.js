const isDugger = process.env.NODE_ENV !== 'production';

// console.log(window.location.hostname)
var development = {
  baseUrl: 'http://127.0.0.1:3010/api',
  imgBaseUrl:'http://oz4rno8dv.bkt.clouddn.com/',
  qrBaseUrl:'http://' + window.location.hostname + ':3010/#/shop'
};
var production = {
  baseUrl: '/api',
  imgBaseUrl:'http://oz4rno8dv.bkt.clouddn.com/'
};


export default isDugger ? development : production;
