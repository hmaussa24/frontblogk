import React, { useState } from 'react'
import Pie from '../../Component/Footer'
import Head from '../../Component/Header'
import Titulo from '../../Component/Titulo'
import Card from '../../Component/Card'
import 'antd/dist/antd.css';
import '../../resources/Home.css'
import { Layout } from 'antd';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
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

const { Content } = Layout;
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
function Home(props) {



    return (
        <div>
            <Layout className="layout">
                <Head logo='logo' menu={true} />

                <Content className='container'>
                    <Titulo class='site-page-header' titulo='Bienvenid@' subtitulo='Encuentra un listado de post del blog.'></Titulo>
                    <div className='inputbuscar'> <InputBuscar buscar={props.handledBuscar} /> </div>
                    <div className="listitem">
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 3,
                            }}
                            dataSource={props.posts}
                            renderItem={item => (
                                <List.Item
                                    key={item.titulo}
                                    actions={[
                                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                    ]}
                                    extra={
                                        <img
                                            width={272}
                                            alt="logo"
                                            src={item.imagen ? "http://localhost:8000/img/" + item.imagen : "https://www.dailydot.com/wp-content/uploads/e52/31/87610fa1a0ae891d.png"}
                                        />
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={<a href={'/post/'+item.slug}>{item.titulo}</a>}
                                        description={item.texto_corto+'....'}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Content>
            </Layout>


        </div>
    );
}

export default Home