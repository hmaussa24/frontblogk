import React, { useEffect, useState } from 'react'
import Home from './Home'
import { connect } from 'react-redux'
import { authLogin, profile } from '../../store/actions/'
import Spin from '../../Component/Spin'
import Axios from 'axios'
import { messageLoadin, messageOk } from '../../Component/Messages'
function Index(props) {
    const [del, setDel] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (Object.entries(props.login).length === 0) {
            props.history.push('/')
        } else {
            const posts = async () => {
                messageLoadin()
                Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`
                await Axios.post('http://127.0.0.1:8000/api/auth/get-posts-by-id', { id: props?.login?.user?.id })
                    .then(response => {
                        setPosts(response.data.posts)
                        messageOk()
                        setDel(false)
                    }, error => {
                        alert('No se cargaron los datos')
                    })
            }



            posts()

        }

    }, [])

    const handledBuscar = async e => {
        if (e.length > 0) {
            messageLoadin()
            Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`
            await Axios.post('http://127.0.0.1:8000/api/auth/buscar-post', { buscar: e })
                .then(response => {
                    setPosts(response.data.posts)
                    messageOk()
                }, error => {
                    alert('No se cargaron los datos')
                })

        }
    }

    

    const eliminar = async (id, event) => {
        setDel(true)
        messageLoadin()
        await Axios.post('http://127.0.0.1:8000/api/auth/delete', { id: id })
            .then(response => {
                // alert('Post eliminado!')
                setPosts(response.data.post)
                messageOk()
            }, error => {
                alert('No se cargaron los datos')
            })
    }
    return (
        <div className='spin'>
            <Home posts={posts} handledBuscar={handledBuscar} eliminar={eliminar} del={del}></Home>
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