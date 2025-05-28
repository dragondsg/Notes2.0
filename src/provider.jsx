import { Request } from "./api";
import { createContext, useState } from "react";

export const NotesContext = createContext({});

export const NotesProvider = ( { children } ) => {
    const [allUsers, setAllUsers] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const refetchUsers = () => Request.getAllUsers().then(setAllUsers);
    const refetchNotes = () => Request.getAllNotes().then(setAllNotes);
    const refetchCategories = () => Request.getAllCategories().then(setAllCategories);

    const addNote = (subject, content, category, currentUser) => {
        let currentTime = new Date();
        return Request.postNote(subject, content, category, currentUser, currentTime, currentTime);
    };
    const updateNote = (id, subject, content, category) => {
        let currentTime = new Date();
        return Request.updateNote(id, subject, content, category, currentTime);
    };
    const deleteNote = (id) => Request.deleteNote(id);

    const addUser = (username, password) => {
        if (allUsers.filter((user) => user.username == username).length > 0) {
            console.log("Username already exist.");
            return false;
        } else {
            localStorage.setItem('user', username);
            localStorage.setItem('id', Math.max(allUsers.map((user)=>user.id)) + 1);
            localStorage.setItem('category', 0);
            Request.postUser(username, password);
            return true;
        }
    };
    const logInUser = (username, password) => {
        let tu = allUsers.filter((user) => user.username == username);
        if (tu.length != 1) {
            console.log("Username does not exist.");
            return false;
        } else if (tu[0].password != password) {
            console.log("Password does not match username.");
            return false;
        } else {
            localStorage.setItem('user', tu[0].username);
            localStorage.setItem('id', tu[0].id);
            localStorage.setItem('category', 0);
            return true;
        }
    };

    const addCat = (title, user) => {
        return Request.postCategory(title, user);
    };
    const updateCat = (title, user, id) => {
        return Request.updateCategory(id, title, user);
    };

    const a = {
        allUsers,
        allNotes,
        allCategories,
        refetchUsers,
        refetchNotes,
        refetchCategories,
        addNote,
        updateNote,
        deleteNote,
        addUser,
        logInUser,
        addCat,
        updateCat,
    };
    
    return <NotesContext.Provider value={ a }>{ children }</NotesContext.Provider>
};
