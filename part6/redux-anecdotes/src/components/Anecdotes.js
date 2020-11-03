import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

import Filter from './Filter'


const Anecdote = ({ anecdote, vote }) => {
  const { content, votes } = anecdote
  return (<>
    <div>
      {content}
    </div>
    <div>
      has {votes}
      <button onClick={() => vote(anecdote)}>vote</button>
    </div>
  </>)
}

const Anecdotes = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`you voted for '${anecdote.content}'`, 5000))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {
        anecdotes.filter((anecdote) => anecdote.content.includes(filter)).map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} vote={voteAnecdote} />
        )
      }
    </>
  )
}

export default Anecdotes