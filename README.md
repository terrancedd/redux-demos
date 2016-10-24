#redux-beginning-demo


1. Redux is single immutable state tree
2. **State** is readonly, and only way to change it is via **Action**
3. **pure function**
     - return the value sole dependent on the input arguments
     - no side effect such as network/database calls
     - does not modify the input argument. e.g. not change items of the array passing to it
4. **Reducer**: pure function which takes the previous state and the dispatching action to generate the next state. 
5. **createStore**
```javascript
    const {createStore}=Redux;
    const store=createStore(reducer)
    //there are 3 method of store
    store.getState(); // return the lates state 
    store.dispatch(); //dispatch action
    stort.subscribe(); //register a call back that redux will call anytime an action has been dispatched
```
6.Build **createStore**
```javascript
const creatStore(reducer)=>{
let state;
let listeners=[];

const getState=()=>state;

const dispatch=(action)=>{
state=reducer(state,action);
listeners.forEach(listener=>listener());
};

const subscribe=(listener)=>{
listeners.push(listener);
return ()=>{
listeners=listeners.filter(l=>l!==listener);
}
};

dispatch({});

return {getState,dispatch,subscribe};
}
```