import React, { useState, useEffect } from 'react'
import Head from './Header'
import Titulo from './Titulo'
import 'antd/dist/antd.css';
import '../resources/Home.css'
import { Layout, Input, Tag } from 'antd';
import { messageLoadin, messageOk } from "./Messages";
import Axios from "axios";
import { authLogin, profile } from '../store/actions/'
import { connect } from 'react-redux'
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
const { Search } = Input;
const { Content } = Layout;
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
function Home(props) {
    const [categorias, setCategorias] = useState([])
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        if (Object.entries(props.login).length === 0) {
            props.history.push('/')
        } else {
            const categoias = async () => {
                messageLoadin()
                Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`
                await Axios.get('http://127.0.0.1:8000/api/auth/categorias')
                    .then(response => {
                        console.log(response.data)
                        setCategorias(response.data)
                        messageOk()
                    }, error => {
                        alert('No se encontraron categorias!')
                    })
            }
            categoias()
        }

    }, [])
    const addTag = async (e) => {
        //alert(e)
        messageLoadin()
        Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`
        await Axios.post('http://127.0.0.1:8000/api/auth/add-categorias', { name: e })
            .then(response => {
                console.log(response.data)
                setCategorias(response.data)
                messageOk()
            }, error => {
                alert('No se guardo!')
            })
    }

    const deleteTag = async (e) => {
        //alert(e)
        messageLoadin()
        Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`
        await Axios.post('http://127.0.0.1:8000/api/auth/delete-categorias', { id: e })
            .then(response => {
                console.log(response.data)
                setCategorias(response.data)
                messageOk()
            }, error => {
                alert('No se elimino!')
            })
    }

    const random = () => {
        let number = Math.floor(Math.random() * ColorList.length);
        return number
    }

    return (
        <div>
            <Layout className="layout">
                <Head logo='logo' menu={true} />

                <Content className='container'>
                    <Titulo class='site-page-header' titulo='Categorias@' subtitulo='Administra las categorias.'></Titulo>
                    <div className='addtag'>
                        <br></br>
                        <Search
                            placeholder="Agrega categorias..."
                            enterButton="Agregar"
                            size="large"
                            onSearch={value => addTag(value)}
                        />
                    </div>
                    <div className="listitem">
                        <h3>Categorias</h3>
                        {categorias.map((cat) => (
                            <Tag
                                className="tag"
                                color={ColorList[random()]}
                                closable
                                visible={visible}
                                onClose={() => deleteTag(cat.id)}
                            >
                                {cat.name}
                            </Tag>

                        ))}
                    </div>
                </Content>
            </Layout>


        </div>
    );
}


function mapDispatchToProps(dispatch) {
    return {
        authLogin: token => dispatch(authLogin(token)),
        profile: prof => dispatch(profile(prof)),
    };
}

function mapStateToProps(state) {
    return { login: state.Auth };
};

const inicio = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);


export default inicio