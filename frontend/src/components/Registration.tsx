import React from 'react';
import { Form, Input, Checkbox, Card, Space, message } from 'antd';
import { Link, useHistory } from "react-router-dom";
import SubmitButton from '../styles/Buttons';
import { useApi, RegisterValues } from '../hooks/api.hook';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};
const Registration = () => {
    const history = useHistory();

    const { register } = useApi()
    
    const onFinish = async (values: RegisterValues) => {
        const isSuccess = await register(values)

        if (isSuccess) {
            history.push('/home');
            message.success('Registration successful!')
        } else {
            message.error('Error signing up the user')
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Space>
            <Card 
                title="Sign up for your account" 
                style={{ width: 500 }}
            >
                <Form
                    {...layout}
                    name='basic'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Your name"
                        name="firstName"
                        >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Your last name"
                        name="lastName"
                        >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Your Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input type="text" minLength={6} />
                    </Form.Item>
                    <Form.Item 
                        {...tailLayout}
                        name="remember" 
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <SubmitButton name={'Sign up'}/>
                    </Form.Item>
                    <Link to="/login">
                    Already have an account? Log In
                    </Link>
                </Form>
            </Card>
        </Space>
    )
}

export default Registration