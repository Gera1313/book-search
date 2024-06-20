import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import Auth from "../utils/auth";
import { saveBook, searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";

import { useMutation } from "@apollo/react-hooks";
import { SAVE_BOOK } from "../utils/mutations";