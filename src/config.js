export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

export const FIREBASE_API = {
    apiKey: 'AIzaSyCKiGchwJyYQOAOlie3rjueG4gVvuG_e4A',
    authDomain: 'bizreply-app.firebaseapp.com',
    projectId: 'bizreply-app',
    storageBucket: 'bizreply-app.appspot.com',
    messagingSenderId: '577668839443',
    appId: '1:577668839443:web:296008cc845c9aafefe7e6'
};

export const AUTH0_API = {
    client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
    domain: 'dev-w0-vxep3.us.auth0.com'
};

export const AWS_API = {
    poolId: 'us-east-1_AOfOTXLvD',
    appClientId: '3eau2osduslvb7vks3vsh9t7b0'
};

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '';

export const PROJECT_PATH = '/projects';
export const KEYWORD_PATH = '/keywords';
export const MENTION_PATH = '/mentions';
export const DASHBOARD_PATH = PROJECT_PATH;
export const SUBSCRIPTION_PATH = '/subscription';
export const SETTING_PATH = '/settings';
export const EXPIRED_PATH = '/expired';

export const UNAUTHENTICATEDROUTES = ['/login', '/register', '/forgot-password'];
export const URL_TO_TITLE = {
    [DASHBOARD_PATH]: `Dashboard`,
    [SUBSCRIPTION_PATH]: `Subscription`,
    [SETTING_PATH]: `Settings`
};

export const DEFAULT_BUTTON_COLOR_CODE = '#009dea';

const config = {
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    // NOTE: tested this, but no changes are seen!!!!!!
    // presetColor: 'theme2', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

export default config;
