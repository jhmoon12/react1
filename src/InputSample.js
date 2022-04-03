import React, { useState, useRef } from 'react';

const InputSample = () => {
    const [inputs, setInputs ] = useState({
        one: '',
        two: ''
    });
    const { one, two } = inputs;
    const nameInput = useRef()

   const  onChange = (e) => {
       const { name , value } = e.target;
        setInputs({
            ...inputs,
           [name] : value, //[키값] : value
        });
    };
    

   const reset = () => {
        setInputs({
            one: '',
            two: ''
        });
        nameInput.current.focus();
    };

    return (
        <div>
            <input type="text" name="one" onChange={onChange} value={one} ref={nameInput}/>
            <input type="text" name="two"onChange={onChange} value={two}/>
            <div>
            값 : {one} 닉네임 : {two} 
            </div>
            <button onClick={reset}>리셋</button>
        </div>
    );
};

export default InputSample;