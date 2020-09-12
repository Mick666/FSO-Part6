// services/anecdotes.js

import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content}
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default { getAll, createNew }

// App.js

import React, {useEffect} from 'react'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        anecdoteService
            .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
    }, [dispatch])

    return (
        <div>
            <Notification />
            <Anecdotes />

            <NewAnecdote />
        </div>
    )
}

export default App