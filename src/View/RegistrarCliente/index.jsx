import React, { useEffect, useState } from 'react'
import RegistraCliente from './RegistrarCliente'
import { connect } from 'react-redux'
import { authLogin, profile } from '../../store/actions/'
import Axios from 'axios'
import {messageLoadin, messageOk} from '../../Component/Messages'
function Index(props) {
    const [isSend, setSend] = useState(false)
    const [id, setId] = useState(null)
    const [isSave, setSave] = useState(false)
    const onFinish = async (values) => {
        console.log(values);
        setSend(true)
        messageLoadin()
        //Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`;
        await Axios.post('http://127.0.0.1:8000/api/auth/signup', values)
            .then(response => {
                setSend(false)
                //console.log(response.data.id.id)
                //setId(response.data.id.id)
                if(response.data.message){
                    setSave(response.data.message)
                    //alert('Cliente guardado!')
                    messageOk()
                    props.history.push('/')
                }else{
                    alert('Cliente no guardado, intentao nuevamente')
                }
               
                
            }, error => {
                setSend(false)
                alert('Cliente no guardado!')
            })
    }

    useEffect(() => {
        // if (Object.entries(props.login).length === 0) {
        //     props.history.push('/')
        // }

    }, [])

    return (
        <RegistraCliente onFinish={onFinish} isSend={isSend} isSave={isSave} id={id}/>
    )

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
)(Index);


export default inicio