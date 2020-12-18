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

        <div className="list-item">
            <h3>Quizas te interesen</h3>
            <List
                itemLayout="vertical"
                size="large"

                dataSource={props.posts}
                renderItem={item => (
                    <List.Item
                        key={item.titulo}
                        extra={
                            <img className="imglist"
                                width={100}
                                alt="logo"
                                src={item.imagen ? "http://localhost:8000/img/" + item.imagen : "https://www.dailydot.com/wp-content/uploads/e52/31/87610fa1a0ae891d.png"}
                            />
                        }
                    >
                        <List.Item.Meta
                            className="texolist"
                            title={<a href={'/post/' + item.slug}>{item.titulo}</a>}
                        />
                    </List.Item>
                )}
            />
        </div>

    );
}

export default Home