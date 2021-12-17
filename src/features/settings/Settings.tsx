import React from 'react';
import './Settings.css';
import '../../index.css';
import "antd/dist/antd.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks';
import { toggleLoading } from '../menu/MenuSlice';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { getSettingsData } from './settingsSlice';

export const Settings: any = (props: {db: any}) => {
  const dispatch = useAppDispatch();
  const collapsed = useSelector((state: RootState) => state.menu.collapsed);
  const data = useSelector((state: RootState) => state.settings.settingsData)
  React.useEffect(() => {
    getData(db)
  }, []);

  let navigate = useNavigate();
  let db = props.db;
  const getData = (db: any) => {
    dispatch(toggleLoading(true));
    dispatch(getSettingsData(db, navigate))
  }
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : undefined;
  const userName = user ? user.displayName : '';

  return (
    <div className="Settings">
      <div id="header" className='contentHeader' style={{marginLeft: collapsed ? 80 : 200}}>
        <div>
          <h2 className='headerTitle'>Settings</h2>
        </div>
        <div className='userName'>
          <span><UserOutlined /> {userName} </span>
        </div>
      </div>
      <div className="content" style={{margin: `20px 20px 20px ${collapsed ? '20px' : '220px'}`}} id="content">
        <ul>
          <li>Hospital Name: {data.hospitalName}</li>
          <li>Since: {data.buildDate}</li>
          <li>Location: {data.location}</li>
          <li>Status: {data.isAvailable}</li>
          <li>Working Hours: {data.workingHours}</li>
          <li>Contact Info: {data.contactInfo}</li>
        </ul>
      </div>
    </div>
  );
}
