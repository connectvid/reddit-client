/* eslint-disable class-methods-use-this */
// const NODE_BASE_URL_LOCAL = 'https://ccb9-116-206-253-168.ngrok-free.app'; // localhost
// const NODE_BASE_URL_LOCAL = 'http://localhost:5000'; // localhost
export const NODE_BASE_URL_SOCKET_LOCAL = 'http://localhost:5001'; // localhost
// export const NODE_BASE_URL = 'https://dev.bizreply.co'; // dev
// export const NODE_BASE_URL = 'https://dev.bizreply.co'; // dev
// const NODE_BASE_URL_MAIN = 'https://api1.bizreply.co'; // live

class BizReplyConfig {
    getNodeUrl() {
        return process.env.REACT_APP_APP_API_URL;
    }

    getNodeSocketUrl() {
        return process.env.NODE_ENV === 'development' ? process.env.REACT_APP_APP_API_SOCKET_URL : process.env.REACT_APP_APP_API_URL;
    }

    tweetPerPage = 30;
}

export default new BizReplyConfig();
