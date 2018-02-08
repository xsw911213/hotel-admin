import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'

// admin
// 添加酒店
const addHotel = resolve => require(['../src/views/admin/addHotel'], resolve);
// 酒店列表
const hotelList = resolve => require(['../src/views/admin/hotelList'], resolve);

// hotel
// 实时订单
const currentOrder = resolve => require(['../src/views/hotel/currentOrder'], resolve);
// 基本信息—页面信息设置
const pageInfoConfig = resolve => require(['../src/views/hotel/pageInfoConfig'], resolve);
// 基本信息—房间列表
const roomList = resolve => require(['../src/views/hotel/roomList'], resolve);
// 基本信息—打印机配置
const printerSetting = resolve => require(['../src/views/hotel/printerSetting'], resolve);
// 商品设置
const commoditySetting = resolve => require(['../src/views/hotel/commoditySetting'], resolve);


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        //iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/addHotel', component: addHotel, name: '新增酒店商户' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        //iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/hotelList', component: hotelList, name: '酒店商户列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        //iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/currentOrder', component: currentOrder, name: '实时订单' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '基本信息',
        //iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/pageInfoConfig', component: pageInfoConfig, name: '页面信息设置' },
            { path: '/roomList', component: roomList, name: '房间列表' },
            { path: '/printerSetting',component: printerSetting, name: '打印机设置' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        //iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/commoditySetting', component: commoditySetting, name: '商品设置' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;