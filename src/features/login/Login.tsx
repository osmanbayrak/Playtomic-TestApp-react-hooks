import React from 'react';
import './Login.css';
import { Input, Form, Checkbox, Button, Col } from 'antd';
import "antd/dist/antd.css";
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import { toggleLoading } from '../menu/MenuSlice';
import { login } from './loginSlice';
import { loginInputDataDto } from '../../Models/DataModels/LoginDataDto';

const Login = (props: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState<loginInputDataDto>({email: '', password: ''});

  React.useEffect(() => {
    props.checkSideBar();
  },[]);

  const onSubmit = () => {
      dispatch(toggleLoading(true));
      dispatch(login(userData, navigate));
  };

  return (
    <div className="Login">
      <Col className='loginBox' xs={{span: 24}} md={{span: 8, offset: 8}}>
        <h1>Login</h1>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your e-mail!' }]}
          >
            <Input value={userData.email} onChange={(e) => {setUserData({...userData, email: e.target.value})}} placeholder='E-mail' />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password value={userData.password} onChange={(e) => {setUserData({...userData, password: e.target.value})}} placeholder='Password' />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className='rememberMe'>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button className='submitButton' type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default Login;
