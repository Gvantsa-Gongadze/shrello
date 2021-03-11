import { Form, Input, Checkbox, Card, Space } from 'antd'
import SubmitButton from './style/Buttons'
import axios from 'axios';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const Registration = () => {
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        axios.post("http://localhost:3000/users", values)
        .then(res => {
            console.log(res.config.data);
        }).catch(e => {
            console.log(e)
        })
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
                    <a href="/login">Already have an account? Log In</a>
                </Form>
            </Card>
        </Space>
    )
}

export default Registration