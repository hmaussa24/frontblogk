import 'antd/dist/antd.css';
import { Form, Input, Select, Button, Layout } from 'antd';
const { TextArea } = Input;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const validateMessages = {
    required: '${label} es obligatorio!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} debe ser un numero!',
    }
};
const { Content } = Layout;
export const Comentar = (props) => {
    return (
        <Form className='form-producto' {...layout} name="nest-messages" onFinish={props.onComentar} validateMessages={validateMessages}>
            <h3>Dejanos tu comentario</h3>
            <Form.Item
                name='comentario'
                label="Comenta"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Comentar
                </Button>
            </Form.Item>
        </Form>
    )
}