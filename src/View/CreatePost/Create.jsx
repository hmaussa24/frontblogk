import React from 'react';
import Head from '../../Component/Header'
import Titulo from '../../Component/Titulo'
import Spin from '../../Component/Spin'
import 'antd/dist/antd.css';
import '../../resources/Productos.css'
import PicturesWall from '../../Component/UploadFoto'
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
function RegistrarCliente(props) {

    return (
        <Layout className="layout">
            <Head logo='logo' menu={true} key='2' />

            <Content className='container'>
                <Titulo class='site-page-header' titulo='Publicar Post' subtitulo='En este modulo podras crear tus post y subir una imagen.'></Titulo>
                <Form className='form-producto' {...layout} name="nest-messages" onFinish={props.onFinish} validateMessages={validateMessages}>

                    <Form.Item
                        name='titulo'
                        label="Titulo"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='texto_corto'
                        label="Texto"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <TextArea rows={5} />
                    </Form.Item>
                    <Form.Item
                        name='texto_largo'
                        label="Texto"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <TextArea rows={10} />
                    </Form.Item>
                    <Form.Item label="Categorias" name='categoria' >
                        <Select>
                            {props.categorias ?

                                props.categorias.map((categoria) => (
                                    <Select.Option value={categoria.id} key={categoria.id}>{categoria.name}</Select.Option>
                                ))

                                : null}
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Registar
                            {props.isSend && <Spin clase="example" />}
                        </Button>
                    </Form.Item>
                </Form>
                {props.isSave  ? <div className='foto'><PicturesWall tipo_user={props.tipo_user}/></div> : null}
            </Content>
        </Layout>


    )
}

export default RegistrarCliente


