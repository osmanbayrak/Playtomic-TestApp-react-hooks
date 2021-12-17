import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';
import './index.css';

export const NotFound: any = (props: {db: any}) => {
    let navigate = useNavigate();
    return (
    <div id="content" className='notFound'>
        <h1>404 Page not found!</h1>
        <div><Button type='primary' onClick={()=> navigate('/Dashboard')}>Back to Home</Button></div>
    </div>
    );
}
