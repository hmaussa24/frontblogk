import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Login from './Login'
import { connect } from 'react-redux'
import { authLogin, profile } from '../../store/actions/'
import {messageLoadin, messageOk} from '../../Component/Messages'
function Index(props) {
    const [login, setLogin] = useState(false)
    const [isSend, setSend] = useState(false)
    const [tipo_user, setTipoUser] = useState(null)

    useEffect(() => {
        if (Object.entries(props.login).length) {
            setLogin(props.login.sesion.login)
        }

    }, [])

    const onFinish = async (values) => {
        console.log('Success:', values);
        setSend(true)
        messageLoadin()
        await Axios.post('http://127.0.0.1:8000/api/auth/login', values)
            .then(response => {
                localStorage.setItem('jwt_token', response.data.access_token)
                props.authLogin(response.data.access_token);
                props.profile(response.data.user)
                messageOk()
                if (response.data.user.tipo_user === 'Usuario') {
                    setTipoUser('/home')
                } else {
                    setTipoUser('/admin')
                }
                setLogin(true)
            }, error => {
                setSend(false)
                alert('Usuario o Contraseña incorrectos')
                messageOk()
            })
    }

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };
    if (login) {
        if (props.login.user.tipo_user === "Administrador") {
            return (
                <div>
                    {props.history.push('admin')}
                </div>
            )
        }else{
            return (
                <div>
                    {props.history.push('home')}
                </div>
            ) 
        }


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