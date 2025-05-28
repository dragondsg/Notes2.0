const URL = "http://localhost:3000";
const userUrl = URL + "/users";
const noteUrl = URL + "/notes";
const catUrl = URL + "/categories";

export const Request = {
    getAllUsers: () => fetch(userUrl).then((response) => response.json()),
    getAllNotes: () => fetch(noteUrl).then((response) => response.json()),
    getAllCategories: () => fetch(catUrl).then((response) => response.json()),

    postUser: (username, password) => {
        return fetch(userUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              password,
            }),
            redirect: "follow",
        });
    },
    postNote: (subject, content, catID, userID, created, updated) => {
        return fetch(noteUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subject,
              content,
              catID,
              userID,
              created,
              updated,
            }),
            redirect: "follow",
        });
    },
    postCategory: (title, userID) => {
        return fetch(catUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title,
              userID,
            }),
            redirect: "follow",
        });
    },

    updateUser: (id, username, password) => {
        return fetch(userUrl + "/" + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              password,
            }),
            redirect: "follow",
        });
    },
    updateNote: (id, subject, content, catID, updated) => {
        return fetch(noteUrl + "/" + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                subject,
                content,
                catID,
                updated,
            }),
            redirect: "follow",
        });
    },
    updateCategory: (id, title, userID) => {
        return fetch(catUrl + "/" + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title,
              userID,
            }),
            redirect: "follow",
        });
    },

    deleteNote: (id) => {
        return fetch(noteUrl + "/" + id, {
            method: "DELETE",
        });
    },
};
