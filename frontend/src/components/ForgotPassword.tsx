import { Form, Input, Card, Space, message } from 'antd';
import axios from 'axios';
import SubmitButton from '../styles/Buttons';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};
const ForgotPassword = () => {
    const onFinish = async (value: {email: string}) => {
        try {
            if(!value.email) {
                message.error('Please, enter email!')
            }
            await axios.put(`http://localhost:3000/users/email-confirmation`, {
                email: value?.email
            })
            message.success('Please, check your email.')

        } catch (error) {
            message.error(error.response.data.message)
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo?.errorFields[0]?.errors)
        return
    };
    return (
        <Space>
        <Card 
            title="Enter Email To Reset Password" 
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
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <SubmitButton name={'Reset my password'}/>
                </Form.Item>
            </Form>
        </Card>
    </Space>
    )
}
export default ForgotPassword
