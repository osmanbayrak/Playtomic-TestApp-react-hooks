import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { initializeApp } from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore/lite';
import { AppThunk } from '../../app/store';
import { DashboardDataDto } from '../../Models/DataModels/DashboardDataDto';
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
export interface DashboardState {
    dashboardData: DashboardDataDto
}

const initialState: DashboardState = {
    dashboardData: {
        chartData: [],
        liquid: 0,
        doctors: 0,
        patients: 0,
        nurses: 0,
        pharmacusts: 0,
    }
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<DashboardDataDto>) => {
            state.dashboardData = action.payload;
        },
    },
});

export const { setData } = dashboardSlice.actions;

export const getDashboardData = (db: any, navigate: any): AppThunk => (
    dispatch
) => {
    const dashboardCol = collection(db, 'dashboard');

    // API request to get data
    getDocs(dashboardCol).then((dashboardSnapshot) => {
        const dashboardUnmappedData: DashboardDataDto[] = dashboardSnapshot.docs.map(doc => doc.data()) as DashboardDataDto[];

        if (dashboardUnmappedData && dashboardUnmappedData[0]) {
            let dashboardData: DashboardDataDto = dashboardUnmappedData[0];

            dispatch(setData(dashboardData));
            dispatch(toggleLoading(false));
        } else {
            dispatch(toggleLoading(false));
            notification['error']({
                message: 'API Error',
                description:
                    'No Data Was Found.',
            });
        }
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
            // If user is not authenticated, user redirect to login page
            if (errorCode === 'permission-denied') {
                navigate('/login');
            }
        });
};

export default dashboardSlice.reducer;
