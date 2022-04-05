import React,{ useEffect, useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(function User({user}){
    const { username, email, id, active }= user;//구조분해할당
    const dispatch = useContext(UserDispatch);
    /* useEffect(()=>{
        console.log('유저값이 설정됨');
        console.log(user)
        // 마운트 될 때 수행작업
        return () => {
            console.log('유저값이 바뀌기전');
            console.log(user)
        }//return 은 언마운트 될 때 수행작업
    },[user]);
     */
    return(
        <div>
            <b style={{
                color: active? 'green' : 'black',
                cursor: 'pointer'
            }}
            onClick={()=> dispatch(
                {type: 'TOGGLE_USER',
                id}
            )}>{username}</b> <span>{email}</span>
            <button 
            onClick={()=> dispatch(
                {type: 'REMOVE_USER',
                id}
            )}>삭제</button>
        </div>
    )
       
})

function UserList({users})  {
    
    return (
        <div>
            {
            users.map(
                (user,index) => (
                <User 
                user={user} 
                key={user.id}
                />
                )
            )
            }
        </div>
    );
};

export default React.memo(UserList);