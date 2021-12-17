import React from 'react';
import './Dashboard.css';
import '../../index.css';
import "antd/dist/antd.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Card } from 'antd';
import { Bar, Liquid } from '@ant-design/charts';
import { useAppDispatch } from '../../app/hooks';
import { toggleLoading } from '../menu/MenuSlice';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { getDashboardData } from './dashboardSlice';

export const Dashboard: any = (props: {db: any}) => {
  const dispatch = useAppDispatch();
  const collapsed = useSelector((state: RootState) => state.menu.collapsed);
  const data = useSelector((state: RootState) => state.dashboard.dashboardData)
  React.useEffect(() => {
    getData(db)
  }, []);

  let navigate = useNavigate();

  const chartConfig = {
    data: data.chartData,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
    height: 180,
  };

  const liquidConfig = {
    percent: data.liquid,
    shape: 'rect',
    outline: {
      border: 2,
      distance: 4,
    },
    wave: {
      length: 128,
    },
    height: 180,
  };
  let db = props.db;
  const getData = (db: any) => {
    dispatch(toggleLoading(true));
    dispatch(getDashboardData(db, navigate))
  }
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : undefined;
  const userName = user ? user.displayName : '';

  return (
    <div className="Dashboard">
      <div id="header" className='contentHeader' style={{marginLeft: collapsed ? 80 : 200}}>
        <div>
          <h2 className='headerTitle'>Dashboard</h2>
        </div>
        <div className='userName'>
          <span><UserOutlined /> {userName} </span>
        </div>
      </div>
      <div className="content" style={{margin: `20px 20px 20px ${collapsed ? '20px' : '220px'}`}} id="content">
        <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
          <p>Doctors</p>
          <p>{data.doctors}</p>
        </Card>
        <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
          <p>Nurses</p>
          <p>{data.nurses}</p>
        </Card>
        <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
          <p>Patients</p>
          <p>{data.patients}</p>
        </Card>
        <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
          <p>Pharmacusts</p>
          <p>{data.pharmacusts}</p>
        </Card>
        <div className='flexBreak'></div>
        <Card className='chartCard'>
          Patients Discharged in Years
          <Bar {...chartConfig as any} />
        </Card>
        <Card className='chartCard'>
          Hospital Cccupancy
          <Liquid {...liquidConfig as any} />
        </Card>
      </div>
    </div>
  );
}
