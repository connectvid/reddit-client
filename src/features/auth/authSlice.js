/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
// external imports
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: '',
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
        settingUser: (state, { payload }) => {
            state.user = payload;
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
        },
        settingAccessToken: (state, action) => {
            state.accessToken = action.payload;
        }
    }
});

export default authSlice.reducer;
export const { logout, setUser, toggleLoading, settingAccessToken, settingUser } = authSlice.actions;
