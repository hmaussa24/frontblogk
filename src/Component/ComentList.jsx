import React from 'react'
import 'antd/dist/antd.css';
import '../resources/Home.css'
import { List, Avatar, Button } from 'antd';

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
function Home(props) {

    const random = () => {
        let number = Math.floor(Math.random() * ColorList.length);
        return number
    }
    return (
        <div>
           
            <List
                itemLayout="horizontal"
                dataSource={props?.comentarios}
                renderItem={item => (
                    <div className="listacomentarios">
                        <List.Item
                        >
                            <List.Item.Meta
                                avatar={<Avatar style={{ backgroundColor: ColorList[random()] }} size='large' >{item.name}</Avatar>}
                                title={<a href="#">{item.name}</a>}
                                description={item.comentario}
                            />
                        </List.Item>
                    </div>
                )}
            />

        </div>
    );
}

export default Home