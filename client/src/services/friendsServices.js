import { appendOwnerState } from '@mui/base'
import * as api from '../api/index'

export const getUserContactService = async(data) => {
    try {
        const userContacts = await api.getFriend(data)
        return userContacts
    } catch (err) {
        return false
    }
}

export const addUserFriend = async(data, setAlert, setAlertMessage) => {
    try {
        const create_response = await api.addFriend(data)
        return create_response
    } catch (err) {
        setAlert(true)
        err.response.status === 400 || err.response.status === 401 ?
            setAlertMessage(err.response.data.message) : setAlertMessage("Oops! Something went worng")
        return false
    }
}