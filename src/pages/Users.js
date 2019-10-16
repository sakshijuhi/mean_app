import React from "react";
import { Table, FormGroup, Label, Input, Button } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import {
  getCurrentUser,
  authorizeUser,
  unauthorizeUser,
  changeRole,
  fetchRoles,
  search
} from "../ApiUtil";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.authType = "all";
    this.searchText= "";
    this.state = {
      currentUser: null,
      users: [],
      roles: []
    };
    this.changeAuthType = this.changeAuthType.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);
  }

  changeAuthType(type) {
    this.authType = type;
    this.search();
  }

  search() {
    search(this.authType, this.searchText)
      .then(response => {
        this.setState({ users: response });
      })
      .catch(error => {});
  }

  authUser(auth, id) {
    if (auth) {
      authorizeUser(id).then(respnose => {
        this.changeAuthType(this.authType);
      });
    } else {
      unauthorizeUser(id).then(response => {
        this.changeAuthType(this.authType);
      });
    }
  }

  handleRoleChange(val, id) {
    changeRole(val, id)
      .then(response => {
        this.changeAuthType(this.authType);
      })
      .catch(error => {});
  }

  handleSearch(e){
    this.searchText=e.target.value;
    this.search();
  }

  componentDidMount() {
    //get current logged in user details
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response
        });
      })
      .catch(error => {});

    //get list of roles
    fetchRoles()
      .then(response => {
        this.setState({ roles: response });
      })
      .catch(error => {});

    this.search();
  }

  render() {
    if (this.state.currentUser === null) return null;

    let isAdmin = false;
    let isUser = false;
    let isOperator = false;

    if (this.state.currentUser.role.name === "ROLE_ADMIN") {
      isAdmin = true;
    } else if (this.state.currentUser.role.name === "ROLE_OPERATOR") {
      isOperator = true;
    } else {
      isUser = true;
    }

    if (isUser) return null;

    let rows = [];
    let roles = [];

    this.state.roles.forEach(r => {
      roles.push(<option value={r.name}>{r.name}</option>);
    });

    this.state.users.forEach(u => {
      rows.push(
        <tr>
          <td>{u.username}</td>
          <td>{u.email}</td>
          <td>{u.number}</td>
          {isAdmin ? (
            <td>
              {u.authorize ? (
                <Button
                  size="sm"
                  className="width-100px"
                  onClick={event => this.authUser(false, u.id)}
                >
                  Unauthorize
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="width-100px"
                  onClick={event => this.authUser(true, u.id)}
                >
                  Authorize
                </Button>
              )}
            </td>
          ) : null}
          <td>
            <Link to={"/registration/" + u.id}>View</Link>
          </td>

          {isAdmin ? (
            <td>
              <Input
                type="select"
                name="roles"
                id="roles"
                value={u.role.name}
                onChange={event =>
                  this.handleRoleChange(event.target.value, u.id)
                }
              >
                {roles}
              </Input>
            </td>
          ) : null}
        </tr>
      );
    });

    return (
      <div>
        <Dashboard />
        <div className="AppForm tab-content tab-content-bdr DashboardContainer">
         
          <FormGroup className="dropdown">
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={event => {
                this.changeAuthType(event.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="auth">Authorized</option>
              <option value="unauth">Un-Authorized</option>
            </Input>
          </FormGroup>
          
          <div className="width-500px margin-bottom-20px">
            <Input type="search" 
            name="search"
            id="search"
            placeholder="search by username or email"
            onChange={this.handleSearch}
            ></Input>
          </div>
          <Table>
            <thead className="test">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                {isAdmin ? <th>Login</th> : null}
                <th>Profile</th>
                {isAdmin ? <th>Role</th> : null}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default withRouter(Users);
