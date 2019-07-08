import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/OrderList'
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/',
            name: 'home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/AdminList',
                    component: resolve => require(['../components/page/AdminList.vue'], resolve),
                    meta: {title: '管理员管理'}
                },
                {
                    path: '/AdminEdit',
                    component: resolve => require(['../components/page/AdminEdit.vue'], resolve),
                    meta: {title: '修改'}
                },
                {
                    path: '/AdminAdd',
                    component: resolve => require(['../components/page/AdminAdd.vue'], resolve),
                    meta: {title: '新增用户'}
                },
                {
                    path: '/RoleAdd',
                    component: resolve => require(['../components/page/RoleAdd.vue'], resolve),
                    meta: {title: '新增角色'}
                },
                {
                    path: '/RoleList',
                    component: resolve => require(['../components/page/RoleList.vue'], resolve),
                    meta: {title: '角色管理'}
                },
                {
                    path: '/RoleEdit',
                    component: resolve => require(['../components/page/RoleEdit.vue'], resolve),
                    meta: {title: '角色修改'}
                },
                {
                    path: '/AuthorityAdd',
                    component: resolve => require(['../components/page/AuthorityAdd.vue'], resolve),
                    meta: {title: '新增权限'}
                },
                {
                    path: '/AuthorityList',
                    component: resolve => require(['../components/page/AuthorityList.vue'], resolve),
                    meta: {title: '权限管理'}
                },
                {
                    path: '/AuthorityEdit',
                    component: resolve => require(['../components/page/AuthorityEdit.vue'], resolve),
                    meta: {title: '修改权限'}
                },
                {
                    path: '/log',
                    component: resolve => require(['../components/page/log.vue'], resolve),
                    meta: {title: '操作日志'}
                },
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: {title: '系统首页'}
                },
                {
                    path: '/EditPassword',
                    component: resolve => require(['../components/page/EditPassword.vue'], resolve),
                    meta: {title: '修改密码'}
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: {title: '403'}
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: {title: '404'}
                },
				{
				    path: '/OrderList',
				    component: resolve => require(['../components/page/OrderList.vue'], resolve),
				    meta: {title: '全部订单'}
				},
				{
				    path: '/OrderEdit',
				    component: resolve => require(['../components/page/OrderEdit.vue'], resolve),
				    meta: {title: '订单修改'}
                },
                {
				    path: '/OrderDelivery',
				    component: resolve => require(['../components/page/OrderDelivery.vue'], resolve),
				    meta: {title: '发货'}
				},
				{
				    path: '/UserList',
				    component: resolve => require(['../components/page/UserList.vue'], resolve),
				    meta: {title: '用户列表'}
                },
                {
				    path: '/UserAddress',
				    component: resolve => require(['../components/page/UserAddress.vue'], resolve),
				    meta: {title: '用户地址表'}
                },
                {
				    path: '/UserOrder',
				    component: resolve => require(['../components/page/UserOrder.vue'], resolve),
				    meta: {title: '用户订单表'}
                },
                {
				    path: '/UserLog',
				    component: resolve => require(['../components/page/UserLog.vue'], resolve),
				    meta: {title: '用户日志表'}
				},
				{
				    path: '/GoodsList',
				    component: resolve => require(['../components/page/GoodsList.vue'], resolve),
				    meta: {title: '商品列表'}
				},
				{
				    path: '/GoodsAdd',
				    component: resolve => require(['../components/page/GoodsAdd.vue'], resolve),
				    meta: {title: '添加商品'}
				},
				{
				    path: '/GoodsEdit',
				    component: resolve => require(['../components/page/GoodsEdit.vue'], resolve),
				    meta: {title: '编辑商品'}
				},
				{
				    path: '/StoreList',
				    component: resolve => require(['../components/page/StoreList.vue'], resolve),
				    meta: {title: '门店列表'}
				},
				{
				    path: '/StoreAdd',
				    component: resolve => require(['../components/page/StoreAdd.vue'], resolve),
				    meta: {title: '添加门店'}
				},
				{
				    path: '/StoreEdit',
				    component: resolve => require(['../components/page/StoreEdit.vue'], resolve),
				    meta: {title: '编辑门店'}
                },
                {
				    path: '/DeliverList',
				    component: resolve => require(['../components/page/DeliverList.vue'], resolve),
				    meta: {title: '快递公司列表'}
                },
                {
				    path: '/DeliverAdd',
				    component: resolve => require(['../components/page/DeliverAdd.vue'], resolve),
				    meta: {title: '添加快递公司'}
                },
                {
				    path: '/DeliverEdit',
				    component: resolve => require(['../components/page/DeliverEdit.vue'], resolve),
				    meta: {title: '编辑快递公司'}
                }
            ]
        },
        {
            path: '*',
            redirect: '/404'
        }
    ],
    //
})
