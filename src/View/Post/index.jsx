import React, { useEffect, useState } from 'react'
import Home from './Home'
import { connect } from 'react-redux'
import { authLogin, profile } from '../../store/actions/'
import Spin from '../../Component/Spin'
import Axios from 'axios'
import { messageLoadin, messageOk } from '../../Component/Messages'

function Index(props) {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [comentarios, setComentarios] = useState([])
    const { slug } = props.match.params
    useEffect(() => {
        if (Object.entries(props.login).length === 0) {
            props.history.push('/')
        } else {
            const posts = async () => {
                messageLoadin()
                Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`
                await Axios.post('http://127.0.0.1:8000/api/auth/post', { slug: slug })
                    .then(response => {
                        setPosts(response.data.posts)
                        messageOk()
                    }, error => {
                        alert('No se cargaron los datos')
                    })
            }

            const comentariosLista = async () => {
                messageLoadin()
                Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`
                await Axios.post('http://127.0.0.1:8000/api/auth/get-coment-by-post', { slug: slug })
                    .then(response => {
                        setComentarios(response.data.comentarios)
                        messageOk()
                    }, error => {
                        alert('No se cargaron los datos')
                    })
            }

            posts()
            comentariosLista()

        }

    }, [])


    const onComentar = async (values) => {
        console.log("=========>", values);
        values.user_id = props.login.user.id
        values.slug = slug
        messageLoadin()
        Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`;
        await Axios.post('http://127.0.0.1:8000/api/auth/save-coment', values)
            .then(response => {
                if (response.data.message) {
                    setComentarios(response.data.comentarios)
                    messageOk()
                } else {
                    alert('Post no publicado, intentao nuevamente')
                }


            }, error => {
                alert('Error post no publicado!')
            })
    }

    return (
        <div className='spin'>
            <Home posts={posts} onComentar={onComentar} comentarios={comentarios}></Home>
            
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