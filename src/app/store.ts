import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/MenuSlice';
import authReducer from '../features/login/loginSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import settingsReducer from '../features/settings/settingsSlice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
  },
  middleware: customizedMiddleware
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
