import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import {loadState,saveState} from './localStorage'
const persistedState= loadState();

//use the second arguments for the initial state
const store = createStore(reducer,persistedState)

//save state to localStorage once changed
store.subscribe(()=>{

	saveState({todos:store.getState().todos});

})

render(
 <Provider store={store}>
    <App />
 </Provider>,
 document.getElementById('root')
)
