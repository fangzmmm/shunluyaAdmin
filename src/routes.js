import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import User from './views/nav1/User.vue'
import Order from './views/nav1/order.vue'
import echarts from './views/charts/echarts.vue'
import Address from './views/nav1/address.vue'



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
        iconCls: 'fa fa-home',
        leaf: true,//只有一个节点
        children: [
            { path: '/echarts', component: echarts, name: '主页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,//只有一个节点
        iconCls: 'fa fa-id-card-o',//图标样式class
        children: [
            { path: '/User', component: User, name: '用户管理'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-list-alt',
        leaf: true,//只有一个节点
        children: [
            { path: '/order', component: Order, name: '订单查看' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-map-marker',
        leaf: true,//只有一个节点
        children: [
            { path: '/address', component: Address, name: '地址管理' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // }
];

export default routes;