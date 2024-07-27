/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-return */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useState, createContext, useEffect, useReducer } from 'react';
import { initializeApp } from 'firebase/app';
import { toast, ToastContainer } from 'react-toastify';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    // GoogleAuthProvider,
    onAuthStateChanged,
    onIdTokenChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    // signInWithPopup,
    signOut
} from 'firebase/auth';
import { ReactSession } from 'react-client-session';
// action - state management
import { LOGIN, LOGOUT } from 'features/actions';
import accountReducer from 'features/accountReducer';
// project imports
import Loader from 'ui-component/Loader';
import { FIREBASE_API, DASHBOARD_PATH } from 'config';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'utils/axios';
// import { firebase } from 'googleapis/build/src/apis/firebase';

ReactSession.setStoreType('localStorage');

// firebase initialize
// if (!firebase.apps.length) {
//     firebase.initializeApp(FIREBASE_API);
// }
initializeApp(FIREBASE_API);

const auth = getAuth();

// const
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const [dbUser, setDbUser] = useState({});
    const [isExpired, setIsExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [accessToken, setAccessToken] = useState(ReactSession.get('token') || '');

    async function refreshToken() {
        const user = auth?.currentUser;
        console.log('Current user:', user); // Debug
        if (user) {
            try {
                const token = await user.getIdToken(); // Force refresh
                console.log('Token refreshed:', token); // Debug
                setDbUser((prevUser) => ({ ...prevUser, token }));
            } catch (error) {
                console.error('Error refreshing token:', error); // Debug
            }
        }
    }
    // refreshToken(); //

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            console.log('Id token changed:', user); // Debug
            if (user) {
                refreshToken();
            }
        });

        // Cleanup
        return () => {
            unsubscribe(); // Unsubscribe from the listener when the component unmounts
        };
    }, [auth, onIdTokenChanged]);

    async function getAccessToken() {
        try {
            const accessToken = dbUser.token;
            if (accessToken) {
                const { exp } = jwtDecode(dbUser?.token || '');
                if (Date.now() > exp * 1000) {
                    const user = auth?.currentUser;
                    if (user) {
                        try {
                            const token = await user.getIdToken(); // Force refresh
                            setDbUser((prevUser) => ({ ...prevUser, token }));
                            return token;
                        } catch (error) {
                            console.error('Error refreshing token:', error); // Debug
                            return accessToken;
                        }
                    }
                    return accessToken;
                }
                return accessToken;
            }
            return '';
        } catch (e) {
            return '';
        }
    }
    //   getAccessToken();

    // firebase.auth().onIdTokenChanged((user) => {
    //     if (user) {
    //         refreshToken()
    //         // const token = await user.getIdToken();
    //     }
    //   });

    // executes when logged in user comes to the website
    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const token = user.accessToken;
                    const email = user.email;
                    const uid = user.uid;
                    setAccessToken(token);
                    ReactSession.set('token', token);
                    axios
                        .get(`user/get-user-by-email-and-uid/${email}/${uid}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                        .then(async ({ data }) => {
                            console.log(data, 'data =========================================');
                            data.user.token = token;
                            console.log(data.user, 'data user');
                            setDbUser(data.user);
                            dispatch({
                                type: LOGIN,
                                payload: {
                                    isLoggedIn: true,
                                    user: {
                                        id: user.uid,
                                        email: user.email,
                                        name: user.displayName,
                                        image: user.photoURL
                                    }
                                }
                            });
                        })
                        .catch(async (e) => {
                            console.log('error')
                            await logout();
                            if (e?.response?.status !== 404) {
                                console.log(e, '=================================error========================================');
                                localStorage.clear();
                                await logout();
                                toast(e.message || `Something went wrong`, {
                                    autoClose: 2500,
                                    type: 'error'
                                });
                            }
                        });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                    localStorage.clear();
                    signOut(auth);
                }
            }),
        []
    );

    const logout = () => {
        const logedOut = signOut(auth);
        setDbUser({});
        return logedOut;
    };

    // using this function to login by firebase, and fetch logged in users data from database.
    const firebaseEmailPasswordSignIn = ({ email, password }) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const token = await result._tokenResponse.idToken;
                const UID = result.user.uid;
                const user = {
                    UID,
                    email
                };
                console.log({ token, user });
                setAccessToken(token);
                ReactSession.set('token', token);
                axios
                    .get(`user/get-user-by-email-and-uid/${user.email}/${user.UID}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    .then(async ({ data }) => {
                        dispatch({
                            type: LOGIN,
                            payload: {
                                isLoggedIn: true,
                                user: {
                                    id: data?.user.UID,
                                    email: user.email,
                                    name: user.displayName,
                                    image: user.photoURL
                                }
                            }
                        });
                        data.user.token = token;
                        setDbUser(data.user);
                        return navigate(DASHBOARD_PATH);
                    })
                    .catch(async (e) => {
                        await logout();
                        toast(e.message || 'Something went wrong', {
                            autoClose: 2500,
                            type: 'error'
                        });
                    })
                    .finally(() => setIsLoading(false));
            })
            .catch((e1) => {
                console.log(JSON.stringify(e1), '===');
                const { code, message } = e1;
                const msg = code === 'auth/user-not-found' || code === 'auth/wrong-password' ? `Credentials doesn't match` : message;
                toast(msg, {
                    autoClose: 2500,
                    type: 'error'
                });
                setIsLoading(false);
            });
    };

    const firebaseGoogleLoginOrSignup = async () => {
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, googleProvider);
        const body = {
            email: data?.user?.email,
            name: data?.user?.displayName,
            UID: data?.user?.uid
        };
        const token = data?.user?.accessToken;
        setAccessToken(token);
        ReactSession.set('token', token);
        console.log(data?.user, body, token);

        axios
            .post(`user/create-user-or-get-user`, body, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(({ data }) => {
                console.log(data?.user);
                data.user.token = token;
                // console.log({ data, user: data.user });
                setDbUser(data.user);
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user: {
                            id: data.user.uid,
                            email: data.user.email,
                            name: data.user.name,
                            image: data.user.photoURL || ''
                        }
                    }
                });
                return navigate(DASHBOARD_PATH);
            })
            .catch(async (eRR) => {
                localStorage.clear();
                // if (UID) {
                //     await auth.currentUser.delete();
                // }
                await logout();
                setGeneralError(eRR.response?.data?.message || eRR.message || 'Something went wrong');
            })
            .finally(() => setIsLoading(false));
    };

    // using this function to register user at firsbase and create user at out database.
    const firebaseRegisterWithOTP = (values) => {
        setIsLoading(true);
        const { email, name, password } = values;

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const token = await result._tokenResponse.idToken;
                const UID = result.user.uid;
                const body = {
                    UID,
                    email,
                    name
                };

                axios
                    .post(`user/create-user`, body, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    .then(({ data }) => {
                        data.user.token = token;
                        console.log({ data, user: data.user });
                        setDbUser(data.user);
                        dispatch({
                            type: LOGIN,
                            payload: {
                                isLoggedIn: true,
                                user: {
                                    id: result.user.uid,
                                    email: result.user.email,
                                    name: result.user.displayName,
                                    image: result.user.photoURL
                                }
                            }
                        });
                        return navigate(DASHBOARD_PATH);
                    })
                    .catch(async (eRR) => {
                        localStorage.clear();
                        if (UID) {
                            await auth.currentUser.delete();
                        }
                        await logout();
                        setGeneralError(eRR.response?.data?.message || eRR.message || 'Something went wrong');
                    })
                    .finally(() => setIsLoading(false));
            })
            .catch((error) => {
                let msg = 'Something wont wrong';
                if (error.code === 'auth/email-already-in-use') msg = 'User already register';
                setGeneralError(msg);
            })
            .finally(() => setIsLoading(false));
    };

    const resetPassword = async (email) => {
        await sendPasswordResetEmail(email);
    };

    const updateProfile = () => { };
    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <FirebaseContext.Provider
            value={{
                ...state,
                firebaseEmailPasswordSignIn,
                logout,
                resetPassword,
                updateProfile,
                dbUser,
                setDbUser,
                isExpired,
                accessToken,
                setAccessToken,
                isLoading,
                generalError,
                setGeneralError,
                firebaseRegisterWithOTP,
                auth,
                firebaseGoogleLoginOrSignup,
                getAccessToken
            }}
        >
            <ToastContainer position="bottom-right" autoClose={2000} />
            {children}
        </FirebaseContext.Provider>
    );
};

FirebaseProvider.propTypes = {
    children: PropTypes.node
};

export default FirebaseContext;
