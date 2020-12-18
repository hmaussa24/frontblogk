import React, { useState } from 'react'
import Pie from '../../Component/Footer'
import Head from '../../Component/Header'
import Titulo from '../../Component/Titulo'
import 'antd/dist/antd.css';
import '../../resources/Home.css'
import { Layout } from 'antd';
import {  Space, Image } from 'antd';
import HomeList from '../PostList'
import { Comentar } from "../../Component/Comentar";
import ComentList from "../../Component/ComentList";
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
                    <Titulo class='site-page-header' titulo={props.posts[0]?.titulo} subtitulo={props.posts[0]?.texto_corto}></Titulo>
                    <div className="post">

                        <Image className='imagen'
                            width={500}
                            src={props.posts[0]?.imagen ? "http://localhost:8000/img/" + props.posts[0]?.imagen : "https://www.dailydot.com/wp-content/uploads/e52/31/87610fa1a0ae891d.png"}
                        />
                        <p className='texto'>
                            {props.posts[0]?.texto_largo}
                        </p>
                    </div>
                    <div className='postlist'>
                        <HomeList></HomeList>
                    </div>
                </Content>
                <Comentar onComentar={props.onComentar} />
                <ComentList comentarios={props.comentarios}></ComentList>
            </Layout>


        </div>
    );
}

export default Home