import React, { useState } from 'react'
import Pie from '../../Component/Footer'
import Head from '../../Component/Header'
import Titulo from '../../Component/Titulo'
import Card from '../../Component/Card'
import 'antd/dist/antd.css';
import '../../resources/Home.css'
import { Layout } from 'antd';
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
function Home(props) {
    
   

    return (
        <div>
            <Layout className="layout">
                <Head logo='logo' login={true} />
                
                <Content className='container'>
                    <Titulo class='site-page-header' titulo='Bienvenid@' subtitulo='Este es el inicio de Beauty MakeUP, aqui encontraras todos los productos registrados.'></Titulo>
                   <div className='inputbuscar'> <InputBuscar buscar={props.handledBuscar}/> </div>
                    {props.productos.map((producto) => (
                        <div className='producto' key={producto.id}><Card titulo={producto.name} img={producto.imagen} descripcion={producto.descripcion} producto={producto}/></div>
                    ))}
                </Content>
            </Layout>

            
        </div>
    );
}

export default Home