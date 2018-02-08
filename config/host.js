const isDugger = process.env.NODE_ENV !== 'production';
var development = {
  baseUrl: 'http://127.0.0.1:3010/api',
  imgBaseUrl:'http://oz4rno8dv.bkt.clouddn.com/'
};
var production = {
  baseUrl: '/api',
  imgBaseUrl:'http://oz4rno8dv.bkt.clouddn.com/'
};
export default isDugger ? development : production;
