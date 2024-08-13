/*  eslint-disable-next-line import/no-unresolved */
import { io } from 'socket.io-client';
import BizReplyConfig from 'BizReplyConfig';

// "undefined" means the URL will be computed from the `window.location` object
const URL = BizReplyConfig.getNodeSocketUrl();

export default io(URL, { autoConnect: false });
