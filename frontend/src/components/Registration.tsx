import React from 'react';
import { Form, Input, Card, Space, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
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
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Space>
            <Card 
                title='Sign up for your account' 
                headStyle={{ backgroundColor: '#edc7b7', padding: '5px', borderTopLeftRadius: '15px', borderTopRightRadius: '15px', fontSize: '23px', marginBottom: '15px' }}
                style={{ width: 500, borderRadius: '15px' }}
            >
                <Form
                    {...layout}
                    name='basic'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label='Your name'
                        name='firstName'
                        >
                        <Input type='text' placeholder='Enter name' />
                    </Form.Item>
                    <Form.Item
                        label='Your last name'
                        name='lastName'
                        >
                        <Input type='text' placeholder='Enter last name' />
                    </Form.Item>
                    <Form.Item
                        label='Your Email'
                        name='email'
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input type='email' placeholder='Enter email' />
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password minLength={6} placeholder='Enter password' />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <SubmitButton name={'Sign up'}/>
                    </Form.Item>
                    <Link to='/login'>
                        Already have an account? Log In
                    </Link>
                </Form>
            </Card>
        </Space>
    )
}

export default Registration