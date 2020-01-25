import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import {Auth} from 'aws-amplify';
import '@fortawesome/fontawesome-free/css/all.css';
import './Login.css';
import tachyons from 'tachyons';

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  componentDidMount()
  {
    if(this.props.authProps.isAuthenticated)
    {
      this.props.history.push("/")
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    
    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    
    const {username,email,password} = this.state
    // try
    // {
    //     const user = await Auth.signIn(this.state.username,this.state.password)
    //     console.log(user)
    //     console.log(this.props)
     
    //     this.props.authProps.setAuthStatus(true)
    //     this.props.authProps.setUser(user)
    //     this.props.history.push("/")
    // }

    try {
      const user = await Auth.signIn(username, password);
      if (user.challengeName === 'SMS_MFA' ||
          user.challengeName === 'SOFTWARE_TOKEN_MFA') {
          // You need to get the code from the UI inputs
          // and then trigger the following function with a button click
          const code = eval(prompt("Enter OTP sent via SMS"))
          const mfaType = user.challengeName
          // If MFA is enabled, sign-in should be confirmed with the confirmation code
          const loggedUser = await Auth.confirmSignIn(
              user,   // Return object from Auth.signIn()
              code,   // Confirmation code  
              mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
          );
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          const {requiredAttributes} = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
          // You need to get the new password and required attributes from the UI inputs
          // and then trigger the following function with a button click
          // For example, the email and phone_number are required attributes
          // const {username, email, phone_number} = getInfoFromUserInput();
          const newPassword = prompt("Enter new password:")
          const loggedUser = await Auth.completeNewPassword(
              user,              // the Cognito User Object
              newPassword,       // the new password
              // OPTIONAL, the required attributes
              {
                  email,
              }
          );
      } else if (user.challengeName === 'MFA_SETUP') {
          // This happens when the MFA method is TOTP
          // The user needs to setup the TOTP before using it
          // More info please check the Enabling MFA part
          Auth.setupTOTP(user);
      } else {
          // The user directly signs in
          console.log(user);
      }
      
        this.props.authProps.setAuthStatus(true)
        this.props.authProps.setUser(user)
        const session = await Auth.currentSession();
       console.log(session)
        if(session.idToken.payload['cognito:groups'].includes("Admin"))
        {
            this.props.authProps.setRole("Admin")
        }
        else
        {
            this.props.authProps.setRole("Faculty")
        }
       
        this.props.history.push("/")
  }

    catch(error)
    {
        let err= null;
        !error.message? err={"message":error} : err = error
        this.setState({
          errors:{
            ...this.state.errors,
            cognito:err
          }
        })
    }

  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Log in</h1>

          <div className="row">
          <div className="col-md-push-1 col-md-4 hidden-sm hidden-xs">
            <img className="pull-right" src="https://cms.cb.amrita.edu/images/amrita_round_2019.png" style={{width:"44%", marginTop:"40px",pointerEvents: "none"}} alt="Amrita Vishwa Vidyapeetham Logo"/>
          </div>
          <div className="col-md-4 col-md-push-1">
           <h3><span className="weight-700">Digital Course File</span> | <span className="weight-300"> Login</span></h3>
           <FormErrors className="red blink" formerrors={this.state.errors} />
             <form  onSubmit={this.handleSubmit} style={{marginTop:"20px",padding:"40px"}} className="pa3 ma2" autoComplete="new-password">
                
                <div className="form-group">
                    <input type="text"  id="username"  value={this.state.username} onChange={this.onInputChange} className="form-control" name="username" placeholder="Enter your username" autoComplete="new-password"/>
                </div>
                <div className="form-group">
                    <input type="password" id="password"  value={this.state.password} onChange={this.onInputChange} className="form-control" name="password" placeholder="Enter your password" autoComplete="new-password" />
                </div>
                <div className="form-group">
                    <a href="/forgotpassword" className="text-muted" >Having trouble logging in ?</a>
                </div>
                <div>
                    <button type="submit" id="submitbutton" className="btn btn-primary">Login</button>
                    <button type="reset" id="resetbutton" className="btn btn-default" onClick={()=>{this.setState({username:"",password:""});this.clearErrorState()}}>Reset</button>
                </div>
            </form>
            </div>
            </div>          
          </div>
      </section>
    );
  }
}

export default LogIn;