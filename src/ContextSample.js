import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext('defaultvalue')
;
function Child () {
    const text = useContext(MyContext);
    return (
        <div>
            안녕하세요? {text}
        </div>
    );
};

function Parent () {
    return <Child />
} 

function GrandParent() {
    return <Parent />
}

function ContextSample () {
    const [ text, setText ] = useState(true);
    return (
    <MyContext.Provider value={ text ? "Good" : "Bad" }>
        <GrandParent text="Good"/>
        <button onClick={()=> setText(!text)}>버튼</button>
    </MyContext.Provider>
    )
        
}

export default ContextSample;