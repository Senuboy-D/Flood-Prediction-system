import { Card, Col, Row } from "antd";
import { FC } from "react";
import Title from "antd/es/typography/Title";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const SignUp: FC = () => {
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
    // Perform login logic here
  };

  return (
    <div>
      <Title>Sign up</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Signup Form" bordered={false}>
                <SignupForm/>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
