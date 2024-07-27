/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
// external imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import TwitterDMConfig from 'TwitterDMConfig';
import { ReactSession } from 'react-client-session';
// internal imports
import auth from '../../firebase/firebase.config';
import axios from 'axios';

const initialState = {
    user: {
        // name: '',
        // email: '',
        // uid: '',
        // profile: '',
        // role: '',
        // status: '',
        // // OTP: '',
        // // OTPExpiry: '',
        // stripeCustomerID: '',
        // selectedPlan: '',
        // endDate: '',
        // extensionCode: '',
        // _id: '',
        // accessToken: ''
    },
    isLoading: true,
    isError: false,
    error: ''
};

export const createUser = createAsyncThunk('auth/createUser', async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data?.user?.email;
});

export const getUser = createAsyncThunk('auth/getUser', async ({ token }) => {
    const res = axios.get(`${TwitterDMConfig.getNodeUrl()}user/api/user-me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res;
});

// export const getUser = createAsyncThunk('auth/getUser', async ({ accessToken, email }) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/user/getUser/${email}`, {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`
//         }
//     });

//     const data = await res.json();

//     if (data?.isSuccess && data?.user) {
//         return data.user;
//     }
//     return 0;
// });

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data?.user?.email;
});

export const googleLogin = createAsyncThunk('auth/googleLogin', async () => {
    const googleProvider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, googleProvider);
    return data?.user?.email;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {
                name: '',
                email: '',
                uid: '',
                profile: '',
                role: '',
                status: '',
                OTP: '',
                OTPExpiry: '',
                stripeCustomerID: '',
                selectedPlan: '',
                endDate: '',
                extensionCode: '',
                _id: '',
                accessToken: ''
            };
        },
        setUser: (state, { payload }) => {
            state.user.email = payload.email;
            state.user.accessToken = payload.accessToken;
            state.user.uid = payload.uid;
            state.isLoading = false;
            state.isError = false;
            state.error = '';
        },
        setUserDetails: (state, { payload }) => {
            state.user.name = payload.name;
            state.user.role = payload.role;
            state.user.status = payload.status;
            state.user.profile = payload.profile;
            state.user.stripeCustomerID = payload.stripeCustomerID;
            state.user.selectedPlan = payload.selectedPlan;
            state.user.endDate = payload.endDate;
            state.user.OTP = payload.OTP;
            state.user.OTPExpiry = payload.OTPExpiry;
            state.user.extensionCode = payload.extensionCode;
            state.user._id = payload._id;
            state.isLoading = false;
            state.isError = false;
            state.error = '';
        },
        toggleLoading: (state) => {
            state.isLoading = !state.isLoading;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user.email = payload;
                state.isError = false;
                state.error = '';
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user.email = payload;
                state.isError = false;
                state.error = '';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(googleLogin.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(googleLogin.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user.email = payload;
                state.isError = false;
                state.error = '';
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.user.email = '';
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                const data = payload.data.me;
                const sessionDbUser = ReactSession.get('dbuser');
                if (sessionDbUser) {
                    const prev = { ...sessionDbUser };
                    prev.credits = data.credits;
                    prev.stripeCustomerID = data.stripeCustomerID;
                    prev.selectedPlan = data.selectedPlan;
                    ReactSession.set('dbuser', prev);
                }
                state.user = data;
            })
            // .addCase(getUser.fulfilled, (state, { payload }) => {
            //     state.isLoading = false;
            //     console.log(payload);
            //     if (payload._id) {
            //         state.user.name = payload.name;
            //         state.user.role = payload.role;
            //         state.user.status = payload.status;
            //         state.user.profile = payload.profile;
            //         state.user.uid = payload.uid;
            //         state.user.stripeCustomerID = payload.stripeCustomerID;
            //         state.user.selectedPlan = payload.selectedPlan;
            //         state.user.endDate = payload.endDate;
            //         state.user._id = payload._id;
            //     } else {
            //         state.user.email = payload;
            //     }
            //     state.isError = false;
            //     state.error = '';
            // })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                // state.user.email = '';
                state.isError = true;
                state.error = action.error.message;
            });
    }
});

export default authSlice.reducer;

export const { logout, setUser, toggleLoading } = authSlice.actions;
