import { createStore } from 'redux'
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

	

//use the second arguments for the initial state
	const store = createStore(reducer)

	if(process.env.NODE_ENV !=='production')
	store.dispatch= addLoggingToDispatch(store);

   return store

}

export default configureStore