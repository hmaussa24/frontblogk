import React from 'react';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';

function Error() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Inicio</Button>}
        />
    )
}

export default Error