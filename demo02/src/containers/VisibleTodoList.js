import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router'
import {getVisibleTodos,getErrorMessage,getIsFetching} from '../reducers'
import FetchError from '../components/FetchError'


class VisibleTodoList extends Component {
  componentDidMount(){
    this.fetchData();
    
  }
  componentDidUpdate(prevProps){
     if(this.props.filter !==prevProps.filter){
       this.fetchData();
     }

  }

  fetchData(){
    const {filter,fetchTodos}=this.props;
    
    fetchTodos(filter);

  }

  render(){
      const {toggleTodo,errorMessage,todos,isFetching }=this.props;
      if (isFetching && !todos.length){
        return <p>Loading...</p>
      }

      if (errorMessage && !todos.length){
        return (
          <FetchError 
            message={errorMessage}
            onRetry={()=>this.fetchData()}
          />
          )
      }

      return (
        <TodoList
         todos={todos}
         onTodoClick={ toggleTodo }
        />
      );
  }
}
const mapStateToTodoListProps=(state,{params})=>{
        const filter=params.filter||'all';

        return {
            todos: getVisibleTodos(state,filter),
            errorMessage:getErrorMessage(state,filter),
            isFetching: getIsFetching(state,filter),
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
    actions
)(VisibleTodoList))


export default VisibleTodoList