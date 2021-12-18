import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "antd/dist/antd.css";
import Login from './features/login/Login';
import Dashboard from './features/dashboard/Dashboard';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import Settings from './features/settings/Settings';
import SideMenu from './features/menu/SideMenu';
import { NotFound } from './NotFound';

export const AppRoute: any = () => {
  const [, updateState] = React.useState<any>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const spinning = useSelector((state: RootState) => state.menu.loading);
  let currentPath = window.location.pathname;
  let showSideMenu = currentPath === '/Dashboard' || currentPath === '/Settings' ? true : false;

  return (
    <Spin spinning={spinning}>
    {showSideMenu ? <SideMenu /> : null}
    <Routes>
        <Route path="/" element={<Login checkSideBar={() => {forceUpdate();}} />}/>
        <Route path="/Login" element={<Login checkSideBar={() => {forceUpdate();}} />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="*" element={<NotFound />}/>
    </Routes>
    </Spin>
  );
}
