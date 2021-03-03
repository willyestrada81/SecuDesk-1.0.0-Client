import { createStore } from 'redux'

export default () => {
  const store = createStore((state, action) => {
    state = {
      message: ''
    }
    switch (action.type) {
      case 'SET_MESSAGE':
        state.message = action.message
        return {
          message: state.message
        }
      default:
        return state
    }
  })
  return store
}
