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

export const SideMenu: any = (props: any) => {
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

    return (
        <div style={{ width: collapsed ? 80 : 200, float: 'left' }}>
            <Button type="primary" onClick={() => dispatch(toggle())} style={{ margin: '8px 16px 8px' }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                style={{height: '100vh'}}
            >
                <Menu.Item key="dashboard" icon={<BarChartOutlined />}>
                    <Link to={'/Dashboard'}> Dashboard </Link>
                </Menu.Item>
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                    <Link to={'/Settings'}> Settings </Link>
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => {onLogout();}}>
                    <span> Sign Out </span>
                </Menu.Item>
            </Menu>
        </div>
    )
}