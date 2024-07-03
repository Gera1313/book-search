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

        

export default LoginForm;