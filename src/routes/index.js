// Components
import HomeScreen from '../screens/Home/index';
import JoinScreen from '../screens/Join/index';
import ChatScreen from '../screens/Chat/index';

// import ContactPage from 'pages/Contact';
// import AboutPage from 'pages/About';
// import LoginPage from 'pages/Login';
// import SignUpPage from 'pages/SignUp';
// import AccountPage from 'pages/Account';

var indexRoutes = [
    {isExact: true, path: '/', name: 'Home Screen', component: JoinScreen},
    {isExact: false, path: '/join', name: 'Join Screen', component: JoinScreen},
    {isExact: false, path: '/chat', name: 'Chat Screen', component: ChatScreen},
    // {isExact: true, path: '/signup', name: 'SignUp Page', component: SignUpPage},
    // {isExact: true, path: '/login', name: 'Login Page', component: LoginPage},
    // {isExact: true, path: '/contact', name: 'Contact Page', component: ContactPage},
    // {isExact: true, path: '/about', name: 'About Page', component: AboutPage},
    // {isExact: true, path: '/account', name: 'AccountPage', component: AccountPage}
];

export default indexRoutes;
