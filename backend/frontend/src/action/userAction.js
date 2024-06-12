import axios from "axios";

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_LOGIN_REQUEST' });
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('http://localhost:8000/api/users/login/', { username: username, password: password }, config)

        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: 'USER_LOGIN_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: 'USER_LOGOUT' });
    dispatch({ type: "USER_PROFILE_RESET" });
    dispatch({ type: "MYORDER_RESET" });
    dispatch({ type: "USER_LIST_RESET" })
}

export const register = (username, email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_REGISTER_REQUEST' });
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('http://localhost:8000/api/users/register/', { name: username, password: password, email: email }, config)

        dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data })
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: 'USER_REGISTER_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }
}

export const getUserProfile = (_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'USER_PROFILE_REQUEST' });
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`http://localhost:8000/api/users/${_id}/`, config)

        dispatch({ type: 'USER_PROFILE_SUCCESS', payload: data })


    } catch (error) {

        dispatch({
            type: 'USER_PROFILE_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'USER_UPDATE_PROFILE_REQUEST' });
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/users/profile/update/`, user, config)

        dispatch({ type: 'USER_UPDATE_PROFILE_SUCCESS', payload: data })
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {

        dispatch({
            type: 'USER_UPDATE_PROFILE_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }
}

export const getUserList = () => async (dispatch, getState) => {


    try {
        dispatch({ type: 'USER_LIST_REQUEST' });
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('http://localhost:8000/api/users/', config);
        dispatch({ type: 'USER_LIST_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'USER_LIST_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }
}

export const deleteUser = (_id) => async (dispatch, getState) =>{
    try {
        dispatch({type: "USER_DELETE_REQUEST"})
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`http://localhost:8000/api/users/delete/${_id}/`, config);
        dispatch({type: "USER_DELETE_SUCCESS"})
    } catch (error) {
        dispatch({
            type: 'USER_DELETE_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }

}

export const updateUser = (_id, user) => async (dispatch, getState) =>{
    try {
        dispatch({type: "USER_UPDATE_REQUEST"})
        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`http://localhost:8000/api/users/update/${_id}/`, user, config);
        dispatch({type: "USER_UPDATE_SUCCESS", payload:data})
    } catch (error) {
        dispatch({
            type: 'USER_UPDATE_FAIL', payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.detail
        });
    }

}