import { createStore } from 'redux'
import reducer from './reducers'


const logger=store=>next=>{
	if(!console.group){
		return next;
	}
	return (action)=>{
		console.group(action.type);
		console.log('%c pre state','color:gray',store.getState());
		console.log('%c action','color:yellow',action);
		const returnValue= next(action);
		console.log('%c next state','color:green',store.getState());
		console.groupEnd(action.type);
		return returnValue;

	}
}



const promise=store=>next=>action=>{
	if(typeof action.then === 'function'){
		return action.then(next)
	}
	return next(action);
}
	


const wrapDispatchWithMidllewares=(store,middlewares)=>{
	middlewares.slice().reverse().forEach(middleware=>
		store.dispatch=middleware(store)(store.dispatch)
	)
}

const configureStore=()=>{

	const middlewares=[promise];

//use the second arguments for the initial state
	const store = createStore(reducer)

	if(process.env.NODE_ENV !=='production')
	middlewares.push(logger);

	
	wrapDispatchWithMidllewares(store,middlewares);
   return store

}

export default configureStore