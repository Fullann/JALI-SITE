//Common views
import Landing from '@/pages/Landing';
import NotFound from '@/pages/NotFound';


const Dashboard = () => import('@/layouts/Dashboard');
const Plugins = () => import('@/layouts/Plugins');

//const DashboardHome = () => import('@/pages/Home');
const Commands = () => import('@/pages/plugins/Commands');

const Settings = () => import('@/pages/dashboard/Settings');
const Home = () => import('@/pages/dashboard/Home');




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
            { path: 'home',  name: 'DashboardHome', component: Home } ,
            { path: 'leaderboard', name: 'Leaderboard', component: Settings },
            { path: 'settings', name: 'Settings', component: Settings },
            { path: 'permium', name: 'Permium', component: Settings },
            { path: 'welcome', name: 'Welcome', component: Settings },
            { path: 'rrole', name: 'Reactionrole', component: Settings },
            { path: 'moderation', name: 'Moderation', component: Settings },
            { path: 'embeds', name: 'Embeds', component: Settings },
            { path: 'channelTemp', name: 'ChannelTemp', component: Settings },
            { path: 'search', name: 'Search', component: Settings },
            { path: 'poll', name: 'Poll', component: Settings },
            { path: 'timer', name: 'Timer', component: Settings },
            { path: 'music', name: 'Music', component: Settings },
            { path: 'economy', name: 'Economy', component: Settings },
            { path: 'level', name: 'Levels', component: Settings },

        ]
    },
    { path: "*", component: NotFound },
]