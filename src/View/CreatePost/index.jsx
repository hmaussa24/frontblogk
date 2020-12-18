import React, { useEffect, useState } from 'react'
import Create from './Create'
import { connect } from 'react-redux'
import { authLogin, profile } from '../../store/actions/'
import Axios from 'axios'
import {messageLoadin, messageOk} from '../../Component/Messages'
function Index(props) {
    const [isSend, setSend] = useState(false)
    const [id, setId] = useState(null)
    const [isSave, setSave] = useState(false)
    const [categorias, setCategorias] = useState(null)
    const onFinish = async (values) => {
        console.log("=========>",values);
        values.user_id = props.login.user.id
        setSend(true)
        messageLoadin()
        Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`;
        await Axios.post('http://127.0.0.1:8000/api/auth/create', values)
            .then(response => {
                setSend(false)
                if (response.data.message) {
                    setSave(response.data.message)
                    //alert('Post publicado!')
                    messageOk()
                    setSend(false)
                    setSave(true)
                } else {
                    alert('Post no publicado, intentao nuevamente')
                }


            }, error => {
                setSend(false)
                alert('Error post no publicado!')
            })
    }

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
                        setSend(false)
                        alert('No se encontraron categorias!')
                    })
            }
            categoias()
        }

    }, [])


    return (
        <Create onFinish={onFinish} categorias={categorias} isSend={isSend} isSave={isSave} id={id} tipo_user={props.login.user.tipo_user} />
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