import React from 'react'

import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addBlog(anecdote))
    dispatch(setNotification(`anecdote '${anecdote}' added`, 5000))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit" >create</button>
      </form>
    </>
  )
}

export default AnecdoteForm