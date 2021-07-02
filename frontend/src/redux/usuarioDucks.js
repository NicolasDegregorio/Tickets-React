import axios from 'axios'
import jwt_decode from "jwt-decode";

// constantes
const dataInicial = {
    activo: false,
    loading:false
}

// types
const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS'
const GET_LOADING = "GET_LOADING"
const CERRAR_SESION = 'CERRAR_SESSION'

// reducer
export default function userReducer(state = dataInicial, action){
    switch (action.type) {
        case  GET_LOGIN_SUCCESS:
            return {...state, activo: true, usuario: action.payload.usuario, role: action.payload.role, token: action.payload.token, loading: action.payload.loding} 
        case CERRAR_SESION:
            return {...dataInicial, role: ''}
        case GET_LOADING:
            return{...dataInicial, loading: action.payload.loading}
        default:
            return state
    }
}

// actions
export const loginUserAction = (usuario) => async (dispatch, getState) => {
    dispatch({
        type : GET_LOADING,
        payload: {
            loading: true,
        }
    })
    try {
        const res = await axios.post('users', usuario)
        dispatch({
            type : GET_LOGIN_SUCCESS,
            payload: {
                token: res.data.token,
                usuario: jwt_decode(res.data.token),
                role: res.data.role.role
            }
        })
        localStorage.setItem('usuario', JSON.stringify({token : res.data.token}))
    } catch (error) {
        console.log(error.response.data)
        alert(error.response.data.mensaje)
        dispatch({
        type : GET_LOADING,
            payload: {
                loading: false,
            }
        })

    }
}

export const logout = () => (dispatch) => {
    const confirm = window.confirm("Estas Seguro de Cerrar Sesion")
    if (confirm){
        dispatch({
            type : CERRAR_SESION,
        })
        localStorage.removeItem('usuario')
    }
}


export const leerUsuarioAccion = () => async (dispatch) => {
    if(localStorage.getItem('usuario')){
        const usuario = JSON.parse(localStorage.getItem('usuario'))
        const usuarioDecode = jwt_decode(usuario.token)
        dispatch({
            type: GET_LOGIN_SUCCESS,
            payload: {
                token: usuario.token,
                usuario: usuarioDecode,
                role: usuarioDecode.data.role
            }
        })
    }
}


    
    
