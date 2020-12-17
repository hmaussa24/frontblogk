import React from 'react'
import { Layout} from 'antd';
const { Footer } = Layout;
function Pie(props){
    return (
        <Footer className={props.class} style={{ textAlign: 'center' }}>Beauty MakeUp ©2020 - Todos los derechos reservados</Footer>
    )

}

export default Pie