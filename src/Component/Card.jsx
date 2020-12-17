import React, { useState, useEffect } from 'react';
import Spin from './Spin'
import 'antd/dist/antd.css';
import { Card, Avatar, Modal, Form, InputNumber, Button, } from 'antd';
import { EditOutlined, CameraOutlined, DollarOutlined } from '@ant-design/icons';
import Axios from 'axios';
import UploadFotos from './UploadFotos'
const { Meta } = Card;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const validateMessages = {
    required: '${label} es obligatorio!',
    types: {
        number: '${label} debe ser un numero!',
    }
};
function CardImg(props) {
    const [visible, setVisibe] = useState(false)
    const [ventaModal, setVentaModal] = useState(false)
    const [fotosModal, setFotosModal] = useState(false)
    const [stock, setStock] = useState(null)
    const [cantidad, setCantidad] = useState(null)
    const [precio_venta, setPrecio] = useState(null)
    const [loading, setLoading] = useState(false)
    const showModal = () => {
        setVisibe(true)
    };

    const showModalVenta = () => {
        setVentaModal(true)
    };

    useEffect(() => {
        setPrecio(props.producto.precio_venta)
        setCantidad(1)
    }, [])

    const handleOk = async e => {
        setLoading(true)
        Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`;
        await Axios.post('http://127.0.0.1:8000/api/auth/stock', { id: props.producto.id, stock: stock })
            .then(response => {
                alert('Stock actualizado!')
                setLoading(false)
                setVisibe(false)
            }, error => {
                alert('No se actualizo el Stock!')
                setLoading(false)
            })

    };

    const handleCancel = e => {
        setVisibe(false)
    };
    const handleVentaOk = async e => {
        setLoading(true)
        Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt_token')}`;
        await Axios.post('http://127.0.0.1:8000/api/auth/venta', { cantidad: cantidad, precio_venta: precio_venta, producto_id: props.producto.id })
            .then(response => {
                if (response.data.message) {
                    alert('Venta realizada!')
                    setLoading(false)
                    setVentaModal(false)
                } else {
                    alert('No se realizo la venta!')
                    setLoading(false)
                }
            }, error => {
                alert('No se realizo la venta!')
                setLoading(false)
            })

    };
    const handleVentaCancel = e => {
        setVentaModal(false)
    };

    const onFinish = e => {
        setStock(e)
    }
    const onFinishCantidad = e => {
        setCantidad(e)
    }
    const onFinishPrecio = e => {
        setPrecio(e)
    }

    const addFotos = () => {
        setFotosModal(true)
    }

    const addFotosOk = () => {
        setFotosModal(false)
    }

    const addFotosCancel = () => {
        setFotosModal(false)
    }
    return (
        <>
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src={'http://localhost/beautyback/public/img/' + props.img}
                    />
                }
                actions={[
                    <DollarOutlined key="ventas" onClick={showModalVenta} />,
                    <CameraOutlined onClick={addFotos} />,
                    <EditOutlined key="edit" onClick={showModal} />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={props.titulo}
                    description={props.descripcion}
                />
            </Card>
            <Modal
                title="Editar Stock"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {loading ? <Spin /> : null}
                <Form className='form-producto' {...layout} name="nest-messages" validateMessages={validateMessages}>
                    <Form.Item
                        name='stock'
                        label="Stock en almacen"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                            },
                        ]}
                    >
                        <InputNumber onChange={onFinish} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Subir Fotos"
                visible={fotosModal}
                onOk={addFotosOk}
                onCancel={addFotosCancel}
            >
                <UploadFotos id={props.producto.id}/>
            </Modal>

            <Modal
                title="Agregar Venta"
                visible={ventaModal}
                onOk={handleVentaOk}
                onCancel={handleVentaCancel}
            >
                {loading ? <Spin /> : null}
                <Form className='form-producto' {...layout} name="nest-messages" validateMessages={validateMessages}>
                    <Form.Item
                        name='cantidad'
                        label="Cantidad de Pedido"
                        value="1"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                            },
                        ]}
                    >
                        <InputNumber onChange={onFinishCantidad} defaultValue={1} />
                    </Form.Item>
                    <Form.Item
                        name='stock'
                        label="Stock Actual"
                        value="1"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                            },
                        ]}
                    >
                        <InputNumber onChange={onFinishCantidad} defaultValue={props.producto.stock} disabled />
                    </Form.Item>
                    <Form.Item
                        name='precio_compra'
                        label="Precio de Compra"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                            },
                        ]}
                    >
                        <InputNumber onChange={onFinishPrecio} defaultValue={props.producto.precio_compra} disabled />
                    </Form.Item>
                    <Form.Item
                        name='precio_venta'
                        label="Precio de Venta"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                            },
                        ]}
                    >
                        <InputNumber onChange={onFinishPrecio} defaultValue={props.producto.precio_venta} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CardImg