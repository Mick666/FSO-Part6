import React from 'react'
import { connect } from 'react-redux'
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

const Anecdotes = (props) => {

    const addNewVote = (anecdote) => {
        const updatedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        props.addVote(updatedAnecdote)
        const notificationMessage = `You voted for ${anecdote.content}`
        props.setNotification(notificationMessage, 5)
    }    

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {props.anecdotes.map(anecdote => 
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => addNewVote(anecdote)}
                />)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
    anecdotes: state.anecdotes
    .filter(anecdote => 
        anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) === 0
    )}
}

const mapDispatchToProps = {
    addVote,
    setNotification
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes