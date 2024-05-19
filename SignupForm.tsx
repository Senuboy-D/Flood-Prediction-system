import { Form, Input, Button, Alert } from "antd";
import { FC, useEffect, useState } from "react";

interface LoginFormProps {
  onFinish: (values: any) => void;
}

const SignupForm: FC<any> = () => {

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const onFinish = (values: any) => {
        console.log("Success:", values);

        /* make api call for  http://localhost:3001/signup  and json body is {
      "firstName": "Test",
      "lastName": "User",
      "password": "password",
      "email": "johndoe1@gmail.com"*/
        fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            setIsSuccess(true);
            setIsError(false);
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
 <>

{
        isSuccess &&  <Alert message="Successfully Registered" type="success" showIcon />
      }

{
        isError &&  <Alert message="Error in Registration" type="error" showIcon />
      }
    <Form name="login" onFinish={onFinish}>
      <Form.Item
        name="firstName"
        label="Fisrt Name"
        rules={[{ required: true, message: "Please enter your firstName" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please enter your lastName" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
      
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
 </>
  );
};

export default SignupForm;
