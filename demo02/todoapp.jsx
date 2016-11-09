const React = require('react');
const ReactDOM = require('react-dom');
const Redux=require('redux');
const ReactRedux=require('react-redux');


const {createStore,combineReducers}=Redux;
const {Component}=React;
const {Provider,connect}=ReactRedux;


let nextTodoId=0;

const addTodo=text=>({
   
            type:'ADD_TODO',
            id: nextTodoId++,
            text
        }
)



const setVisibilityFilter=(filter)=>({
                    type:'SET_VISIBILITY_FILTER',
                    filter

                }
);


const toggleTodo=id=>({
        type:'TOGGLE_TODO',
         id
});

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

//const store=createStore(todoApp);


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

const Link=({active,children,onClick})=>{

    if(active) return (<span>{children}</span>);  

    return (
        <a href='#'
            onClick={e=>{
                e.preventDefault();
                onClick();
                }       
            }
        >
        {children}
        </a>
    );
};

/*
class FilterLink extends Component {
    componentDidMount(){
        this.unsubscribe=store.subscribe(()=>
            this.forceUpdate()
        );

    }

    componentWillUnmount(){
        this.unsubscribe();
    }


    render (){
        const props=this.props;
        const state=store.getState();
        console.log(store.getState());

        return (
            <Link active={props.filter===state.visibilityFilter}
                  onClick={()=>store.dispatch({
                    type:'SET_VISIBILITY_FILTER',
                    filter:props.filter
                    })
                   }
            >
            {props.children}
            </Link>
            );
    }
}
*/

const mapStateToLinkProps =(
    state,
    ownProps
    )=>{
    return {
        active:
            ownProps.filter ===
            state.visibilityFilter
    };

};


const mapDispatchToLinkProps=(
    dispatch,
    ownProps
    )=>{
    return {
        onClick:()=>dispatch(
            setVisibilityFilter(ownProps.filter)
            )
                    
    }
};

const FilterLink=connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);


//the above code use the react-redux binding to write the container components VisibleTodoList in a different way


const Todo=({onClick,
             completed,
             text
      })=>(
  <li 
    onClick={onClick}
    style={{textDecoration:completed?'line-through':'none'}}
  >
     {text}
  </li>

);

const TodoList=({
      todos,
      onTodoClick
      })=>(
      <ul>
        {todos.map(todo =>
            <Todo
              key={todo.id}
              {...todo}
              onClick={()=>onTodoClick(todo.id)}
            />
            )
        }
      </ul>

      );

const Footer=()=>(<p>
                Show:
                {' '}
                <FilterLink
                    filter='SHOW_ALL'
                    
                >
                All
                </FilterLink>
                {' '}
                <FilterLink
                    filter='SHOW_ACTIVE'
                    
                >
                Active
                </FilterLink>
                {' '}
                <FilterLink
                    filter='SHOW_COMPLETED'
                    
                >
                Completed
                </FilterLink>
            </p>
      );




let AddTodo=({dispatch})=>{
    let input;
    return (
            <div>
            <input ref={node =>{input=node;
            }} />
            <button onClick={()=>{
             dispatch(addTodo(input.value)
               )
             input.value='';
             }}>
                Add Todo
            </button>
            </div>
        );

};
//state is not passed to AddTodo
//if the second argument is null, dispatch function will be passed directly
AddTodo=connect()(AddTodo);


const getVisibleTodos=(
        todos,
        filter
    ) =>{

        switch(filter){
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_COMPLETED':
                return todos.filter(t=>t.completed);
            case 'SHOW_ACTIVE':
                return todos.filter(t=>!t.completed);
        }


};


/*
class VisibleTodoList extends Component{

    componentDidMount(){
        this.unsubscribe=store.subscribe(()=>
            this.forceUpdate()
        );

    }

    componentWillUnmount(){
        this.unsubscribe();
    }


    render (){
        const props=this.props;
        const state=store.getState();
        
        return (
            <TodoList
                todos={
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                        )
                }
                onTodoClick={id=>
                    store.dispatch({
                        type:'TOGGLE_TODO',
                        id
                    })}
            />
        );

    }
}

*/



const mapStateToTodoListProps=state=>(
        {
            todos: getVisibleTodos(
                    state.todos,
                    state.visibilityFilter
                   )
        }
);

const mapDispatchToTodoListProps=dispatch=>(
       {
            onTodoClick:(id)=>{
                    dispatch(toggleTodo(id));
            }

       }
       ) ;



const VisibleTodoList=connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList);

//the above code use the react-redux binding to write the container components VisibleTodoList in a different way



const TodoApp =()=>(
   <div>
       <AddTodo />
       <VisibleTodoList />
       <Footer />
   </div>
);
 




//console.log(...store.getState());
ReactDOM.render(
 <Provider store={createStore(todoApp)}>
    <TodoApp />
 </Provider>
 ,
 document.getElementById('root')
);





/*
document.addEventListener('click',()=>{
	store.dispatch({type:'INCREMENT'});
})


ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.querySelector('#wrapper')
);
*/