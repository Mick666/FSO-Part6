// reducers/notificationReducer.js

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
        setTimeout(() => {
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

//components/Notification.js

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

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
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) === 0)
    })

    const addNewVote = (anecdote) => {
        const updatedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        dispatch(addVote(updatedAnecdote))
        const notificationMessage = `You voted for ${anecdote.content}`
        dispatch(setNotification(notificationMessage, 5))
    }    

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
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