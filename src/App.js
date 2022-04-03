import React,{ useRef, useState, useMemo, useCallback } from 'react';
import './App.css';
import CreateUser from './CreateUser';
import UserList from './UserList';
import Counter from './Counter';


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
  setUsers(users => users.concat(user)); 
  //1. 기존 배열을 복사하고 그 뒤에 user 객체 추가!, 2.함수형 업데이트(이 작업으로 deps 에 users 를 쓸 필요가 없다.)
  setInputs({
    username: '',
    email: ''
  });
  //초기화
  
  nextId.current += 1; //기존 값에 1을 더해주는 작업
},[username, email])
/* User 추가 함수 */

const onRemove = useCallback( id => {
  setUsers(users => users.filter( user => user.id !== id)); //user.id !== id 가 true 일때 나머지 배열만 새 배열로 만듦
},[]); 
/* 리스트 삭제 함수 */

const onToggle = useCallback( id => {
  setUsers(users => users.map(
    user => user.id === id ? 
    {...user, active: !user.active }
    : user
  ));
}, []); //컴포넌트가 처음 만들어질때만 생성되고, 그 다음 재 사용된다.
/* 토글 함수 */

const count = useMemo(()=>countActiveUsers(users), [users]);
/* 활성화 리스트 체크 함수 */

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
      <Counter />
    </div>
  );
}

export default App;
