import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { initializeApp } from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore/lite';
import { AppThunk } from '../../app/store';
import { db, firebaseConfig } from '../../FirebaseConfig';
import { DashboardDataDto } from '../../Models/DataModels/DashboardDataDto';
import { toggleLoading } from '../menu/MenuSlice';

initializeApp(firebaseConfig);
export interface DashboardState {
    dashboardData: DashboardDataDto;
}

const initialState: DashboardState = {
    dashboardData: {
        chartData: [
            {
                Patients: 0,
                Discharged: 0,
                Year: '0',
            }
        ],
        pieData: [
            {
                Month: '',
                Profit: 0,
            }
        ],
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

export const getDashboardData = (navigate: any): AppThunk => (
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
            };
        });
};

export default dashboardSlice.reducer;
