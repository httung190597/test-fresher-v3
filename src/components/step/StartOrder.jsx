import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actSelectName } from '../../actions/index';
function StartOrder(props){
    const [inputValue,setInputValue] = useState('');
    const name = useSelector(state => state.orderFood.name);
    const dispatch = useDispatch();
    useEffect(() =>{
        if(name){
            setInputValue(name)
        }
    },[])
    useEffect(()=>{
        console.log('useEffect2')
        return () =>{
            const selectName = actSelectName(inputValue);
            dispatch(selectName);
        }
    },[inputValue])
    function handleChange(event){
        var value = event.target.value;
        setInputValue(value);
    }
    return(
        <div>
            <TextField value={inputValue || ''} id="standard-basic" label="Name" style={{marginLeft:"300px", width:"300px"}} onChange={(event) => handleChange(event) }/>
        </div>
    );
    
}
export default StartOrder;