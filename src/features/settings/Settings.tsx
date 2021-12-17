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
          <li><span style={{fontWeight: 'bolder'}}>Hospital Name:</span> {data.hospitalName}</li>
          <li><span style={{fontWeight: 'bolder'}}>Since:</span> {data.buildDate}</li>
          <li><span style={{fontWeight: 'bolder'}}>Location:</span> {data.location}</li>
          <li><span style={{fontWeight: 'bolder'}}>Status:</span> {data.isAvailable}</li>
          <li><span style={{fontWeight: 'bolder'}}>Working Hours:</span> {data.workingHours}</li>
          <li><span style={{fontWeight: 'bolder'}}>Contact Info:</span> {data.contactInfo}</li>
        </ul>
      </div>
    </div>
  );
}
