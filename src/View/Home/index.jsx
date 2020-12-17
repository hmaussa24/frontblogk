import React, { useEffect, useState } from 'react'
import Home from './Home'
import { connect } from 'react-redux'
import { authLogin, profile } from '../../store/actions/'
import Spin from '../../Component/Spin'
import Axios from 'axios'
function Index(props) {
    const [loading, setLoading] = useState(false)
    const [produc, setProductos] = useState(null)
    useEffect(() => {
        if (Object.entries(props.login).length === 0) {
            props.history.push('/')
        } else {
            const productos = async () => {
                await Axios.get('http://127.0.0.1:8000/api/auth/get-productos')
                    .then(response => {
                        setProductos(response.data.productos)
                        setLoading(true)
                    }, error => {
                        alert('No se cargaron los datos')
                    })
            }

            productos()

        }

    }, [])

    const handledBuscar = async e => {
        if (e.length > 0) {
            setLoading(false)

            await Axios.post('http://127.0.0.1:8000/api/auth/buscar-productos', {buscar: e})
                .then(response => {
                    setProductos(response.data.productos)
                    setLoading(true)
                }, error => {
                    alert('No se cargaron los datos')
                })

        }
    }
    return (
        <div className='spin'>
            {!loading ? <Spin /> : <Home productos={produc} handledBuscar={handledBuscar} ></Home>}

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