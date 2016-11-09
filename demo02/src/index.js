import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

const persistedState= {
	todos:[{
		id:'0',
		text:'Welcome back!',
		completed:false,
	}],
}

//use the second arguments for the initial state
const store = createStore(reducer,persistedState)


render(
 <Provider store={store}>
    <App />
 </Provider>,
 document.getElementById('root')
)
