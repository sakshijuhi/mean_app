import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { signup } from "../ApiUtil";
import Dashboard from './Dashboard';

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      number:"",
      showAlert: false,
      msg: "",
      authorize: false,
      errors: {
        usernameError: "",
        emailError: "",
        passwordError: ""
      },
      userId:0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  validate = () => {

    let isError = false;
    let tempError = this.state.errors;
    if ((this.state.username.length) === 0 || (this.state.username.length) < 5) {
      isError = true;
      tempError.usernameError = "Username need to be atleast 5 characters lomg";
    } else {
      tempError.usernameError = "";
    }

    if ((this.state.password.length) === 0) {
      isError = true;
      tempError.passwordError = "Password should not be empty";

    } else {
      tempError.passwordError = "";
    }

    if ((this.state.email.indexOf("@")) === -1) {
      isError = true;
      tempError.emailError = "Email is not valid";

    } else {
      tempError.emailError = "";
    }


    if (isError) {
      this.setState({
        errors: tempError
      });
    }

    return isError;
  }

  handleSubmit(e) {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      signup(this.state)
        .then(response => {
          this.props.history.push("/registration/"+response.id);
        })
        .catch(error => { });
    }
  }

  handleAlert(message) {
    this.setState({ showAlert: true, msg: message }, () => {
      window.setTimeout(() => {
        this.setState({ showAlert: false, msg: "" });
      }, 2000);
    });
  }

  componentDidMount(){
    this.setState({
      userId:  this.props.match.params.userid
    })  
}

  render() {
    return (
        <div> <Dashboard/>
      <div >
        {this.state.showAlert ? (
          <Alert color="primary">{this.state.msg}</Alert>
        ) : null}
        <div className="FormCenter">
          <div className="create_account_form">
            <h1> Create Account </h1>
          </div>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                onChange={this.handleChange}
              />
              <span style={{ color: "red" }}>{this.state.errors.usernameError}</span>
            </FormGroup>
            <FormGroup>
              <Label for="mobile">Mobile</Label>
              <Input
                type="text"
                name="number"
                id="number"
                placeholder="mobile no"
                onChange={this.handleChange}
              />
              <span style={{ color: "red" }}>{this.state.errors.usernameError}</span>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={this.handleChange}
              />
              <span style={{ color: "red" }}>{this.state.errors.emailError}</span>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={this.handleChange}
              />
              <span style={{ color: "red" }}>{this.state.errors.passwordError}</span>
            </FormGroup>
            <FormGroup>
                  <Label className="FormFieldLabel" for="roles">
                    Roles
                  </Label>
                  <Input
                    type="select"
                    name="roles"
                    id="roles"
                    onChange={this.handleChange}
                    value={this.state.roles}
                  >
                    <option value="">--Select--</option>
                    <option value="adminsitrator">Administrator</option>
                    <option value="operator">Operator</option>
                    <option value="accessuser">Accessuser</option>
                   
                  </Input>
                </FormGroup>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Form>
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(CreateUser);
