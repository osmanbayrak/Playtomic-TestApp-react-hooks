import React from 'react';
import './Dashboard.css';
import "antd/dist/antd.css";
import { SideMenu } from '../menu/SideMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Card, notification } from 'antd';
import { Bar, Liquid } from '@ant-design/charts';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { dashboardDataDto } from '../../Models/DataModels/DashboardDataDto';
import { useAppDispatch } from '../../app/hooks';
import { toggleLoading } from '../menu/MenuSlice';
import Icon, { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

export const Dashboard: any = (props: {db: any}) => {
  const dispatch = useAppDispatch();
  const collapsed = useSelector((state: RootState) => state.menu.collapsed)
  const [data, setData] = React.useState<dashboardDataDto>({chartData: [], liquid: 0, doctors: 0, patients: 0, nurses: 0, pharmacusts: 0});
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
    height: 250
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
    height: 250
  };
  let db = props.db;
  const getData = (db: any) => {
    dispatch(toggleLoading(true));
    const dashboardCol = collection(db, 'dashboard');
    getDocs(dashboardCol).then((dashboardSnapshot) => {
      const dashboardUnmappedData: dashboardDataDto[] = dashboardSnapshot.docs.map(doc => doc.data()) as dashboardDataDto[];
      let chartData, liquid, doctors, nurses, patients, pharmacusts;

      if (dashboardUnmappedData && dashboardUnmappedData[0]) {
        let dashboardData: dashboardDataDto = dashboardUnmappedData[0];
        chartData = dashboardData.chartData;
        liquid = dashboardData.liquid;
        doctors = dashboardData.doctors;
        nurses = dashboardData.nurses;
        patients = dashboardData.patients;
        pharmacusts = dashboardData.pharmacusts;

        setData({chartData, liquid, doctors, nurses, patients, pharmacusts});
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
      console.log(error)
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
  }
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : undefined;
  const userName = user ? user.displayName : '';

  return (
    <div className="Dashboard">
      <SideMenu />
      <div id="header" style={{background: '#001529', marginLeft: collapsed ? 80 : 200, display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <h2 className='headerTitle'>Dashboard</h2>
        </div>
        <div className='userName'>
          <span><UserOutlined /> {userName} </span>
        </div>
      </div>
      <div className="content" style={{margin: `20px 20px 20px ${collapsed ? '20px' : '220px'}`}} id="content">
        <Card className='dashboardCards'>
          <p>Doctors</p>
          <p>{data.doctors}</p>
        </Card>
        <Card className='dashboardCards'>
          <p>Nurses</p>
          <p>{data.nurses}</p>
        </Card>
        <Card className='dashboardCards'>
          <p>Patients</p>
          <p>{data.patients}</p>
        </Card>
        <Card className='dashboardCards'>
          <p>Pharmacusts</p>
          <p>{data.pharmacusts}</p>
        </Card>
        <div className='flexBreak'></div>
        <Card className='chartCard'>
          <Bar {...chartConfig as any} />
        </Card>
        <Card className='chartCard'>
          <Liquid {...liquidConfig as any} />
        </Card>
      </div>
    </div>
  );
}
