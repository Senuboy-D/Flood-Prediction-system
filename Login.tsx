import { Alert, Card, Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import LoginForm from "../components/LoginForm";

const Login: FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);


    // make api call for  http://localhost:3001/login  and json body is {
   // email: "t@gmail.com",
    // password: "password"

    // Perform login logic here

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
  })
      .then(response => response.json())
      .then(data => {
      console.log('Success:', data);
      localStorage.setItem('token', data.token);
      setIsSuccess(true);
      setIsError(false);

      window.location.href = '/';
        
      })
      .catch((error) => {
      console.error('Error:', error);
      setIsError(true);
      setIsSuccess(false);
      });
  };


  useEffect(() =>{
    setTimeout(() => {
      setIsSuccess(false);
    }
    , 3000);
  })

  return (
    <div>
      {
        isSuccess &&  <Alert message="Successfully Logged" type="success" showIcon />
      }
        
        {
          isError &&  <Alert message="Error in Login" type="error" showIcon />
        }
      <Title>Login</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Login Form" bordered={false}>
                <LoginForm onFinish={onFinish} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
