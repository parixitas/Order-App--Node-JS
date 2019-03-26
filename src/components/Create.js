import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confpassword: '',
      errors: {},
      apierror:''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password , confpassword} = this.state;

     if (this.validateForm()) {

         axios.post('/api/user', { username, password, confpassword})
      .then((result) => {
        if(result.data.code == 100){
          this.props.history.push("/show")
        }
        else
        {
          const state = this.state
        state["apierror"] = result.data.message;
          this.setState(state);
        }
      });

     }
  }

  validateForm() {
    //  let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!this.state.username) {
        formIsValid = false;
        errors["username"] = "*Please enter your username.";
      }

      if (typeof this.state.username !== "undefined") {
        if (!this.state.username.match(/^[a-zA-Z0-9 ]*$/)) {
          formIsValid = false;
          errors["username"] = "*Please enter alphanumeric characters only.";
        }
      }

      if (!this.state.password) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if (typeof this.state.password !== "undefined") {
        if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.( 8 char length with small & capital letters & numbers with special character.";
        }
      }

        if (!this.state.confpassword) {
        formIsValid = false;
        errors["confpassword"] = "*Please enter your confpassword.";
      }

      if (this.state.password != this.state.confpassword) {
        console.log(this.state.password +":"+this.state.confpassword)
         formIsValid = false;
        errors["confpassword"] = "*Password doesn't match.";
      }


      this.setState({
        errors: errors
      });
      return formIsValid;
    }




  render() {
    const { username, password , confpassword} = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
             Sign Up
            </h3>
          </div>
          <div class="panel-body">
          
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" name="username" value={username} onChange={this.onChange.bind(this)} placeholder="Username" />
                 <div className="errorMsg">{this.state.errors.username}</div>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" name="password" value={password} onChange={this.onChange.bind(this)} placeholder="Password" />
                 <div className="errorMsg">{this.state.errors.password}</div>
              </div>
              <div class="form-group">
                <label for="confpassword">Confirm Password:</label>
                <input type="password" class="form-control" name="confpassword" value={confpassword} onChange={this.onChange.bind(this)} placeholder="Confirm password"/>
                   <div className="errorMsg">{this.state.errors.confpassword}</div>
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
            <div className="errorMsg">{this.state.apierror}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
