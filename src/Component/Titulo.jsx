import React from 'react';
import 'antd/dist/antd.css';
import { PageHeader } from 'antd';


function Header(props) {
    return (
        <PageHeader
            className={props.class}
            onBack={() => null}
            title={props.titulo}
            subTitle={props.subtitulo}
        />
    )
}

export default Header