import React from 'react';
import './Dashboard.css';
import { Col } from 'antd';
import "antd/dist/antd.css";
import { SideMenu } from '../menu/SideMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const Dashboard: any = (props: any) => {
  const collapsed = useSelector((state: RootState) => state.state.status)
  const [dynamicMargin, setDynamicMargin] = React.useState(200);

  return (
    <div className="Dashboard">
      <SideMenu />
      <Col style={{background: 'wheat', marginLeft: collapsed ? 80 : 200}}>
        <h1 style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bolder', color: 'white'}}>Dashboard</h1>
      </Col>
    </div>
  );
}
