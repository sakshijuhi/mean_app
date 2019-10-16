import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { signup , fetchRoles} from "../ApiUtil";

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      email: "",
      showAlert: false,
      msg: "",
      number:"",
      authorize: false,
      errors: {
        usernameError: "",
        emailError: "",
        passwordError: "",
        numberError:""
      }, 
      roles:[]
    };

    this.role = {name:"ROLE_USER"};

    this.handleChange = this.handleChange.bind(this);
    this.handleRoleChange= this.handleRoleChange.bind(this);
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

  handleRoleChange(e){
    this.role.name = e.target.value;
  }

  validate = () => {

    let isError = false;
    let tempError = this.state.errors;
    if ((this.state.username.length) == 0 || (this.state.username.length) < 5) {
      isError = true;
      tempError.usernameError = "Username need to be atleast 5 characters long";
    } else {
      tempError.usernameError = "";
    }

    if ((this.state.password.length) == 0) {
      isError = true;
      tempError.passwordError = "Password should not be empty";

    } else {
      tempError.passwordError = "";
    }

    // if ((this.state.mobileNumber.length) == 0) {
    //   isError = true;
    //   tempError.numberError = "Invalid Mobile Nmber";

    // } else {
    //   tempError.numberError = "";
    // }

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
      let local= this.state;
      local.role = this.role;
      signup(local)
        .then(response => {
          alert("User created. Please contact administrator to activate the account.");
          this.props.showLogin(true);
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
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
    fetchRoles()
    .then(response => {
      this.setState({ roles: response });
    })
    .catch(error => {});
  }

  render() {

    let roles = [];

    this.state.roles.forEach(r => {
      roles.push(<option value={r.name}>{r.name}</option>);
    });


    return (
      <div>
        {this.state.showAlert ? (
          <Alert color="primary">{this.state.msg}</Alert>
        ) : null}
        <div className="FormCenter AppFormLayout">
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
                id="mobile"
                placeholder="mobile no"
                onChange={this.handleChange}
              />
              <span style={{ color: "red" }}>{this.state.errors.numberError}</span>
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
                    name="role"
                    id="roles"
                    value={this.role.name}
                    onChange={this.handleRoleChange}
                  >
                   {roles}
                  </Input>
                </FormGroup>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUpForm);
