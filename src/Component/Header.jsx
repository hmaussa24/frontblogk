import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogOut } from '../store/actions/';
const { Header } = Layout;
function Head(props) {


    const handleSalir = () => {
        console.log('Salir')
        props.authLogOut(localStorage.getItem('jwt_token'));
        window.location = '/'
    }

    if (props.login === true) {
        return (
            <Header>
                <img src='logo.png' className={props.logo} />
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1"><Link to='/' />Inicio</Menu.Item>
                    <Menu.Item key="3"><Link to='/registrar-cliente' />Registar Cliente</Menu.Item>
                    <Menu.Item key="4" onClick={handleSalir}>Salir</Menu.Item>
                </Menu>
            </Header>
        )
    } else {
        return (
            <Header>
                <div className={props.logo} />
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1"><Link to='/' />Inicio</Menu.Item>
                    <Menu.Item key="3"><Link to='/registrar-cliente' />Registar Cliente</Menu.Item>
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
