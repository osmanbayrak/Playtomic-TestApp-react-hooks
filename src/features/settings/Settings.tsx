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

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const collapsed = useSelector((state: RootState) => state.menu.collapsed);
  const data = useSelector((state: RootState) => state.settings.settingsData);

  React.useEffect(() => {
    const getData = () => {
      dispatch(toggleLoading(true));
      dispatch(getSettingsData(navigate))
    };
    getData();
  }, []);
  
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
          <li><span className='settingLabel'>Hospital Name:</span> {data.hospitalName}</li>
          <li><span className='settingLabel'>Since:</span> {data.buildDate}</li>
          <li><span className='settingLabel'>Location:</span> {data.location}</li>
          <li><span className='settingLabel'>Status:</span> {data.isAvailable}</li>
          <li><span className='settingLabel'>Working Hours:</span> {data.workingHours}</li>
          <li><span className='settingLabel'>Contact Info:</span> {data.contactInfo}</li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
