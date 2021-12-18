import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { initializeApp } from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore/lite';
import { AppThunk } from '../../app/store';
import { db, firebaseConfig } from '../../FirebaseConfig';
import { SettingsDataDto } from '../../Models/DataModels/SettingsDataDto';
import { toggleLoading } from '../menu/MenuSlice';

initializeApp(firebaseConfig);
export interface SettingsState {
    settingsData: SettingsDataDto;
};


const initialState: SettingsState = {
    settingsData: {
        hospitalName: '',
        buildDate: '',
        founders: '',
        location: '',
        isAvailable: '',
        workingHours: '',
        contactInfo: '',
    }
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<SettingsDataDto>) => {
            state.settingsData = action.payload;
        },
    },
});

export const { setData } = settingsSlice.actions;

export const getSettingsData = (navigate: any): AppThunk => (
    dispatch
) => {
    const settingsCol = collection(db, 'dashboard');
    getDocs(settingsCol).then((settingsSnapshot) => {
        const settingsUnmappedData: SettingsDataDto[] = settingsSnapshot.docs.map(doc => doc.data()) as SettingsDataDto[];

        if (settingsUnmappedData && settingsUnmappedData[1]) {
            let settingsData: SettingsDataDto = settingsUnmappedData[1];

            dispatch(setData(settingsData));
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
            if (errorCode === 'permission-denied') {
                navigate('/login');
            }
        });
};

export default settingsSlice.reducer;
