import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';

const { Search } = Input;
function InputBuscar(props) {
    return (
        <>
            <br />
            <br />
            <Search
                placeholder="Puedes buscar titulo"
                enterButton="Buscar"
                size="large"
                onSearch={value => props.buscar(value)}
            />
            <br />
            <br />

        </>
    )
}

export default InputBuscar