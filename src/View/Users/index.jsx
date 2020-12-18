import React, { useEffect, useState } from 'react'
import Home from './Home'
import { connect } from 'react-redux'
import { authLogin, profile } from '../../store/actions/'
import Spin from '../../Component/Spin'
import Axios from 'axios'
import { messageOk, messageLoadin } from '../../Component/Messages'
function Index(props) {
    const [users, setUsers] = useState([])
    useEffect(() => {
        if (Object.entries(props.login).length === 0) {
            props.history.push('/')
        } else {
            const users = async () => {
                messageLoadin()
                Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`
                await Axios.get('http://127.0.0.1:8000/api/auth/get-users')
                    .then(response => {
                        setUsers(response.data.users)
                        messageOk()
                    }, error => {
                        alert('No se cargaron los datos')
                    })
            }

            users()

        }

    }, [])

    const handledBuscar = async e => {
        if (e.length >= 0) {
            messageLoadin()

            await Axios.post('http://127.0.0.1:8000/api/auth/get-users-by-name', {buscar: e})
                .then(response => {
                    setUsers(response.data.users)
                    messageLoadin()
                }, error => {
                    alert('No se cargaron los datos')
                })

        }
    }

    const eliminar = async (id) => {
        messageLoadin()
        await Axios.post('http://127.0.0.1:8000/api/auth/delete-user', { id: id })
            .then(response => {
               // alert('Post eliminado!')
                setUsers(response.data.users)
                messageOk()
            }, error => {
                alert('No se cargaron los datos')
            })
    }

    return (
        <div className='spin'>
            <Home users={users} handledBuscar={handledBuscar} eliminar={eliminar}></Home>

        </div>

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