import * as Types from './../constants/index';
var data = JSON.parse(sessionStorage.getItem('data'));
var initialState = data || {};
var findFood = (foods, name) => {
    var result = -1;
    foods.forEach((food, index) => {
        if (food.name === name) {
            result = index;
        }
    });
    return result;
}
const orderFood = (state = initialState, action) => {
    switch (action.type) {
        case Types.SELECT_MEAL: {
            state.meal = action.meal;
            state.restaurant = '';
            state.foods = null;
            sessionStorage.setItem('data', JSON.stringify(state));
            return {
                ...state
            }
        }
        case Types.SELECT_PEOPLE: {
            state.people = action.people;
            state.foods = null;
            sessionStorage.setItem('data', JSON.stringify(state));
            return {
                ...state
            }
        }
        case Types.SELECT_RESTAURANT: {
            state.restaurant = action.restaurant;
            state.foods = null;
            sessionStorage.setItem('data', JSON.stringify(state));
            return {
                ...state
            }
        }
        case Types.SELECT_FOOD: {
            var foods = state.foods;
            if (foods == null) {
                foods = []
            }
            foods.push(action.food)
            state.foods = foods;
            sessionStorage.setItem('data', JSON.stringify(state));
            return {
                ...state,
                foods: [...foods]
            }
        }
        case Types.RESET_VALUE: {
            state = {};
            sessionStorage.setItem('data', JSON.stringify(state));
            return {
                ...state
            }
        }
        case Types.DELETE_FOOD: {
            var index = findFood(state.foods, action.food.name)
            console.log(index);
            var foods = state.foods
            foods.splice(index, 1);
            sessionStorage.setItem('data', JSON.stringify(state));
            return {
                ...state,
                foods:[...foods]
            }
        }
        case Types.SELECT_NAME: {
            console.log(action)
            state.name = action.name;
            sessionStorage.setItem('data', JSON.stringify(state));
            return {
                ...state
            }
        }
        default:
            return state;
    }
}
export default orderFood;
