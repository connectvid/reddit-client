/*  eslint-disable-next-line import/no-unresolved */
import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_APP_API_SOCKET_URL : process.env.REACT_APP_APP_API_URL;

export default io(URL, { autoConnect: false });
