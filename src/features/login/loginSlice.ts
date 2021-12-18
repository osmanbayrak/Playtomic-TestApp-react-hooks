import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { NavigateFunction } from 'react-router';
import { AppThunk } from '../../app/store';
import { loginInputDataDto, userInfoDto } from '../../Models/DataModels/LoginDataDto';
import { toggleLoading } from '../menu/MenuSlice';

const firebaseConfig = {
    apiKey: "AIzaSyC2xl3mNGQbQ7jh8An2q-3hrlIX65FXc_s",
    authDomain: "playtomic-auth-77056.firebaseapp.com",
    projectId: "playtomic-auth-77056",
    storageBucket: "playtomic-auth-77056.appspot.com",
    messagingSenderId: "1007166344297",
    appId: "1:1007166344297:web:30656113fae9349d9b66f8",
    measurementId: "G-YR1L6MQ01L"
};
initializeApp(firebaseConfig);
export interface LoginState {
    userInfo: userInfoDto
}

const initialState: LoginState = {
    userInfo: {
        displayName: "",
        email: "",
        expiresIn: "",
        idToken: "",
        kind: "",
        localId: "",
        refreshToken: "",
        registered: false
    }
};

const auth = getAuth();

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginInfo: (state, action: PayloadAction<userInfoDto>) => {
            state.userInfo = action.payload;
        },
    },
});

export const { setLoginInfo } = loginSlice.actions;

export const login = (loginData: loginInputDataDto, navigate: NavigateFunction): AppThunk => (dispatch) => {
    // JTW token will be kept in browser storage --> indexedDb tab
    (signInWithEmailAndPassword(auth, loginData.email, loginData.password))
        .then((userCredential: any) => {
            const user = userCredential.user;
            dispatch(setLoginInfo(user));
            navigate('/Dashboard');
            localStorage.setItem('user', JSON.stringify(user))
            // ...
        })
        .catch((error: any) => {
            dispatch(toggleLoading(false));
            const errorCode = error.code;
            const errorMessage = error.message;
            notification['error']({
                message: errorCode,
                description:
                    errorMessage,
            });
        });
};

export default loginSlice.reducer;
