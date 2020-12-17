import React from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';

function Spining(props) {
    return (
        <div className={props.clase}>
            <Spin />
        </div>
    )

}

export default Spining