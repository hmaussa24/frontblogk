export default function todos(state = {}, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state, sesion: { token: action.token, login: true },
            }
        case 'LOGOUT':
            localStorage.removeItem('persist:root');
            return state = [];
        case 'PROFILE':
            return {
                ...state, user: action.prof,
            }
        default:
            return state;
    }
}