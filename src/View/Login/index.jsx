import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Login from './Login'
import { connect } from 'react-redux'
import { authLogin, profile } from '../../store/actions/'
function Index(props) {
    const [login, setLogin] = useState(false)
    const [isSend, setSend] = useState(false)

    useEffect(() => {
        if (Object.entries(props.login).length ) {
            setLogin(props.login.sesion.login)
        }

    }, [])

    const onFinish = async (values) => {
        console.log('Success:', values);
        setSend(true)
        await Axios.post('http://127.0.0.1:8000/api/auth/login', values)
            .then(response => {
                localStorage.setItem('jwt_token', response.data.access_token)
                props.authLogin(response.data.access_token);
                setLogin(true)
            }, error => {
                setSend(false)
                alert('Usuario o Contraseña incorrectos')
            })
    }

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
    if (login) {
        return (
            <div>
                {props.history.push('/home')}
            </div>
        )

    } else {
        return (
            <Login onFinish={onFinish} onFinishFailed={onFinishFailed} isSend={isSend}></Login>
        )
    }

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

const IniciarSesion = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);


export default IniciarSesion