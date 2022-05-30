import axios from "axios"

// const SERVER_URL = "https://trainee-management.herokuapp.com"
const SERVER_URL = "http://localhost:8000"

export const getAccessToken = async (data) => {

    let res = null
    try {
        res = await axios({
            method: 'post',
            url: SERVER_URL + '/auth',
            data: {
                username: data.username,
                password: data.password,
            },
        })
        data.dispatch(res.data.AUTH_TOKEN)
    } catch (err) {
        // console.log(err)
        throw(new Error(err.response.data.message))
    }
}

export const getAllInterns = async (token) => {
    try {
        console.log('fetched')

        let res = await axios({
            method: 'get',
            url: SERVER_URL + '/intern',
            params: {
                token: token,
            }
        })
        return res.data
    } catch (error) {
        throw(new Error('ERROR: ' + error.response.data.message))
    }
}

export const addIntern = async(data) => {
    try {
        let res = await axios({
            method: 'post',
            url: SERVER_URL + '/intern/add',
            data: data
        })
        return res.data
    } catch (error) {
        throw(new Error('ERROR: ' + error.response.data.message))
    }
}

export const getOneIntern = async(token, internId) => {
    try {
        console.log('fetched')
        let res = await axios({
            method: 'get',
            url: SERVER_URL + '/intern/one/' + internId,
            params: {
                token: token,
            }
        })
        return res.data
    } catch (error) {
        throw(new Error('ERROR: ' + error.response.data.message))
    }
}

export const updateOneIntern = async(data) => {
    try {
        console.log('put')
        let res = await axios({
            method: 'put',
            url: SERVER_URL + '/intern/update/' + data.internId,
            data: {
                token: data.token,
                ...data.internData
            },
            // params: {
            //     _method: 'put'
            // }
        })
        return res.data
    } catch (error) {
        throw(new Error('ERROR: ' + error.response.data.message))
    }
}

export const deleteIntern = async(data) => {
    try {
        let res = await axios({
            method: 'delete',
            url: SERVER_URL + '/intern/delete/' + data.internId,
            data: {
                token: data.token,
            },
            // params: {
            //     _method: 'put'
            // }
        })
        return res.data
    } catch (error) {
        throw(new Error('ERROR: ' + error.response.data.message))
    }
}

export default null