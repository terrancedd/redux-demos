const React = require('react');
const ReactDOM = require('react-dom');
const Redux=require('redux');

const todos=(state,action)=>{
    switch (action.type){
        case 'ADD_TODO':
            return [...state,todo(undefined,action)];
        case 'TOGGLE_TODO':
            return state.map(t=>todo(t,action));
        default:
            return state;
 }
};


const todo=(state,action) =>{
	switch (action.type) {
		case 'ADD_TODO':
			return   {
                        id:action.id,
                        text:action.text,
                        completed:false
                     };
                   
		case 'TOGGLE_TODO':
			if(state.id!=action.id)
                return state;

                return {
                        ...state,
                        completed: !todo.completed

                    };
                 
		default:
			return state;
	}
}

const visibilityFilter=(state='SHOW_ALL',action)=>{
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const todoApp=conbineReducers({
todos,
visibilityFilter 
/*equivilent to
todos:todos,
visibilityFilter:visibilityFilter
*/
});



//construct conbineReducers from scratch

const conbineReducers=(reducers)=>{
    return (state={},action)=>{
        return Object.keys(reducers).reduce(
            (nextState,key)=>{
                    nextState[key]=reducers[key](
                        state[key],
                        action
                        );
                    return nextState;

            },
            {}
        );
    };
};
/* 
const todoApp=(state={},action) =>{
    return {
        todos: todos(
            state.todos,
            action
            ),
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action)
    };
};
*/


const {createStore,conbineReducers}=Redux;
const store=createStore(todoApp);


const Counter=({value,onIncrement,onDecrement})=>(
	<div>
    	<h1>{value}</h1>
    	<button onClick={onIncrement}>+</button>
    	<button onClick={onDecrement}>-</button>
    </div>
	);

const render=()=>{
	ReactDOM.render(
 	<Counter 
 	value={store.getState()} 
    onIncrement={()=>
    	store.dispatch({
    		type: 'INCREMENT'
    	})
    }
    onDecrement={()=>
    	store.dispatch({
    		type: 'DECREMENT'
    	})
    }

 	/>,
 	document.getElementById('root')
		);
};


store.subscribe(render);
render();

/*
document.addEventListener('click',()=>{
	store.dispatch({type:'INCREMENT'});
})


ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.querySelector('#wrapper')
);
*/