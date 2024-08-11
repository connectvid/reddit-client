/* eslint-disable class-methods-use-this */
// const NODE_BASE_URL_LOCAL = 'https://ccb9-116-206-253-168.ngrok-free.app'; // localhost
const NODE_BASE_URL_LOCAL = 'http://localhost:5000'; // localhost
export const NODE_BASE_URL_SOCKET_LOCAL = 'http://localhost:5000'; // localhost
export const NODE_BASE_URL = 'https://dev-reddit-server.onrender.com'; // dev
const NODE_BASE_URL_MAIN = 'https://reddit-server-2ptn.onrender.com'; // live
const originWise = ['https://gv-reddit.netlify.app', 'https://app.bizreply.co'].includes(window.location.origin)
    ? NODE_BASE_URL_MAIN
    : NODE_BASE_URL;
class BizReplyConfig {
    getNodeUrl() {
        return process.env.NODE_ENV === 'development' ? NODE_BASE_URL_LOCAL : originWise;
    }

    getNodeSocketUrl() {
        return process.env.NODE_ENV === 'development' ? NODE_BASE_URL_SOCKET_LOCAL : originWise;
    }

    tweetPerPage = 30;
}

export default new BizReplyConfig();
