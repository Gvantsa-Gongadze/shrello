import { Form, Input, Checkbox, Card, Space } from 'antd';
import SubmitButton from '../styles/Buttons';
import { Link, useHistory } from "react-router-dom";
import { useApi, LoginValues } from '../hooks/api.hook';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const Login = () => {
    const history = useHistory();
    const { login } = useApi();

    const onFinish = async (values: LoginValues) => {
        const isSuccess = await login(values);
        if(isSuccess) {
            history.push('/home');
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
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Link to="/forgot-password">
                        Forgot password?
                    </Link>
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
                    <Link to="/registration">
                        Sign up for an account
                    </Link>
                </Form>
            </Card>
        </Space>
    )
}

export default Login