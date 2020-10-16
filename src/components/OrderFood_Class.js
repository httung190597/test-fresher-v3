import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { actResetValue } from '../actions/index';
import Review from './step/Review';
import StartOrder from './step/StartOrder';
import Step1 from './step/Step1';
import Step2 from './step/Step2';
import Step3 from './step/Step3';
import NotFound from './NotFound'
const steps = ['Start Order','Step 1','Step 2','Step 3','Review'];

class OrderFood extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeStep: 0 
    };

  }
  handleBack = () =>{
    var {history,match} = this.props;
    history.goBack();
  }
  handleNext = () =>{
    if(this.checkData() === 1){

      var {history,match,location} = this.props;
      var stepUrl = '';
      if(location.pathname === `${match.url}`){
        stepUrl = '/step1'
      }
      else if(location.pathname === `${match.url}/step1`){
        stepUrl = '/step2'
      }
      else if(location.pathname === `${match.url}/step2`){
        stepUrl = '/step3'
      }
      else if(location.pathname === `${match.url}/step3`){
        stepUrl = '/review'
      }
      history.push(`${match.url}${stepUrl}`)
    }
    else if(this.checkData() === 0){
      alert('chua nhap du');
    }
    else if(this.checkData() === 2){
      alert('chua du suat');
    }

  }
  handleReset = ()=>{
    this.props.resetValue();
    var {history,match} = this.props;
    history.push(`${match.url}`)
  }
  checkData = () =>{

    var {people,meal,restaurant,foods,name} = this.props;
    var {history,match,location} = this.props;
    var result = 1;
    if(location.pathname === `${match.url}/step1`){
      if(!people || ! meal){
        result = 0;
      }
      else{
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
    else if(location.pathname === `${match.url}/step2`){
      if(!restaurant){
        result = 0;
      }
      else{
        result = 1;
      }
    }
    else if(location.pathname === `${match.url}/step3`){
      if(!foods){
        result = 0;
      }
      else{
        var value = null
        foods.map(food =>{
          value = value + food.count
        })
        if(value < people){
          result = 2
        }
        else{
          result = 1;
        }
      }
    }
    return result;
  }
  // checkStep(){
  //   var {activeStep} = this.state;

  //   switch(activeStep){
  //     case 0:
  //       return (<StartOrder/>);
  //     case 1:
  //       return (<Step1/>);
  //     case 2:
  //       return (<Step2/>);
  //     case 3:
  //       return (<Step3/>);
  //     case 4:
  //       return (<Review/>);
  //   }
  // }

  // setUrl(){
  //   var {activeStep} = this.state;
  //   var {match} = this.props;
  //   var url = match.url;
  //   switch(activeStep){
  //     case 10:
  //       return `${url}`;
  //     case 0:
  //       return `${url}/step1`;
  //     case 1:
  //       return `${url}/step2`;
  //     case 2:
  //       return `${url}/step3`;
  //     case 3:
  //       return `${url}/review`;
  //   }
  // }
  showStep = (routes) => {
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

  render() {
    var {activeStep} = this.state;
    var {history,match,location}=this.props;
    var url = match.url;
    const routers =[
      {
        path: `${url}`,
        exact: true,
        main: () => <StartOrder />
      },
      {
        path: `${url}/step1`,
        exact: false,
        main: () => <Step1/>
      },
      {
        path: `${url}/step2`,
        exact: false,
        main: () => <Step2/>
      },
      {
        path: `${url}/step3`,
        exact: false,
        main: () => <Step3/>
      },
      {
        path: `${url}/review`,
        exact: false,
        main: () => <Review/>
      },
      {
        path: `${url}`,
        exact: false,
        main: () => <NotFound/>
      }
    ]
    if(location.pathname === `${match.url}`){
      activeStep = 0
    }
    else if(location.pathname === `${match.url}/step1`){
      activeStep = 1
    }
    else if(location.pathname === `${match.url}/step2`){
      activeStep = 2
    }
    else if(location.pathname === `${match.url}/step3`){
      activeStep = 3
    }
    else if(location.pathname === `${match.url}/review`){
      activeStep = 4
    }
    console.log('ssssss')
    return (
      <div className="App">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* {this.checkStep()} */}
        <Switch>
          {this.showStep(routers)}
        </Switch>
      
        <div style={{marginTop:"30px"}}>
          {activeStep === steps.length - 1 ? (
            <div>
              <Button variant="contained" onClick={this.handleReset} color="default" style={{marginLeft:"50px"}}>Finish</Button>
            </div>
          ) : (
            <div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  style={{marginLeft:"50px"}}
                >
                  {/* <Link to={this.setUrl()}>Back</Link> */}
                  Back
                </Button>
                <Button disabled={this.state.isDisable} variant="contained" color="primary" onClick={this.handleNext} style={{float:"right", marginRight:"50px"}}>
                  {/* <Link to={this.setUrl()}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Link> */}
                    Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
     name: state.orderFood.name,
      people: state.orderFood.people,
      meal: state.orderFood.meal, 
      restaurant: state.orderFood.restaurant,
      foods: state.orderFood.foods
  }
};

const mapDispatchToProps = dispatch =>{
  return {
    resetValue: () => {
      dispatch(actResetValue())
    },

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderFood);
