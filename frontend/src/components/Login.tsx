import { Form, Input, Card, Space } from 'antd';
import SubmitButton from '../styles/Buttons';
import { Link, useHistory } from 'react-router-dom';
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
                title='Log in to Shrello' 
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
                        label='Username'
                        name='username'
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item
                        style={{marginBottom: '7px' }}
                        label='Password'
                        name='password'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Link to='/forgot-password'>
                        Forgot password?
                    </Link>
                    <Form.Item style={{marginTop: '15px', marginBottom: '15px' }} {...tailLayout}>
                        <SubmitButton name={'Log in'}/>
                    </Form.Item>
                    <Link to='/registration'>
                        Sign up for an account
                    </Link>
                </Form>
            </Card>
        </Space>
    )
}

export default Login