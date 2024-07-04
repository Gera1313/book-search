import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

import { useMutation } from "@apollo/react-hooks";

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: "", password: "" });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
  
    const [loginUser] = useMutation(LOGIN_USER);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserFormData({ ...userFormData, [name]: value });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      // check if form has everything (as per react-bootstrap docs)
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      try {
        const { data } = await loginUser({
          variables: { ...userFormData },
        });

    // const { token, user } = await response.json();
      // console.log(user);
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
        username: "",
        email: "",
        password: "",
      });
    };


    return (
        <>
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert
              dismissible
              onClose={() => setShowAlert(false)}
              show={showAlert}
              variant="danger"
            >
              Something went wrong with your login credentials!

export default LoginForm;