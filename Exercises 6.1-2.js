import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const resetstats = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>Good</button> 
      <button onClick={neutral}>Neutral</button> 
      <button onClick={bad}>Bad</button>
      <button onClick={resetstats}>Reset stats</button>
      <div>Good {store.getState().good}</div>
      <div>Neutral {store.getState().ok}</div>
      <div>Bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

// Reducer.js

const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD':
        return {
            ...state,
            good: state.good + 1
        }
      case 'OK':
        return {
          ...state,
          ok: state.ok + 1
      }
      case 'BAD':
        return {
          ...state,
          bad: state.bad + 1
      }
      case 'ZERO':
        return {
          good: 0,
          ok: 0,
          bad: 0
        }
      default: return state
    }
    
  }
  
  export default counterReducer
