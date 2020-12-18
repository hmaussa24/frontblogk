import { message } from 'antd';
const key = 'updatable';
export const messageLoadin = () => {
    message.loading({ content: 'Cargando...', key });
}

export const messageOk = () => {
    message.success({ content: 'Listo!', key, duration: 2 });
}
