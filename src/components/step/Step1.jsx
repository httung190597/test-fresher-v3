
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actSelectMeal, actSelectPeople } from '../../actions/index';
const Meals = ['breakfast','lunch','dinner']
function Step1 (props) {
    const name = useSelector(state => state.orderFood.name);
    const meal = useSelector(state => state.orderFood.meal);
    const people = useSelector(state => state.orderFood.people);
    const dispatch = useDispatch()
    if(!name){
        return <Redirect to="/order-food"/>    
    }
    function handleChangeMeal(event){
        const selectMeal = actSelectMeal(event.target.value);
        dispatch(selectMeal);
    }

    function handleChangePeople(event){
        const selectPeople = actSelectPeople(event.target.value);
        dispatch(selectPeople)
    }

    return(
        <div>
            <FormControl fullWidth={true}  className="mt-16" style = {{width:"300px", marginLeft:"50px"}}>
                <InputLabel >{<span>Please select a meal</span>}</InputLabel>
                <Select
                    // value={this.state? this.state.meal : ''}
                    defaultValue={meal ? meal : ''}
                    onChange={(event) => handleChangeMeal(event)}
                >
                    {Meals.map((item) => {
                        return (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl> 
            <FormControl fullWidth={true}  className="mt-16" style = {{width:"300px", marginLeft:"150px"}}>
                <InputLabel >{<span>Please enter number of people</span>}</InputLabel>
                <Select
                    defaultValue={people ? people : ''}
                    onChange={(event) => handleChangePeople(event)}
                >
                    {(() => {
                        const options = [];

                        for (let i = 1; i <= 10; i++) {
                            options.push(
                                <MenuItem key={i} value={i}>
                                    {i}
                                </MenuItem>
                            );
                        }

                        return options;
                    })()}
                </Select>
            </FormControl> 
        </div>
    );
}

export default Step1;