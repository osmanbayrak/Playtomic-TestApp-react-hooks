import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import "antd/dist/antd.css";
import { Login } from './features/login/Login';
import { Dashboard } from './features/dashboard/Dashboard';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Settings } from './features/settings/Settings';
import { SideMenu } from './features/menu/SideMenu';
import { NotFound } from './NotFound';

export const AppRoute: any = (props: {startingRoute: string}) => {
  const [, updateState] = React.useState<any>();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  let navigate = useNavigate();

  // After npm start set the default route to /login
  React.useEffect(()=> {
    if (props.startingRoute && props.startingRoute === '/login') {
      navigate('/login');
    }
  }, []);

  // Region Start #Inıt Firebase app
  const firebaseConfig = {
    apiKey: "AIzaSyC2xl3mNGQbQ7jh8An2q-3hrlIX65FXc_s",
    authDomain: "playtomic-auth-77056.firebaseapp.com",
    projectId: "playtomic-auth-77056",
    storageBucket: "playtomic-auth-77056.appspot.com",
    messagingSenderId: "1007166344297",
    appId: "1:1007166344297:web:30656113fae9349d9b66f8",
    measurementId: "G-YR1L6MQ01L"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  // Region End #Inıt Firebase app

  const spinning = useSelector((state: RootState) => state.menu.loading);
  let currentPath = window.location.pathname;

  return (
    <Spin spinning={spinning}>
    {currentPath === '/Dashboard' || currentPath === '/Settings' ? <SideMenu /> : null}
    <Routes>
        <Route path="/Login" element={<Login reRender={() => {forceUpdate();}} />} />
        <Route path="/Dashboard" element={<Dashboard db={db} />} />
        <Route path="/Settings" element={<Settings db={db} />} />
        <Route path="*" element={<NotFound />}/>
    </Routes>
    </Spin>
  );
}
