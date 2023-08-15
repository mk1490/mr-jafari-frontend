/** When your routing table is too long, you can split it into small modules */

const authRouter = [
    {
        path: '/signIn',
        alias: '/login',
        component: () => import('../../view/auth/SignIn.vue'),
        hidden: true,
    },
    {
        path: '/singup',
        alias: '/registration',
        component: () => import('../../view/auth/SingUp.vue'),
        hidden: true,
    },
];

export default authRouter;
