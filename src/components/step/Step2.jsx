import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actSelectRestaurant } from '../../actions/index';
import { data } from '../../data/dishes';
function Step2(props){
    const dispatch = useDispatch();
    const meal = useSelector(state => state.orderFood.meal);
    const people = useSelector(state => state.orderFood.people);
    const restaurant = useSelector(state => state.orderFood.restaurant);
    if(!meal || !people){
        return <Redirect to="/order-food/step1"/>
    }
    function getListRestaurant(){
        var result =[]
        getListRestaurantByMeal().map(value =>{
            var index = result.indexOf(value.restaurant)
            if(index === -1){
                result.push(value.restaurant);
            }  
        })
        return result
    }
    function getListRestaurantByMeal(){
        var result = [];
        data.dishes.map(value =>{
            var index = value.availableMeals.indexOf(meal);
            if(index !== -1){
                result.push(value)
            }
        })
        return result;
    }
    function handleChangeRestaurant(event){
        // this.props.selectRestaurant(event.target.value);
        var selectRestaurant = actSelectRestaurant(event.target.value)
        dispatch(selectRestaurant)
    }
  
    return(
        <FormControl fullWidth={true}  className="mt-16" style = {{width:"300px", marginLeft:"150px"}}>
            <InputLabel >{<span>Please select a restaurant</span>}</InputLabel>
            <Select
                // value={this.state? this.state.restaurant : ''}
                defaultValue={restaurant ? restaurant : ''}
                onChange={(event) => handleChangeRestaurant(event)}
            >
                {getListRestaurant().map((item) => {
                    return (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl> 
    );
    
}
export default Step2;