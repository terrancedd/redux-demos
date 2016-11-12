import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router'
import {getVisibleTodos} from '../reducers'
import { fetchTodos } from '../api'

class VisibleTodoList extends Component {
  componentDidMount(){
    fetchTodos(this.props.filter).then(todos=>
      console.log(this.props.filter,todos)
    )
  }
  componentDidUpdate(prevProps){
     if(this.props.filter !==prevProps.filter){
       fetchTodos(this.props.filter).then(todos=>
          console.log(this.props.filter,todos)
       )
     }

  }
  render(){
      return <TodoList {...this.props} />
  }
}
const mapStateToTodoListProps=(state,{params})=>{
        const filter=params.filter||'all';

        return {
            todos: getVisibleTodos(
                    state,
                    filter
                   ),
            filter
        }
}
/*
const mapDispatchToTodoListProps=dispatch=>(
       {
            onTodoClick(id) {
                    dispatch(toggleTodo(id));
            }

       }
)

*/

VisibleTodoList=withRouter(connect(
    mapStateToTodoListProps,
    { onTodoClick:toggleTodo  }
)(VisibleTodoList))


export default VisibleTodoList