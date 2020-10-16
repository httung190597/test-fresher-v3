import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { actResetValue } from '../actions/index';
import NotFound from './NotFound';
import Review from './step/Review';
import StartOrder from './step/StartOrder';
import Step1 from './step/Step1';
import Step2 from './step/Step2';
import Step3 from './step/Step3';
const steps = ['Start Order', 'Step 1', 'Step 2', 'Step 3', 'Review'];

function OrderFood(props) {
  const dispatch = useDispatch();
  // const name = useSelector(state => state.orderFood.name);
  const meal = useSelector(state => state.orderFood.meal);
  const people = useSelector(state => state.orderFood.people);
  const restaurant = useSelector(state => state.orderFood.restaurant);
  const foods = useSelector(state => state.orderFood.foods);
  const routers = [
    {
      path: `${props.match.url}`,
      exact: true,
      main: () => <StartOrder />
    },
    {
      path: `${props.match.url}/step1`,
      exact: false,
      main: () => <Step1 />
    },
    {
      path: `${props.match.url}/step2`,
      exact: false,
      main: () => <Step2 />
    },
    {
      path: `${props.match.url}/step3`,
      exact: false,
      main: () => <Step3 />
    },
    {
      path: `${props.match.url}/review`,
      exact: false,
      main: () => <Review />
    },
    {
      path: `${props.match.url}`,
      exact: false,
      main: () => <NotFound />
    }
  ]
  function handleBack() {
    var { history, match } = props;
    history.goBack();
  }
  function handleNext() {
    if (checkData() === 1) {

      var { history, match, location } = props;
      var stepUrl = '';
      if (location.pathname === `${match.url}`) {
        stepUrl = '/step1'
      }
      else if (location.pathname === `${match.url}/step1`) {
        stepUrl = '/step2'
      }
      else if (location.pathname === `${match.url}/step2`) {
        stepUrl = '/step3'
      }
      else if (location.pathname === `${match.url}/step3`) {
        stepUrl = '/review'
      }
      history.push(`${match.url}${stepUrl}`)
    }
    else if (checkData() === 0) {
      alert('chua nhap du');
    }
    else if (checkData() === 2) {
      alert('chua du suat');
    }

  }
  function handleReset() {
    var resetValue = actResetValue();
    dispatch(resetValue);
    var { history, match } = props;
    history.push(`${match.url}`)
  }
  function checkData() {
    var { history, match, location } = props;
    var result = 1;
    if (location.pathname === `${match.url}/step1`) {
      if (!people || !meal) {
        result = 0;
      }
      else {
        result = 1;
      }
    }
    // else if(location.pathname === `${match.url}`){
    //   if(!name){
    //     result = 0;
    //   }
    //   else{
    //     result = 1;
    //   }
    // }
    else if (location.pathname === `${match.url}/step2`) {
      if (!restaurant) {
        result = 0;
      }
      else {
        result = 1;
      }
    }
    else if (location.pathname === `${match.url}/step3`) {
      if (!foods) {
        result = 0;
      }
      else {
        var value = null
        foods.map(food => {
          value = value + food.count
        })
        if (value < people) {
          result = 2
        }
        else {
          result = 1;
        }
      }
    }
    return result;
  }

  function showStep(routes) {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return result;
  }
  function checkActiveStep() {
    var activeStep = 0
    var { history, match, location } = props;
    if (location.pathname === `${match.url}`) {
      activeStep = 0
    }
    else if (location.pathname === `${match.url}/step1`) {
      activeStep = 1
    }
    else if (location.pathname === `${match.url}/step2`) {
      activeStep = 2
    }
    else if (location.pathname === `${match.url}/step3`) {
      activeStep = 3
    }
    else if (location.pathname === `${match.url}/review`) {
      activeStep = 4
    }
    // console.log('ssssss')
    return activeStep;
  }
  return (
    <div className="App">
      <Stepper activeStep={checkActiveStep()} alternativeLabel>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Switch>
        {showStep(routers)}
      </Switch>

      <div style={{ marginTop: "30px" }}>
        {checkActiveStep() === steps.length - 1 ? (
          <div>
            <Button variant="contained" onClick={() => handleReset()} color="default" style={{ marginLeft: "50px" }}>Finish</Button>
          </div>
        ) : (
            <div>
              <div>
                <Button
                  disabled={checkActiveStep() === 0}
                  onClick={() => handleBack()}
                  style={{ marginLeft: "50px" }}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleNext()} style={{ float: "right", marginRight: "50px" }}>
                    Next
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );

}

export default OrderFood;
