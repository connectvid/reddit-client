import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

const Login3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
const RegisterWithOTP = Loadable(lazy(() => import('views/pages/authentication3/RegisterWithOTP')));
const ForgetPassword = Loadable(lazy(() => import('views/pages/authentication3/ForgotPassword3')));
const EmailVerified = Loadable(lazy(() => import('views/pages/authentication3/EmailVerified')));
// const NotFound = Loadable(lazy(() => import('views/pages/maintenance/Error')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/login',
            element: <Login3 />
        },
        {
            path: '/register',
            element: <RegisterWithOTP />
        },
        {
            path: '/forgot-password',
            element: <ForgetPassword />
        },
        {
            path: '/email-verified',
            element: <EmailVerified />
        }
        // ,{
        //     path: '/*',
        //     element: <NotFound />
        // }
    ]
};

export default LoginRoutes;
