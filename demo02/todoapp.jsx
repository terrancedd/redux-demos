const React = require('react');
const ReactDOM = require('react-dom');
const Redux=require('redux');


const {createStore,combineReducers}=Redux;

const {Component}=React;


let nextTodoId=0;




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
                        completed: !state.completed

                    };
                 
		default:
			return state;
	}
}

const todos=(state=[],action)=>{
    switch (action.type){
        case 'ADD_TODO':
            return [...state,todo(undefined,action)];
        case 'TOGGLE_TODO':
            return state.map(t=>todo(t,action));
        default:
            return state;
 }
};



const visibilityFilter=(state='SHOW_ALL',action)=>{
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const todoApp=combineReducers({
todos,
visibilityFilter 
/*equivilent to
todos:todos,
visibilityFilter:visibilityFilter
*/
});

const store=createStore(todoApp);


/*construct combineReducers from scratch
GOOD to understand the concept of functional programming

const combineReducers=(reducers)=>{
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
*/
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



class TodoApp extends Component {

 render(){
   
    return (
        <div>
            <input ref={node =>{this.input=node;
            }} />
            <button onClick={()=>{store.dispatch({
                type: 'ADD_TODO',
                text: this.input.value,
                id:nextTodoId++
            });
             this.input.value='';
             }}>
                Add Todo
            </button>
            <ul>
              {
                this.props.todos.map(todo=>
                    <li key={todo.id} 
                        onClick={()=>store.dispatch({type:'TOGGLE_TODO',id:todo.id})}
                        style={{textDecoration:todo.completed?'line-through':'none'}}
                    >
                        {todo.id}
                        {todo.text}
                        {todo.completed.toString()}
                    </li>
               )}
            </ul>
        </div>
    );
 }
}



const render=()=>{
	ReactDOM.render(
 	<TodoApp todos={store.getState().todos}/>,
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