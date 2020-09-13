// components/Filter.js

import React from 'react'
import { connect } from 'react-redux'
import { updateSearch } from '../reducers/filterReducer'

const Filter = (props) => {
  
  const handleChange = (event) => {
    props.updateSearch(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter anecdotes: <input value={props.Filter} onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  updateSearch
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter

// components/NewAnecdote.js

import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">add</button>
            </form>
        </div>

    )
}
  
export default connect(
    null,
    { createAnecdote }
)(NewAnecdote)