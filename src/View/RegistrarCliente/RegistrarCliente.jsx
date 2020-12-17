import React from 'react';
import Head from '../../Component/Header'
import Titulo from '../../Component/Titulo'
import Spin from '../../Component/Spin'
import 'antd/dist/antd.css';
import '../../resources/Productos.css'
import { Form, Input, InputNumber, Button, Layout } from 'antd';
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
function RegistrarCliente(props) {
    return (
        <Layout className="layout">
            <Head logo='logo' login={false} key='2' />

            <Content className='container'>
                <Titulo class='site-page-header' titulo='Registra tus clientes' subtitulo='En este modulo podras registrar los clientes.'></Titulo>
                <Form className='form-producto' {...layout} name="nest-messages" onFinish={props.onFinish} validateMessages={validateMessages}>

                    <Form.Item
                        name='name'
                        label="Nombre del Cliente"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='telefono'
                        label="telefono"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Porfavor ingrese su contraseña!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Registar
                            {props.isSend && <Spin clase="example" />}
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>


    )
}

export default RegistrarCliente


