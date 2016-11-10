import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router'
import {getVisibleTodos} from '../reducers'


const mapStateToTodoListProps=(state,{params})=>(
        {
            todos: getVisibleTodos(
                    state,
                    params.filter||'all'
                   )
        }
)
/*
const mapDispatchToTodoListProps=dispatch=>(
       {
            onTodoClick(id) {
                    dispatch(toggleTodo(id));
            }

       }
)

*/

const VisibleTodoList=withRouter(connect(
    mapStateToTodoListProps,
    { onTodoClick:toggleTodo  }
)(TodoList))


export default VisibleTodoList