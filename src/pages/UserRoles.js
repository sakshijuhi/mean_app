import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Table } from "reactstrap";
import { fetchRoles, createRole } from "../ApiUtil";
import { withRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

class UserRoles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roleName: "",
      roleList: [],
      userId:0
    };

    this.getRoles = this.getRoles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      name: value
    });
  }

  handleSubmit(e) {
    createRole(this.state)
      .then(response => {
        this.getRoles();
      })
      .catch(error => {});
  }

  componentDidMount() {
    this.getRoles();
  }

  getRoles() {
    fetchRoles()
      .then(response => {
        this.setState({ name: "", roleList: response });
      })
      .catch(error => {});
  }

  render() {
    let rows = [];
    this.state.roleList.forEach(r => {
      rows.push(
        <tr>
          <td>{r.id}</td>
          <td>{r.name}</td>
        </tr>
      );
    });

    return (
      <div>
        <Dashboard/>
        <div className="AppForm">
          <div className="width-200px">
            <Form>
              <FormGroup>
                <h3>Create Role</h3>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Role Name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </FormGroup>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>
          </div>
          <div className="margin-top-20px">
            <h3> List of Roles available</h3>
            <Table>
              <thead className="test">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserRoles);
