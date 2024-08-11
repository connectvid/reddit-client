/* eslint-disable import/no-extraneous-dependencies */
import { io } from 'socket.io-client';
import TwitterDMConfig from 'TwitterDMConfig';

// "undefined" means the URL will be computed from the `window.location` object
const URL = TwitterDMConfig.getNodeSocketUrl();

export default io(URL, { autoConnect: false });
