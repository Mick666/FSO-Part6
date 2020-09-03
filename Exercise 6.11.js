// Components/Notification.js
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (notification === null) return null
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification

//Components/Anecdotes.js

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const addNewVote = (anecdote) => {
        dispatch(addVote(anecdote.id))
        const notificationMessage = `You voted for ${anecdote.content}`
        dispatch(setNotification(notificationMessage))
        setTimeout(() => {
            dispatch(setNotification(null))
        }, 5000)
    }    

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote => 
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => addNewVote(anecdote)}
                />)}
        </div>
    )
}

export default Anecdotes

//Reducers/notificationReducer.js

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

export const setNotification = (content) => {
    return {
        type: "SET_NOTIFICATION",
        data: content
    }
}

export const removeNotification = () => {
    return {
        type: "REMOVE_NOTIFICATION",
        data: null
    }
}

export default notificationReducer