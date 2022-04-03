import React,{ useRef, useState, useMemo, useCallback } from 'react';
import './App.css';
import CreateUser from './CreateUser';
import UserList from './UserList';


function countActiveUsers(users) {
  console.log('활성된 사용자 수를 세는 중');
  return users.filter(users => users.active).length;
}

function App() {

  const [inputs, setInputs] = useState({
   username : '',
   email : ''
  });
  const { username, email } = inputs; //구조분해할당

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  },[inputs]);
  //onChange 함수

  const [users,setUsers] = useState([{
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
},
]);

const nextId = useRef(4);//컴포넌트가 리 렌더링 될 필요 없기 때문에 ref 로 관리해주는 것

const onCreate = useCallback(() => {
  const user = {
    id: nextId.current,
    username,
    email,
  };
  setUsers(users.concat(user)); //기존 배열을 복사하고 그 뒤에 user 객체 추가!
  setInputs({
    username: '',
    email: ''
  });
  //초기화
  
  nextId.current += 1; //기존 값에 1을 더해주는 작업
},[username, email, users ])
const onRemove = useCallback( id => {
  setUsers(users.filter( user => user.id !== id)); //user.id !== id 가 true 일때 나머지 배열만 새 배열로 만듦
},[users]);
const onToggle = useCallback( id => {
  setUsers(users.map(
    user => user.id === id ? 
    {...user, active: !user.active }
    : user
  ));
}, [users]);
const count = useMemo(()=>countActiveUsers(users), [users]);
  return (
    <div>
      <CreateUser 
      username={username}
      email = {email}
      onChange={onChange}
      onCreate={onCreate}
      />
      <UserList 
      users={users}
      onRemove={onRemove}
      onToggle={onToggle}
      />
      <div>활성 사용자 수 : {count}</div>
    </div>
  );
}

export default App;
