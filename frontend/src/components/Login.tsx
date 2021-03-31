import { Form, Input, Checkbox, Card, Space } from 'antd'
import SubmitButton from './style/Buttons'
import { useHistory } from "react-router-dom";
import { message } from 'antd';
import axios from 'axios';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};
interface loginValue {
    password: String;
    remember: Boolean;
    username: String;
}

const Login = () => {
    const history = useHistory();
    const onFinish = async (values: loginValue) => {
        try {
            const user = await axios.post(`http://localhost:3000/users`, {
                login: {
                    password: values.password,
                    email: values.username
                }
            })
            if(user.data) {
                history.push('/home');
            } else {
                message.info('username / password is incorrect!');
            }
        } catch (error) {
            console.log(error)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Space>
            <Card 
                title="Log in to Shrello" 
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
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item 
                        {...tailLayout}
                        name="remember" 
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <SubmitButton name={'Log in'}/>
                    </Form.Item>
                    <a href="/registration">Sign up for an account</a>
                </Form>
            </Card>
        </Space>
    )
}

export default Login