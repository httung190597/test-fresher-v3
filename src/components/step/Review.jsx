import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
function Review(props){
    const name = useSelector(state => state.orderFood.name);
    const meal = useSelector(state => state.orderFood.meal);
    const people = useSelector(state => state.orderFood.people);
    const restaurant = useSelector(state => state.orderFood.restaurant);
    const foods = useSelector(state => state.orderFood.foods);
    if(!foods){
        return <Redirect to="/order-food/step3"/>
    }
    function renderFoods(foods){
        var result = null;
        if(foods.length > 0){
            result = foods.map((food,key)=>{
                return(
                    <TableRow key={key}>
                        <TableCell>{food.name}</TableCell>
                        <TableCell>{food.count}</TableCell>
                    </TableRow>
                );
            })
        }
        return result;
    }

    return(
        <div style={{marginLeft:"300px"}}>
            <p>Name : {name}</p>
            <p>Meal : {meal}</p>
            <p>People : {people}</p>
            <p>Restaurant : {restaurant}</p>
            <p>Dishes : </p>
            <Table className="crud-table" style={{ whiteSpace: "pre", width:"300px", marginLeft:"100px"}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Food</TableCell>
                        <TableCell>Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderFoods(foods)}
                </TableBody>
            </Table>
        </div>
    );
    
}
// const mapStateToProps = state =>{
//     return{
//         name:state.orderFood.name,
//         people: state.orderFood.people,
//         meal: state.orderFood.meal, 
//         restaurant: state.orderFood.restaurant,
//         foods: state.orderFood.foods
//     }
// };

// const mapDispatchToProps = dispatch =>{
//     return {


//     }
// }
export default Review;