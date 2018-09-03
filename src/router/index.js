import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页',permission: true ,keepAlive:true}
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/User.vue'], resolve),
                    meta: { title: '用户管理',permission: true ,keepAlive:true}
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '消息通知',permission: true ,keepAlive:true},
                    name:'msg'
                },
                {
                    path: '/unitlist',
                    component: resolve => require(['../components/page/UnitList.vue'], resolve),
                    meta: { title: '单位列表',permission: true,keepAlive:true }
                },
                {
                    path: '/assets',
                    component: resolve => require(['../components/page/ApplicationAssets.vue'], resolve),
                    meta: { title: '应用资产',permission: true,keepAlive:true },
                    name:'assets'
                },
                {
                    path: '/serve',
                    component: resolve => require(['../components/page/ServerAssets.vue'], resolve),
                    meta: { title: '服务器资产',permission: true,keepAlive:true },
                    name:'serve',
                },
                {
                    path: '/NormalObserver',
                    component: resolve => require(['../components/page/NormalObserver.vue'], resolve),
                    meta: { title: '正常监测',permission: true,keepAlive:true },
                    name:'NormalObserver'
                },
                {
                    path: '/BaselineObserver',
                    component: resolve => require(['../components/page/BaselineObserver.vue'], resolve),
                    meta: { title: '基线监测',permission: true,keepAlive:true },
                    name:'permission'
                },
                {
                    path: '/modifyData',
                    component: resolve => require(['../components/page/ModifyData.vue'], resolve),
                    meta: { title: '修改资料',permission: true,keepAlive:true },
                    name:'modifyData'
                },
                {
                    path: '/monitoring',
                    component: resolve => require(['../components/page/Threatview.vue'], resolve),
                    meta: { title: '威胁总览',permission: true,keepAlive:true }
                },
                {
                    path: '/pushSetting',
                    component: resolve => require(['../components/page/PushSetting.vue'], resolve),
                    meta: { title: '推送配置',permission: true,keepAlive:true },
                    name:'pushSetting'
                },
                {
                    path: '/StrategyConfiguration',
                    component: resolve => require(['../components/page/StrategyConfiguration.vue'], resolve),
                    meta: { title: '策略管理',permission: true,keepAlive:true },
                    name:'StrategyConfiguration'
                },
                {
                    path: '/test',
                    component: resolve => require(['../components/page/test.vue'], resolve),
                    meta: { title: 'test',permission: true,keepAlive:true },
                },
                {
                    path: '/assetsRecord',
                    component: resolve => require(['../components/page/AssetsRecord.vue'], resolve),
                    meta: { title: '资产梳理记录',permission: true,keepAlive:true },
                    name:'assetsRecord'
                },
                {
                    path: '/assetsResult',
                    component: resolve => require(['../components/page/AssetsResult.vue'], resolve),
                    meta: { title: '资产梳理',permission: true ,keepAlive:true},
                    name:'assetsResult'
                },
                {
                    path: '/monitorResult',
                    component: resolve => require(['../components/page/monitorResult.vue'], resolve),
                    meta: { title: '安全检测记录',permission: true,keepAlive:true },
                    name:'monitorResult'
                },
                {
                    path: '/monitorDetails',
                    component: resolve => require(['../components/page/monitorDetails.vue'], resolve),
                    meta: { title: '检测详情',permission: true ,keepAlive:true},
                    name:'monitorDetails'
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
