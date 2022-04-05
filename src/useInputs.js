import { useState, useCallback, useReducer } from "react";

function reducer (state, action) {
    switch(action.type){
        case "CHANGE" : {
            return {
                ...state, 
                [action.name] : action.value
            }
        };
        case "RESET" : {
            return Object.keys(state).reduce((acc, current) => {
                acc[current] = '';
                return acc;
              }, {});
        };//이부분은 진짜 진짜 모르겠음 ㅜㅜ
        default : 
            return state;
    };
} ;

function useInputs(initialForm) {
   // const [ form, setForm ] = useState(initialForm);
    const [ form, dispatch ] = useReducer( reducer, initialForm );
    /* const onChange = useCallback(e => {
        const { name, value } = e.target;
        setForm(form => ({...form, [name]: value }));
    }, []); */
    const onChange = useCallback(e => {
        const { name, value } = e.target;
        dispatch({ type: "CHANGE", name, value });
    }, []);
    //const reset = useCallback(() => setForm(initialForm), [initialForm])
    const reset = useCallback(() => dispatch({ type: "RESET" }), [])
    return [form, onChange, reset];
};

export default useInputs;