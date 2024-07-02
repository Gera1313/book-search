import React from "react";
import {
    Jumbotron,
    Container,
    CardColumns,
    Card,
    Button,
} from "react-bootstrap";

// import { getMe, deleteBook } from '../utils/API';
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

// hooks
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";

const SavedBooks = () => {
    const { loading, data } = useQuery(GET_ME);
    const [removeBook] = useMutation(REMOVE_BOOK);
    const userData = data?.me || [];

    const handleDeleteBook = async (bookId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }

export default SavedBooks;