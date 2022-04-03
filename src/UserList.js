import React,{ useEffect } from 'react';

function User({user, onRemove, onToggle}){
    const { username, email, id, active }= user;//구조분해할당
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
            onClick={()=>onToggle(id)}>{username}</b> <span>{email}</span>
            <button 
            onClick={()=>{
                onRemove(id)
            }}>삭제</button>
        </div>
    )
       
}

function UserList({users, onRemove, onToggle})  {
    
    return (
        <div>
            {
            users.map(
                (user,index) => (
                <User 
                user={user} 
                key={user.id}
                onRemove={onRemove}
                onToggle={onToggle}
                />
                )
            )
            }
        </div>
    );
};

export default UserList;