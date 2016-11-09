import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'


const getVisibleTodos=(todos,filter) =>{
	switch(filter){
      	    case 'SHOW_ALL':
      	        return todos;
      	    case 'SHOW_COMPLETED':
      	        return todos.filter(t=>t.completed);
      	    case 'SHOW_ACTIVE':
      	        return todos.filter(t=>!t.completed);
      	     default:
    		    throw new Error('Unknown filter: ' + filter)
      	}
}



const mapStateToTodoListProps=state=>(
        {
            todos: getVisibleTodos(
                    state.todos,
                    state.visibilityFilter
                   )
        }
)

const mapDispatchToTodoListProps=dispatch=>(
       {
            onTodoClick(id) {
                    dispatch(toggleTodo(id));
            }

       }
)



const VisibleTodoList=connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList)


export default VisibleTodoList