import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogOut } from '../store/actions/';
import '../resources/Home.css'
const { Header } = Layout;
function Head(props) {


    const handleSalir = () => {
        console.log('Salir')
        props.authLogOut(localStorage.getItem('jwt_token'));
        window.location = '/'
    }

    if (props.menu === true) {
        return (
            <Header>
               <div className={props.logo} />
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1"><Link to='/' />Inicio</Menu.Item>
                    {props?.login?.user?.tipo_user === 'Administrador' ? <Menu.Item key="2"><Link to='/create-post' />Crear post</Menu.Item>: null}
                    {props?.login?.user?.tipo_user === 'Administrador' ? <Menu.Item key="5"><Link to='/users' />Usuarios</Menu.Item>: null}
                    {props?.login?.user?.tipo_user === 'Administrador' ? <Menu.Item key="5"><Link to='/categorias' />Categorias</Menu.Item>: null}
                    <Menu.Item key="4" onClick={handleSalir}>Salir</Menu.Item>
                    <Menu.Item className="name">Bienvenid@: {props?.login?.user?.name}</Menu.Item>
                </Menu>
                
            </Header>
        )
    } else {
        return (
            <Header>
                <div className={props.logo} />
                <Menu theme="dark" mode="horizontal">
                    {/* <Menu.Item key="1"><Link to='/' />Inicio</Menu.Item> */}
                    <Menu.Item key="1"><Link to='/' />Login</Menu.Item>
                    <Menu.Item key="3"><Link to='/registrar-cliente' />Registarme</Menu.Item>
                </Menu>
            </Header>
        )
    }

}


function mapDispatchToProps(dispatch) {
    return {
        authLogOut: token => dispatch(authLogOut(token))
    };
}

const mapStateToProps = state => {
    return { login: state.Auth };
};

const head = connect(
    mapStateToProps,
    mapDispatchToProps
)(Head);
export default head;
