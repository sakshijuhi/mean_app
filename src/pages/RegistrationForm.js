import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { udpateDetails, getDetails } from "../ApiUtil";
import { tsObjectKeyword } from "@babel/types";
import Dashboard from "./Dashboard";

class RegistrationForm extends Component {
  constructor() {
    super();

    this.userid = null;

    this.state = {
      id: "",
      userid: "",
      firstname: "",
      middlename: "",
      lastname: "",
      gender: "",
      dob: "",
      age: "",
      flatno: "",
      society: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      phone1: "",
      phone2: "",
      pdisable: "",
      maritalstatus: "",
      education: "",
      readOnly: false,
      errors: {
        firstnameError: "",
        lastnameError: "",
        dobError: "",
        cityError: "",
        pincodeError: "",
        phone2Error: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    let temp = this.state;
    temp[name] = value;
    this.setState(temp);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.validate()) {
      return;
    }

    if (this.state.userid !== "") {
      udpateDetails(this.state)
        .then(response => {
          getDetails(response.userid)
            .then(response1 => {
              this.setState(response1);
              this.setState({ readOnly: true });
            })
            .catch(error => {
              window.alert("error in getting details");
            });
        })
        .catch(error => {
          window.alert("cannot save data");
        });
    } else {
      window.alert("cannot save data");
    }
  }

  validate = () => {
    let isError = false;
    let tempError = this.state.errors;
    if (this.state.firstname.length == 0 || this.state.firstname.length < 5) {
      isError = true;
      tempError.firstnameError =
        "Firstname need to be atleast 5 characters long";
    } else {
      tempError.firstnameError = "";
    }

    if (this.state.lastname.length == 0 ) {
      isError = true;
      tempError.lastnameError = "Please Enter valid last name";
    } else {
      tempError.lastnameError = "";
    }

    // if ((this.state.dob.) {
    //   isError = true;
    //   tempError.dobError = "Please input correct dob";
    // } else {
    //   tempError.dobError = "";
    // }
    if (this.state.city.length == 0) {
      isError = true;
      tempError.cityError = "Must Enter City";
    } else {
      tempError.cityError = "";
    }

    if (this.state.pincode.length == 0) {
      isError = true;
      tempError.pincodeError = "Must Enter valid Pincode";
    } else {
      tempError.pincodeError = "";
    }

    if (this.state.phone2.length == 0) {
      isError = true;
      tempError.phone2Error = "Mobile Number is Mandatory";
    } else {
      tempError.phone2Error = "";
    }
    if (isError) {
      this.setState({
        errors: tempError
      });
    }

    return !isError;
  };

  componentDidMount() {
    getDetails(this.props.match.params.userid)
      .then(response => {
        this.setState(response);
        this.setState({
          userid: this.props.match.params.userid
        });
      })
      .catch(error => {
        this.setState({
          userid: this.props.match.params.userid
        });
      });
  }

  render() {
    return (
      <div>
        {" "}
        <Dashboard/>
        <div className="AppForm ">
          <div className="FormCenter width-70pct AppFormLayout">
            <h1>User Details</h1>
            {this.state.readOnly ? (
              <Button
                onClick={event => {
                  this.setState({ readOnly: false });
                }}
              >
                {" "}
                Edit{" "}
              </Button>
            ) : null}
            <Form>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="firstname">First Name</Label>
                    <Input
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="First Name"
                      value={this.state.firstname}
                      onChange={this.handleChange}
                      disabled={this.state.readOnly}
                    />
                    <span style={{ color: "red" }}>
                      {this.state.errors.firstnameError}
                    </span>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="middlename">Middle Name</Label>
                    <Input
                      type="text"
                      name="middlename"
                      id="middlename"
                      placeholder="Middle Name"
                      value={this.state.middlename}
                      onChange={this.handleChange}
                      disabled={this.state.readOnly}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="lastname">Last Name</Label>
                    <Input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Last Name"
                      value={this.state.lastname}
                      onChange={this.handleChange}
                      disabled={this.state.readOnly}
                    />
                    <span style={{ color: "red" }}>
                      {this.state.errors.lastnameError}
                    </span>
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <div>
                  <Label>Gender</Label>
                </div>
                <Label
                  for="female"
                  className="margin-right-10px cursor-pointer"
                >
                  Female
                </Label>
                <Input
                  name="gender"
                  className="margin-right-10px"
                  addon
                  type="radio"
                  id="female"
                  value="female"
                  onChange={this.handleChange}
                  checked={this.state.gender === "female" ? true : false}
                  disabled={this.state.readOnly}
                />
                <Label for="male" className="margin-right-10px cursor-pointer">
                  Male
                </Label>
                <Input
                  name="gender"
                  className="margin-right-10px"
                  addon
                  type="radio"
                  id="male"
                  value="male"
                  onChange={this.handleChange}
                  checked={this.state.gender === "male" ? true : false}
                  disabled={this.state.readOnly}
                />
                <Label for="other" className="margin-right-10px cursor-pointer">
                  Other
                </Label>
                <Input
                  name="gender"
                  className="margin-right-10px"
                  addon
                  type="radio"
                  id="other"
                  value="other"
                  onChange={this.handleChange}
                  checked={this.state.gender === "other" ? true : false}
                  disabled={this.state.readOnly}
                />
              </FormGroup>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label> Date of Birth</Label>
                    <Input
                      name="dob"
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.dob ? this.state.dob.substr(0, 10) : ""}
                      disabled={this.state.readOnly}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <Label for="age"> Age</Label>
                    <Input
                      name="age"
                      type="text"
                      id="age"
                      onChange={this.handleChange}
                      value={this.state.age}
                      disabled={this.state.readOnly}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="flatno">Flat No.</Label>
                    <Input
                      type="text"
                      name="flatno"
                      id="flatno"
                      placeholder="Flat No. / Building No."
                      onChange={this.handleChange}
                      value={this.state.flatno}
                      disabled={this.state.readOnly}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="society">Society</Label>
                    <Input
                      type="text"
                      name="society"
                      id="society"
                      placeholder="Society"
                      onChange={this.handleChange}
                      value={this.state.society}
                      disabled={this.state.readOnly}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="street">Street</Label>
                    <Input
                      type="text"
                      name="street"
                      id="street"
                      placeholder="Street"
                      onChange={this.handleChange}
                      value={this.state.street}
                      disabled={this.state.readOnly}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      onChange={this.handleChange}
                      value={this.state.city}
                      disabled={this.state.readOnly}
                    />
                    <span style={{ color: "red" }}>
                      {this.state.errors.cityError}
                    </span>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="State"
                      onChange={this.handleChange}
                      value={this.state.state}
                      disabled={this.state.readOnly}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="pincode">Pincode</Label>
                    <Input
                      type="text"
                      name="pincode"
                      id="pincode"
                      placeholder="Pincode"
                      onChange={this.handleChange}
                      value={this.state.pincode}
                      disabled={this.state.readOnly}
                    />
                    <span style={{ color: "red" }}>
                      {this.state.errors.pincodeError}
                    </span>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="phone1">Phone Number</Label>
                    <Input
                      type="text"
                      name="phone1"
                      id="phone1"
                      placeholder="Phone Number"
                      onChange={this.handleChange}
                      value={this.state.phone1}
                      disabled={this.state.readOnly}
                    />
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <FormGroup>
                    <Label for="phone2">Mobile Number</Label>
                    <Input
                      type="text"
                      name="phone2"
                      id="phone2"
                      placeholder="Mobile Number"
                      onChange={this.handleChange}
                      value={this.state.phone2}
                      disabled={this.state.readOnly}
                    />
                    <span style={{ color: "red" }}>
                      {this.state.errors.phone2Error}
                    </span>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <FormGroup>
                    <Label for="pdisable">Physical Disability</Label>
                    <Input
                      type="text"
                      name="pdisable"
                      id="pdisable"
                      placeholder="Physical Disability if any"
                      onChange={this.handleChange}
                      value={this.state.pdisable}
                      disabled={this.state.readOnly}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label className="FormFieldLabel" for="maritalStatus">
                      Marital Status
                    </Label>
                    <Input
                      type="select"
                      name="maritalstatus"
                      id="maritalStatus"
                      onChange={this.handleChange}
                      value={this.state.maritalstatus}
                      disabled={this.state.readOnly}
                    >
                      <option value="">--Select--</option>
                      <option value="married">Married</option>
                      <option value="unmarried">Unmarried</option>
                      <option value="divorced">Divorced</option>
                      <option value="widow">Widow</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label className="FormFieldLabel" for="edustatus">
                      Education Status
                    </Label>
                    <Input
                      type="select"
                      name="education"
                      id="edustatus"
                      onChange={this.handleChange}
                      value={this.state.education}
                      disabled={this.state.readOnly}
                    >
                      <option value="">--Select--</option>
                      <option value="masters">Masters</option>
                      <option value="phd">Phd</option>
                      <option value="graduate">Graduate</option>
                      <option value="undergrad">Under-Graduate</option>
                      <option value="hsc">HSC</option>
                      <option value="ssc">SSC</option>
                      <option value="illiterate">Illiterate</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              {!this.state.readOnly ? (
                <Button onClick={this.handleSubmit}>Submit</Button>
              ) : null}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegistrationForm);
