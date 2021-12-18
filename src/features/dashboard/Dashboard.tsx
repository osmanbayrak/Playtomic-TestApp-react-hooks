import React from 'react';
import './Dashboard.css';
import '../../index.css';
import "antd/dist/antd.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Card } from 'antd';
// import { Bar, Liquid } from '@ant-design/charts';
import { useAppDispatch } from '../../app/hooks';
import { toggleLoading } from '../menu/MenuSlice';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { getDashboardData } from './dashboardSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Get the data from redux store
  const collapsed = useSelector((state: RootState) => state.menu.collapsed);
  const data = useSelector((state: RootState) => state.dashboard.dashboardData);

  // Fetch page data when the component mounted
  React.useEffect(() => {
    // Fetch page data
    const getData = () => {
      dispatch(toggleLoading(true));
      dispatch(getDashboardData(navigate));
    };
    getData();
  }, []);

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
        <div className='contentTitle'>Hospital Staff</div>
        <div className='flexBreak'></div>
        <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
          <p>{data.doctors}</p>
          <p>Doctors</p>
        </Card>
        <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
          <p>{data.nurses}</p>
          <p>Nurses</p>
        </Card>
        <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
          <p>{data.patients}</p>
          <p>Patients</p>
        </Card>
        <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
          <p>{data.pharmacusts}</p>
          <p>Pharmacusts</p>
        </Card>
        <div className='flexBreak'></div>
        <Card className='chartCard'>
          Patients Discharged in Years
          <BarChart
            width={380}
            height={200}
            data={data.chartData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Discharged" fill="#82ca9d" />
            <Bar dataKey="Patients" fill="#6e0000" />
          </BarChart>
        </Card>
        <Card className='chartCard'>
          Profit Per Month
          <PieChart margin={{top: 65}} width={380} height={250}>
            <Pie
              isAnimationActive={false}
              dataKey="Profit"
              startAngle={180}
              endAngle={0}
              data={data.pieData}
              cx="50%"
              cy="50%"
              outerRadius={110}
              fill="#8884d8"
              label
            />
          </PieChart>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
