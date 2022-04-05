import React, { createContext, useContext } from 'react';

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
    return (
    <MyContext.Provider value="Good">
        <GrandParent text="Good"/>
    </MyContext.Provider>
    )
        
}

export default ContextSample;