import React from 'react'
import Pie from '../../Component/Footer'
import Head from '../../Component/Header'
import Spin from '../../Component/Spin'
import 'antd/dist/antd.css';
import '../../resources/Login.css'
import { Form, Input, Button, Checkbox, Layout,} from 'antd';
import { useState } from 'react';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const { Content} = Layout;
function Login(props) {
    return (
        <Layout className="layout">
            <Head logo='logo' menu={false}/>

            <Content className='container'>
                <div className="site-layout-content">
                    <h2 className="titulo" >Iniciar sesión</h2>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={props.onFinish}
                        onFinishFailed={props.onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Porfavor ingrese su E-mail!',
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

                        <Form.Item {...tailLayout} name="remember_me" valuePropName="checked">
                            <Checkbox>Recordarme</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Iniciar Sesion
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </Content>
            <Pie class='footer' style={{ textAlign: 'center' }} />
        </Layout>
    );
}

export default Login