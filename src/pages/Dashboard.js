import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from "../ApiUtil";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem("accessToken");
    this.props.history.push("/");
  }

  componentDidMount() {
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response
        });
      })
      .catch(error => {});
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

    return (
      <div className = "TopBarLogoContainer">
        <div className="width-500px float-left">
          <Nav>
            {isAdmin ? (
              <NavItem>
                <NavLink href={"/roles"}>Roles</NavLink>
              </NavItem>
            ) : null}

            {isAdmin || isOperator ? (
              <NavItem>
                <NavLink href={"/users"}>Users</NavLink>
              </NavItem>
            ) : null}
            {isOperator || isUser ? (
              <NavItem>
                <NavLink href={"/registration/" + this.props.userId}>
                  Profile
                </NavLink>
              </NavItem>
            ) : null}
          </Nav>
        </div>
        <div className="text-align-right"> 
          <div className="width-200px float-left">Welcome {this.state.currentUser.username}</div> 
          <div>
          <a href="#" onClick={this.logout}>Log out</a>
          </div>
        </div>
      
        <hr />
      </div>
    );
  }
}

export default withRouter(Dashboard);
