import anecdoteService from '../services/anecdotes'

const sort = (state) => {
  return state.sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case ('ADD'):
      return sort(state.concat(action.data))
    case ('INIT'):
      return action.data
    case ('VOTE'):
      const id = action.data.id
      return sort(state.map(anecdote => anecdote.id === id ? action.data : anecdote))
    default:
      return sort(state)
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }


}

export const vote = (anecdote) => {
  console.log(anecdote);
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote, votes: anecdote.votes + 1
    })
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const addBlog = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}
export default reducer