/* eslint-disable class-methods-use-this */
// const NODE_BASE_URL_LOCAL = 'https://ccb9-116-206-253-168.ngrok-free.app'; // localhost
const NODE_BASE_URL_LOCAL = 'http://localhost:5000'; // localhost
const NODE_BASE_URL = 'https://reddit-server-2ptn.onrender.com'; // live

class TwitterDMConfig {
    getNodeUrl() {
        return process.env.NODE_ENV === 'development' ? NODE_BASE_URL_LOCAL : NODE_BASE_URL;
    }

    tweetPerPage = 30;
}

export default new TwitterDMConfig();
