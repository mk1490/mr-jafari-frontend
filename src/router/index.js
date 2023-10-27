import Vue from 'vue';
import Router from 'vue-router';
import AdminLayout from '../view/layout/TheLayout.vue';
import EnduserLayout from '../view/components/Enduser/Layout/TheLayout.vue';

Vue.use(Router);

export const constantRoutes = [
    {
        path: '*', hidden: true, redirect: '',
    },
    {
        path: '/Admin',
        name: 'AdminRoot',
        component: AdminLayout,
        meta: {
            noCache: true, affix: true,
            title: 'route.Management',
            // permission: 'users.update,users.list,users.insert,users.delete,users.change_password,settings.update,personnel.update_personal_photo,personnel.update,personnel.list,personnel.insert,personnel.delete,personnel.change_tag_credit,normal_report.listmulti_media.list,multi_media.insert,multi_media.delete,messages.update,messages.list,messages.insert,messages.delete,live_report.list,instant_messages.list,instant_messages.insert,instant_messages.cancel_message,devices.list,devices.insert,devices.delete,access_permissions.update,access_permissions.insert,access_permissions.delete'
        },
        children: [
            {
                path: 'Users',
                name: 'Users',
                component: () => import('@/view/components/Admin/Users/UsersManagement.vue'),
                meta: {
                    title: 'route.users',
                    icon: 'mdi-account-multiple',
                    // permission: 'users.list,users.update,users.insert,users.delete,users.change_password'
                },
            },
            {
                path: 'accessPermissions',
                name: 'accessPermissions',
                component: () => import('@/view/components/Admin/Users/AccessPermissionsGroup/AccessPermissionGroupsManagement.vue'),
                meta: {
                    title: 'route.accessPermissions',
                    icon: 'mdi-account-settings',
                    // permission: 'access_permissions.list,access_permissions.update,access_permissions.insert,access_permissions.delete'
                },
            },
            {
                path: '/likertTemplates',
                name: 'likertTemplates',
                component: () => import('@/view/components/Admin/LikertTemplates/LikertTemplatesManagement.vue'),
                meta: {
                    title: 'route.likertTemplates',
                    icon: 'mdi-help',
                    // permission: 'access_permissions.list,access_permissions.update,access_permissions.insert,access_permissions.delete'
                },
            },
            {
                path: 'questions',
                name: 'questions',
                component: () => import('@/view/components/Admin/Users/Questions/QuestionsManagement.vue'),
                meta: {
                    title: 'route.questions',
                    icon: 'mdi-help',
                    // permission: 'access_permissions.list,access_permissions.update,access_permissions.insert,access_permissions.delete'
                },
            },
        ]
    },
    {
        path: '/Admin/Report', name: 'AdminReport',
        component: AdminLayout,
        meta: {
            noCache: true, affix: true,
            title: 'route.reports.title',
        },
        children: [
            {
                path: '/ByUsers',
                name: 'ReportByUsers',
                component: () => import('@/view/components/Report/ReportByUser/ReportByUsers.vue'),
                meta: {
                    title: 'گزارش بر اساس کاربران',
                    // icon: 'mdi-account-multiple',
                },
            },
            {
                path: '/ByQuestions',
                name: 'ReportByQuestions',
                component: () => import('@/view/components/Report/ReportByQuestion/ReportByQuestion.vue'),
                meta: {
                    title: 'گزارش بر اساس سؤالات',
                    // icon: 'mdi-account-multiple',
                },
            },
        ]
    },
    {
        path: '', name: 'Root',
        component: EnduserLayout,
        hidden: true,
        children: [
            {
                path: '',
                name: 'Main',
                component: () => import('@/view/components/Enduser/Main.vue'),
                meta: {},
            },
            {
                path: '/SurveyComplete',
                name: 'SurveyComplete',
                component: () => import('@/view/components/Enduser/SurveyComplete.vue'),
                meta: {},
            },
            {
                path: '/qwerty',
                name: 'qwerty',
                component: () => import('@/view/components/Enduser/Test.vue'),
                meta: {},
            },
        ]
    },
    {
        path: '/Login', name: 'Login',
        component: () => import('@/view/components/Login.vue'),
        hidden: true,
        meta: {},
    },
];
export default new Router({
    scrollBehavior: () => ({y: 0}), routes: constantRoutes,
    mode: 'hash',
    // base: '/admin/'
});
export const asyncRoutes = [{path: '*', redirect: '/error/404', hidden: true},];
