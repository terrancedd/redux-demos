import { createStore } from 'redux'
import {loadState,saveState} from './localStorage'
import throttle from 'lodash/throttle'
import reducer from './reducers'


const addLoggingToDispatch=(store)=>{
	const rawDispatch=store.dispatch;
	if(!console.group){
		return rawDispatch;
	}
	return (action)=>{
		console.group(action.type);
		console.log('%c pre state','color:gray',store.getState());
		console.log('%c action','color:yellow',action);
		const returnValue= rawDispatch(action);
		console.log('%c next state','color:green',store.getState());
		console.groupEnd(action.type);
		return returnValue;

	}

}


const configureStore=()=>{

	const persistedState= loadState();

//use the second arguments for the initial state
	const store = createStore(reducer,persistedState)

	if(process.env.NODE_ENV !=='production')
	store.dispatch= addLoggingToDispatch(store);


//save state to localStorage once changed
	store.subscribe(throttle(()=>{
         
         //console.log(store.getState());
		saveState({todos:store.getState().todos});

	},1000))

   return store

}

export default configureStore