import { Form, Input, Card, Space, message } from 'antd';
import axios from 'axios';
import { useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import SubmitButton from '../styles/Buttons';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const ResetPassword = () => {
    const location = useLocation();
    const history = useHistory();
    const userId = location.pathname.replace('/reset-password/', '')

    useEffect(() => {
        const fetchData = async () => {
            if(!userId) {
                message.error('No user found!')
                return
            }

            try {
                const user = await axios.get(`http://localhost:3000/users/${userId}`)
                localStorage.setItem('token', user.data.token);
                history.push(`/reset-password/${userId}`);
            } catch(error) {
                message.error(error.response.data.message)
            }
        }
        fetchData()
      }, [history, userId]);
    const onFinish = async (value: {password: string}) => {
        try {
            await axios.put(`http://localhost:3000/users/reset-password`, {
                id: userId,
                password: value.password
            })
            localStorage.removeItem('token');
            history.replace('/login');
        } catch(error) {
            message.error(error.response.data.message)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Space>
            <Card 
                title="Reset Password" 
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
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <SubmitButton name={'Update password'}/>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    )
}
export default ResetPassword
