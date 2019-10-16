import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { signin, getCurrentUser } from "../ApiUtil";

const txtFieldState = {
  value: "",
  valid: true,
  typeMismatch: false,
  errMsg: "" //this is where our error message gets across
};

const ErrorValidationLabel = ({ txtLbl }) => (
  <label htmlFor="" style={{ color: "red" }}>
    {txtLbl}
  </label>
);
class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errors: {
        usernameError: "",
        passwordError: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (this.state.username.length == 0 || this.state.username.length < 5) {
      isError = true;
      tempError.usernameError = "Username need to be atleast 5 characters lomg";
    } else {
      tempError.usernameError = "";
    }

    if (this.state.password.length == 0) {
      isError = true;
      tempError.passwordError = "password should not be empty";
    } else {
      tempError.passwordError = "";
    }

    if (isError) {
      this.setState({
        errors: tempError
      });
    }

    return isError;
  };

  handleSubmit(e) {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      signin(this.state)
        .then(response => {
          localStorage.setItem("accessToken", response.accessToken);

          getCurrentUser().then(response => {
            if (
              response.role.name === "ROLE_ADMIN" ||
              response.role.name === "ROLE_OPERATOR"
            ) {
              this.props.history.push("/users");
            } else {
              this.props.history.push("/registration/" + response.id);
            }
          });
        })
        .catch(error => {
          this.setState({
            username: "",
            password: ""
          });
          window.alert("Login failed");
        });
    }
  }

  render() {
    return (
      <div className="FormCenter PageContentPaddingDiv AppFormLayout ">
        <div className="create_account_form ">
          <h1> Sign In </h1>
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
              value={this.state.username}
            />
            <span style={{ color: "red" }}>
              {this.state.errors.usernameError}
            </span>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <span style={{ color: "red" }}>
              {this.state.errors.passwordError}
            </span>
          </FormGroup>

          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(SignInForm);
