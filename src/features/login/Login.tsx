import React from 'react';
import './Login.css';
import { Input, Form, Checkbox, Button, Col } from 'antd';
import "antd/dist/antd.css";
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import { toggleLoading } from '../menu/MenuSlice';
import { login } from './loginSlice';

export const Login: any = (props: any) => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const onFinish = (values: {email: string, password: string}) => {
      dispatch(toggleLoading(true));
      dispatch(login({email: values.email, password: values.password}, navigate));
  };

  return (
    <div className="Login">
      <Col className='loginBox' xs={{span: 24}} md={{span: 8, offset: 8}}>
        <h1>Login</h1>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your e-mail!' }]}
          >
            <Input placeholder='E-mail' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className='rememberMe'>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button className='submitButton' type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
}
