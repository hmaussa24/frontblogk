import React, { useState } from 'react'
import Pie from '../../Component/Footer'
import Head from '../../Component/Header'
import Titulo from '../../Component/Titulo'
import Card from '../../Component/Card'
import 'antd/dist/antd.css';
import '../../resources/Home.css'
import { Layout, List, Avatar, Button } from 'antd';
import InputBuscar from '../../Component/InputBuscar'
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

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const { Content } = Layout;
function Home(props) {

    const random = () => {
        let number = Math.floor(Math.random() * ColorList.length);
        return number
    }
    return (
        <div>
            <Layout className="layout">
                <Head logo='logo' menu={true} />

                <Content className='container'>
                    <Titulo class='site-page-header' titulo='Bienvenid@' subtitulo='Todos los usuarios.'></Titulo>
                    <div className='inputbuscar'> <InputBuscar buscar={props.handledBuscar} /> </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={props?.users}
                        renderItem={item => (
                            <div className="listausers">
                                <List.Item
                                    actions={[<Button type="dashed" primary >Editar</Button>, <Button type="dashed" danger onClick={() => {props.eliminar(item.id)}} >Eliminar</Button>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: ColorList[random()] }} size='large' >{item.name}</Avatar>}
                                        title={<a href="#">{item.name}</a>}
                                        description={item.tipo_user}
                                    />
                                </List.Item>
                            </div>
                        )}
                    />
                </Content>
            </Layout>


        </div>
    );
}

export default Home