export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

const {
    REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID
} = process.env;

export const FIREBASE_API = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID
};
console.log(FIREBASE_API.projectId, 'PROJECT ID');

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
export const REPLY_PATH = '/replies';
export const DASHBOARD_PATH = PROJECT_PATH;
export const SUBSCRIPTION_PATH = '/subscription';
export const SETTING_PATH = '/settings';
export const REPORTS_PATH = '/reports';
export const EXPIRED_PATH = '/expired';
export const ONBOARDING_PATH = '/onboarding';
export const PROMPT_PATH = '/prompts';

export const UNAUTHENTICATEDROUTES = ['/login', '/register', '/forgot-password'];
export const URL_TO_TITLE = {
    [DASHBOARD_PATH]: `Dashboard`,
    [SUBSCRIPTION_PATH]: `Subscription`,
    [SETTING_PATH]: `Settings`
};

export const DEFAULT_BUTTON_COLOR_CODE = '#009dea';
export const PRIMARY_GREY_COLOR = '#6e7478';
export const NEW_POST_RAG_PAST_DAYS = 7;

export const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{}|\\;:'",.<>?/`~]).{8,32}$/;
export const domainRegex = /^(https?:\/\/)?(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

const config = {
    fontFamily: `Inter, sans-serif`,
    // fontFamily: `'Roboto', sans-serif`, // Gemunu Libre  Helvetica Neue
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'bizReply', // default, theme1, theme2, theme3, theme4, theme5, theme6, bizReply
    // NOTE: tested this, but no changes are seen!!!!!!
    // presetColor: 'theme2', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
};

export default config;
// calc(100vh - 16px)
