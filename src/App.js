import React,{ useRef, useState, useMemo, useCallback, useReducer, createContext } from 'react';
import './App.css';
import CreateUser from './CreateUser';
import UserList from './UserList';
import Counter from './Counter';
import useInputs from './useInputs';


function countActiveUsers(users) {
  console.log('활성된 사용자 수를 세는 중');
  return users.filter(users => users.active).length;
}

const initialState = {
 
  users: [
    {
      id: 1,
      username: 'moon',
      email: 'moon@gmail.com',
      active: true,
  },
  {
      id: 2,
      username: 'Park',
      email: 'Park@gmail.com',
      active: false,
  },
  {
      id: 3,
      username: 'Kim',
      email: 'Kim@gmail.com',
      active: false,
  }
  ]
};
function reducer(state, action){
  switch (action.type){
    
    case 'CREATE_USER': {
      return {
        
        users: state.users.concat(action.user) //배열 추가
      }
    };// useState를 썼을 때는 기존 작업 두가지를 따로 했는데, 이곳에서는 한 번에 할 수 있다.
    case 'TOGGLE_USER': {
      return {
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      }
    };
    case 'REMOVE_USER': {
      return {
        users: state.users.filter(user => user.id !== action.id)
      }
    };
    default : 
      throw new Error('unHandled Error')
  };
  
};

export const UserDispatch = createContext(null); //Provider 컴포넌트 기본 포함 

function App() {

  const [ state, dispatch ] = useReducer(reducer, initialState);
  const [ {username, email }, onChange, reset ] = useInputs({
    username : '',
    email: '',
  })
  const nextId = useRef(4);
  const { users } = state; //구조분해할당, 현재 상태가 state 이니 state 를 가져오는 것

  

  const onCreate = useCallback(()=>{
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
      }
    });
    nextId.current += 1;
    reset();
  }, [ username, email, reset ]);

 
  
  const count = useMemo(()=> countActiveUsers(users), [users])


  return (
    <UserDispatch.Provider value={dispatch}>
    <div>
      <CreateUser 
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
      />
      <UserList 
      users={users}
      />
      <div>활성 사용자 수 : {count}</div>
    </div>
    </UserDispatch.Provider>
  );
}

export default App;
