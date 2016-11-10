import { createStore } from 'redux'
import {loadState,saveState} from './localStorage'
import throttle from 'lodash/throttle'
import reducer from './reducers'

const configureStore=()=>{

	const persistedState= loadState();

//use the second arguments for the initial state
	const store = createStore(reducer,persistedState)

//save state to localStorage once changed
	store.subscribe(throttle(()=>{
         
         console.log(store.getState());
		saveState({todos:store.getState().todos});

	},1000))

   return store

}

export default configureStore