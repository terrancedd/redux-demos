import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'




let AddTodo=({dispatch})=>{
    let input;
    return (
            <div>
            <input ref={node =>{input=node;
            }} />
            <button onClick={()=>{
             dispatch(addTodo(input.value)
               );
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



export default AddTodo
