import React from 'react';
import { Menu, Button, notification } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined,
    BarChartOutlined,
    LogoutOutlined,
  } from '@ant-design/icons';
import "antd/dist/antd.css";
import { Link, useNavigate } from 'react-router-dom';
import { toggle } from './MenuSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getAuth } from 'firebase/auth';

const SideMenu = () => {
    const collapsed = useSelector((state: RootState) => state.menu.collapsed);
    const auth = getAuth();
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const onLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');
        }, (error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            notification['error']({
                message: errorCode,
                description:
                    errorMessage,
            });
        });
    };
    const currentPath = window.location.pathname;

    return (
        <div style={{ width: collapsed ? 80 : 200, float: 'left' }}>
            <Button type="primary" onClick={() => dispatch(toggle())} style={{ margin: '8px 16px 8px' }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
            <Menu
                defaultSelectedKeys={[currentPath]}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                style={{height: '100vh'}}
            >
                <Menu.Item key="/Dashboard" icon={<BarChartOutlined />}>
                    <Link to={'/Dashboard'}> Dashboard </Link>
                </Menu.Item>
                <Menu.Item key="/Settings" icon={<SettingOutlined />}>
                    <Link to={'/Settings'}> Settings </Link>
                </Menu.Item>
                <Menu.Item key="/Login" icon={<LogoutOutlined />} onClick={() => {onLogout();}}>
                    <span> Sign Out </span>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default SideMenu;