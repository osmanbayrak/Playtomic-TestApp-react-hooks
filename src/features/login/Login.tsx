import React from 'react';
import logo from './logo.svg';
import './Login.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { Input, Form, Checkbox, Button, Col, Divider, notification } from 'antd';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import "antd/dist/antd.css";
import { useNavigate } from 'react-router';

export const Login: any = (props: any) => {
  let navigate = useNavigate();
  const firebaseConfig = {
    apiKey: "AIzaSyC2xl3mNGQbQ7jh8An2q-3hrlIX65FXc_s",
    authDomain: "playtomic-auth-77056.firebaseapp.com",
    projectId: "playtomic-auth-77056",
    storageBucket: "playtomic-auth-77056.appspot.com",
    messagingSenderId: "1007166344297",
    appId: "1:1007166344297:web:30656113fae9349d9b66f8",
    measurementId: "G-YR1L6MQ01L"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();
  const onClickSign = (email: string, password: string) => {
      (signInWithEmailAndPassword(auth, email, password) as any)
      .then((userCredential: any) => {
        // Signed in 
        console.log(props)
        const user = userCredential.user;
        navigate('/Dashboard');
        // ...
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        notification['error']({
          message: errorCode,
          description:
            errorMessage,
        });
      });
  }

  const onFinish = (values: {username: string, password: string}) => {
    console.log(values);
    onClickSign(values.username, values.password)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="Login">
      <Col className='loginBox' xs={{span: 24}} md={{span: 8, offset: 8}}>
        <h1 style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bolder', color: 'white'}}>Login</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your e-mail!' }]}
          >
            <Input type={'email'} placeholder='E-mail' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox style={{color: 'white'}}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button style={{width: '100%'}} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
}
