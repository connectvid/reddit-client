/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
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
    signOut,
    updatePassword
} from 'firebase/auth';
import { ReactSession } from 'react-client-session';
// action - state management
import { LOGIN, LOGOUT } from 'features/actions';
import accountReducer from 'features/accountReducer';
// project imports
import Loader from 'ui-component/Loader';
import { FIREBASE_API, ONBOARDING_PATH } from 'config';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'utils/axios';
import { useDispatch } from 'react-redux';
import { settingAccessToken, settingUser } from 'features/auth/authSlice';
import { getProjects, projectClear } from 'features/project/projectActions';
import { getMySubscriptionAPI, subscriptionClear, subsctriptionSetter } from 'features/subscription/subscriptionActions';
import { getPromptsAPI } from 'features/prompt/promptActions';
import { getMentionSettingAPI, mentionSetter } from 'features/mention/mentionActions';
import { getAllReportsAPI } from 'features/report/reportActions';
import { getAiModelsAPI } from 'features/ai-model/aiModelActions';
// import { firebase } from 'googleapis/build/src/apis/firebase';

ReactSession.setStoreType('localStorage');

initializeApp(FIREBASE_API);

const auth = getAuth();

// const
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};
let isRegister = false;
// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const [dbUser, setDbUser] = useState({});
    // const [isRegister, setIsRegister] = useState(false);
    const [isExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [authProviders, setAuthProviders] = useState([]);
    const [accessToken, setAccessToken] = useState(ReactSession.get('token') || '');
    const reduxDispatch = useDispatch();
    // console.log({ isRegister });

    const changePassword = async ({ oldPassword, password }) => {
        await signInWithEmailAndPassword(auth, dbUser.email, oldPassword);
        return updatePassword(auth.currentUser, password);
    };

    async function refreshToken() {
        const user = auth?.currentUser;
        // console.log('Current user:', user); // Debug
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
            // console.log('Id token changed:', user); // Debug
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
                            reduxDispatch(settingAccessToken(token));
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
    useEffect(() => {
        if (isLoading) return;
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const token = user.accessToken;
                reduxDispatch(settingAccessToken(token));
                const email = user.email;
                const uid = user.uid;
                setAccessToken(token);
                ReactSession.set('token', token);
                setAuthProviders(user.providerData.map((item) => item.providerId));
                // console.log({ email, uid, token });
                axios
                    .get(`user/get-user-by-email-and-uid/${email}/${uid}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    .then(async ({ data }) => {
                        console.log(data, 'data =========================================');
                        data.user.token = token;
                        const userData = data.user;
                        console.log(userData, 'data user');
                        setDbUser(userData);
                        reduxDispatch(settingUser(userData));
                        getProjects(userData._id, token)();
                        getMySubscriptionAPI(token)();
                        getPromptsAPI(token)();
                        getMentionSettingAPI(token)();
                        getAllReportsAPI(token)();
                        getAiModelsAPI(token)();

                        dispatch({
                            type: LOGIN,
                            payload: {
                                isLoggedIn: true,
                                user: {
                                    id: user.uid,
                                    email: user.email,
                                    name: user.displayName || user.name,
                                    image: user.photoURL
                                }
                            }
                        });
                        // if (isRegister) setIsRegister(false);
                    })
                    .catch(async (e) => {
                        console.log('error', e?.response?.data || e.message, { isRegister });
                        if (isRegister === false) {
                            console.log({ isRegister }, 'isRegisterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
                            localStorage.clear();
                            await logout();
                            signOut(auth);
                        }
                        if (e?.response?.status !== 404) {
                            console.log(e, '===error==========');
                            toast(`User not found. Please check the details and try again.`, {
                                autoClose: 2500,
                                type: 'warning'
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
        });
    }, []);

    function logout() {
        const logedOut = signOut(auth);
        setDbUser({});
        projectClear()();
        subscriptionClear()();
        return logedOut;
    }

    // using this function to login by firebase, and fetch logged in users data from database.
    const firebaseEmailPasswordSignIn = ({ email, password }) => {
        setIsLoading(true);
        isRegister = true;
        console.log({ isRegister }, email);

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
                        if (data.subscription) {
                            subsctriptionSetter({ item: data.subscription })();
                        }
                        if (data.mentionSetting) {
                            mentionSetter({ item: data.mentionSetting })();
                        }
                        //
                        dispatch({
                            type: LOGIN,
                            payload: {
                                isLoggedIn: true,
                                user: {
                                    id: data?.user.UID,
                                    email: user.email,
                                    name: user.displayName || user.name,
                                    image: user.photoURL
                                }
                            }
                        });

                        data.user.token = token;
                        setDbUser(data.user);
                        setIsLoading(false);
                        // return navigate(DASHBOARD_PATH);
                    })
                    .catch(async () => {
                        await logout();
                        setIsLoading(false);
                        isRegister = false;
                        toast('User not found. Please check the details and try again.', {
                            autoClose: 2500,
                            type: 'warning'
                        });
                    });
            })
            .catch((e1) => {
                console.log(JSON.stringify(e1), '===');
                const { code, message } = e1;
                const msg = code === 'auth/user-not-found' || code === 'auth/wrong-password' ? `Credentials doesn't match` : message;
                toast(msg, {
                    autoClose: 2500,
                    type: 'warning'
                });
                setIsLoading(false);
                isRegister = false;
            });
    };

    const firebaseGoogleLoginOrSignup = async () => {
        setIsLoading(true);
        isRegister = true;
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
            .then(({ data, status }) => {
                console.log(data?.user);
                data.user.token = token;
                // console.log({ data, user: data.user });
                setDbUser(data.user);
                if (data.subscription) {
                    subsctriptionSetter({ item: data.subscription })();
                }
                if (data?.mentionSetting) {
                    mentionSetter({ item: data.mentionSetting })();
                }
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
                setIsLoading(false);

                if (status === 201) return navigate(ONBOARDING_PATH);
            })
            .catch(async (eRR) => {
                localStorage.clear();
                if (isRegister) {
                    isRegister = false;
                }
                await logout();
                setIsLoading(false);
                setGeneralError(eRR.response?.data?.message || eRR.message || 'Something went wrong');
            });
    };

    // using this function to register user at firsbase and create user at out database.
    const firebaseRegisterWithOTP = (values) => {
        setIsLoading(true);
        isRegister = true;
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
                        if (data.subscription) {
                            subsctriptionSetter({ item: data.subscription })();
                        }
                        if (data?.mentionSetting) {
                            mentionSetter({ item: data.mentionSetting })();
                        }
                        dispatch({
                            type: LOGIN,
                            payload: {
                                isLoggedIn: true,
                                user: {
                                    id: result.user.uid,
                                    email: result.user.email,
                                    name: result.user.displayName || result?.user?.name,
                                    image: result.user.photoURL
                                }
                            }
                        });
                        setIsLoading(false);
                        return navigate('/email-verified');
                        // return navigate(ONBOARDING_PATH);
                    })
                    .catch(async (eRR) => {
                        localStorage.clear();
                        isRegister = false;
                        if (UID) {
                            await auth.currentUser.delete();
                        }
                        await logout();
                        setIsLoading(false);
                        setGeneralError(eRR.response?.data?.message || eRR.message || 'Something went wrong');
                    });
            })
            .catch((error) => {
                let msg = 'Something wont wrong';
                if (error.code === 'auth/email-already-in-use') msg = 'User already register';
                setGeneralError(msg);
                setIsLoading(false);
                isRegister = false;
            });
    };

    const resetPassword = async (email) => {
        await sendPasswordResetEmail(email);
    };

    const updateProfile = async ({ name }) => {
        const token = await getAccessToken();
        const { data } = await axios.put(
            `user`,
            { name },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setDbUser((p) => ({ ...p, name, displayName: name }));
        // dispatch({
        //     type: UPDATE_USER,
        //     payload: {
        //         data: {
        //             name
        //         }
        //     }
        // });
        return data;
    };
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
                getAccessToken,
                changePassword,
                authProviders
            }}
        >
            <ToastContainer position="top-right" autoClose={2000} />
            {children}
        </FirebaseContext.Provider>
    );
};

FirebaseProvider.propTypes = {
    children: PropTypes.node
};

export default FirebaseContext;
