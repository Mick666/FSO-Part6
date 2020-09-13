let timeoutID

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.data
        case "REMOVE_NOTIFICATION":
            return null
        default:
            return state
    }
}

export const setNotification = (content, time) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: content
        })
        if (timeoutID) clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            dispatch({
                type: "REMOVE_NOTIFICATION",
                data: null
            })
        }, time * 1000)

    }
}

export const removeNotification = () => {
    return {
        type: "REMOVE_NOTIFICATION",
        data: null
    }
}

export default notificationReducer