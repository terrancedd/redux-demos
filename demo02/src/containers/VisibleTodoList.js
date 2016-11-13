import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import TodoList from '../components/TodoList'
import { withRouter } from 'react-router'
import {getVisibleTodos} from '../reducers'



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
      const {toggleTodo, ...rest }=this.props;
      return (
        <TodoList
         {...rest}
         onTodoClick={ toggleTodo }
        />
      );
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
    actions
)(VisibleTodoList))


export default VisibleTodoList