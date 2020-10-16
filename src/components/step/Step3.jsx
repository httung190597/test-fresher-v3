import { Button, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actDeleteFood, actSelectFood } from '../../actions/index';
import { data } from '../../data/dishes';
function Step3(props) {
    const dispatch = useDispatch();
    const meal = useSelector(state => state.orderFood.meal);
    const people = useSelector(state => state.orderFood.people);
    const restaurant = useSelector(state => state.orderFood.restaurant);
    const foods = useSelector(state => state.orderFood.foods);
    const [listFoods, setListFoods] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]) //foods
    const [selectedFood, setSelectedFood] = useState(null)
    const [selectedFoodCount, setSelectedFoodCount] = useState(null)

    useEffect(() => {
        var listFoods = getListFood();
        if (foods) {
            foods.map(food => {
                listFoods = listFoods.filter(item => item !== food.name);
            })
            setListFoods(listFoods)
            setSelectedFoods(foods)
        }
        else {
            setListFoods(listFoods)
        }
    }, [])
    if (!restaurant) {
        return <Redirect to="/order-food/step2" />
    }

    function getListFoodByRestaurant() {
        var result = [];
        data.dishes.map(value => {
            if (value.restaurant === restaurant) {
                result.push(value)
            }
        })

        return result
    }
    
    function getListFood() {
        var result = [];
        getListFoodByRestaurant().map(value => {
            var index = value.availableMeals.indexOf(meal);
            if (index !== -1) {
                result.push(value.name)
            }
        })
        return result;
    }

    function handleChangeFood(event) {
        setSelectedFood(event.target.value)
    }

    function handleChangeCountFood(event) {
        setSelectedFoodCount(event.target.value)
    }

    function addFood() {
        if (selectedFoodCount && selectedFood) {
            // this.props.selectFood(selectedFood,selectedFoodCount);
            var selectFood = actSelectFood(selectedFood, selectedFoodCount)
            dispatch(selectFood);
            if (selectedFoods == null) {
                selectedFoods = []
            }
            var food = {};
            food.name = selectedFood;
            food.count = selectedFoodCount;
            selectedFoods.push(food)
            var listFoodsNew = listFoods.filter(item => item !== selectedFood);
            setSelectedFoods(selectedFoods);
            setListFoods(listFoodsNew);
            setSelectedFood(null)
        }
        else {
            alert('chon thieu')
        }

    }

    function onDelete(food) {
        // this.props.deleteFood(food)
        var deleteFood = actDeleteFood(food)
        dispatch(deleteFood);
        var index = findFood(foods, food.name)
        selectedFoods.splice(index, 1);
        var listFoods = getListFood();
        foods.map(food => {
            listFoods = listFoods.filter(item => item !== food.name);
        })
        setSelectedFoods(selectedFoods);
        setListFoods(listFoods);
    }

    function findFood(foods, name) {
        var result = -1;
        foods.forEach((food, index) => {
            if (food.name === name) {
                result = index;
            }
        });
        return result;
    }

    function renderFoods(foods) {
        var result = null;
        if (foods.length > 0) {
            result = foods.map((food, key) => {
                return (
                    <TableRow key={key}>
                        <TableCell>{food.name}</TableCell>
                        <TableCell>{food.count}</TableCell>
                        <TableCell>
                            <IconButton onClick={() => onDelete(food)}>
                                <Icon color="error">x</Icon>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                );
            })
        }
        return result;
    }
    
    return (
        <div>
            <FormControl fullWidth={true} className="mt-16" style={{ width: "300px", marginLeft: "150px" }}>
                <InputLabel >{<span>Please select food</span>}</InputLabel>
                <Select
                    onChange={(event) => handleChangeFood(event)}
                >
                    {listFoods.map((item) => {
                        return (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl fullWidth={true} className="mt-16" style={{ width: "300px", marginLeft: "150px" }}>
                <InputLabel >{<span>Count of food</span>}</InputLabel>
                <Select
                    onChange={(event) => handleChangeCountFood(event)}
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
            <Button variant="contained" onClick={addFood} color="primary" style={{ marginTop: "10px", marginLeft: "50px" }}>Chose</Button>
            <Table className="crud-table" style={{ whiteSpace: "pre", width: "300px", marginLeft: "40%", marginTop: "30px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Food</TableCell>
                        <TableCell>Count</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderFoods(selectedFoods || [])}
                </TableBody>
            </Table>
        </div>
    );

}
export default Step3;