// reducers/anecdoteReducer.js

import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_VOTE':
            const id = action.data.id
        return state
        .map(anecdote => anecdote.id !== id ? anecdote : action.data)
        .sort((a, b) => b.votes - a.votes)
        case 'NEW_ANECDOTE':
            return [...state, action.data]
        case 'INIT_ANECDOTES':
            return action.data
            .sort((a, b) => b.votes - a.votes)
        default:
            return state
    }
}

export const addVote = (content) => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.addLike(content)
        dispatch({
            type: 'ADD_VOTE',
            data: updatedAnecdote
        })
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        console.log(newAnecdote)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: {
                ...newAnecdote,
                votes: 0
            }
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export default anecdoteReducer

// services/anecdotes.js

import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const addLike = async (updatedContent) => {
    const object = { 
        content: updatedContent.content, 
        votes: updatedContent.votes
    }
    const response = await axios.put(`${baseUrl}/${updatedContent.id}`, object)
    return response.data
}

export default { getAll, createNew, addLike }

// component/Anecdotes.js

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