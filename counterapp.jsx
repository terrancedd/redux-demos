const React = require('react');
const ReactDOM = require('react-dom');
const Redux=require('redux');


const counter=(state=0,action) =>{
	switch (action.type) {
		case 'INCREMENT':
			return state+1;
		case 'DECREMENT':
			return state-1;
		default:
			return state;
	}
}

const {createStore}=Redux;
const store=createStore(counter);

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