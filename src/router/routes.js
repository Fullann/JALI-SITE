//Common views
import Landing from '@/pages/Landing';
import NotFound from '@/pages/NotFound';


const Dashboard = () => import('@/layouts/Dashboard');
const Plugins = () => import('@/layouts/Plugins');

//const DashboardHome = () => import('@/pages/Home');
const Commands = () => import('@/pages/plugins/Commands');
const Settings = () => import('@/pages/dashboard/Settings');




export default [
    { path: '/', name: 'Homepage', component: Landing },
    { 
        path: '/plugins', 
        component: Plugins,
        children: [
            { path: '/', redirect: { name: 'Commands' } },
            { path: 'commands', name: 'Commands', component: Commands },
        ]
    },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            { path: '/', redirect: { name: 'DashboardHome' } },
            { path: 'home',  name: 'DashboardHome', component: Settings } ,
            { path: 'settings', name: 'Settings', component: Settings }
        ]
    },
    { path: "*", component: NotFound },
]