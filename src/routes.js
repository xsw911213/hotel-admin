import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import hotelSetting from './views/settings/hotelSetting'
import accountSetting from './views/settings/accountSetting'
import personalSetting from './views/settings/personalSetting'
import begin from './views/adSetting/begin'
import top from './views/adSetting/top'
import bottom from './views/adSetting/bottom'
// import echarts from './views/charts/echarts.vue'

// const Shop = resolve => require(['../pages/Shop/shop'], resolve);
// const Order = resolve => require(['../pages/Order/order'], resolve);

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
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,//只有一个节点
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '个人设置',
        leaf: true,//只有一个节点
        hidden: true,
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/personalSetting', component: personalSetting, name: '' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理设置',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/hotelSetting', component: hotelSetting, name: '酒店设置' },
            { path: '/accountSetting', component: accountSetting, name: '账号设置' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '广告投放',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/beginAd', component: begin, name: '开屏广告' },
            { path: '/topAd', component: top, name: '上滚动条' },
            { path: '/bottomAd', component: bottom, name: '下固定广告位' }
        ]
    }
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    
];

export default routes;