import React from "react";
import { signOut } from "../../services/authService";

class SignOut extends React.Component {
  async componentDidMount() {
    await signOut();

    window.location = "/";
  }

  render() {
    return null;
  }
}

export default SignOut;
