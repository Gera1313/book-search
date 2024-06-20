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

const SearchBooks = () => {
    // create state for holding returned google api data
    const [searchedBooks, setSearchedBooks] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState("");
  
    // create state to hold saved bookId values
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  
    const [saveBook] = useMutation(SAVE_BOOK);