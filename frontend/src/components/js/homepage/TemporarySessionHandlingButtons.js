import React from 'react';

export default function TemporarySessionHandlingButtons() {

    function createSession() {
        fetch(`http://localhost:8000/create_session`, {
            method: 'POST',
            credentials: "include",
        }).then((response) => {
            // this callback function is executed when the promise is fulfilled
            if (response.ok) {
                return response.json();
            } else if (response.status === 403) {
                return {
                    "tip": "You have no permission to create session. That should not appear."
                }
            } else {
                throw new Error("Communication between React and FastAPI is not working. Something went wrong.");
            }
        })
            .then((data) => {
                // this callback function is executed when the promise is fulfilled
                console.log(data);
            })
            .catch((error) => {
                // this callback function is executed when the promise is rejected
                console.error(error);
            });
    }

    function readSession() {
        fetch(`http://localhost:8000/read_session`, {
            method: 'GET',
            credentials: "include",
        }).then((response) => {
            // this callback function is executed when the promise is fulfilled
            if (response.ok) {
                return response.json();
            } else if (response.status === 403) {
                return {
                    "tip": "You have no permission to read session, probably cookie was deleted or not yet set."
                }
            } else {
                throw new Error("Communication between React and FastAPI is not working. Something went wrong.");
            }
        })
            .then((data) => {
                // this callback function is executed when the promise is fulfilled
                console.log(data);
            })
            .catch((error) => {
                // this callback function is executed when the promise is rejected
                console.error(error);
            });
    }

    function deleteSession() {
        fetch(`http://localhost:8000/delete_session`, {
            method: 'POST',
            credentials: "include"
        }).then((response) => {
            // this callback function is executed when the promise is fulfilled
            if (response.ok) {
                return response.json();
            } else if (response.status === 403) {
                return {
                    "tip": "You have no permission to delete session, probably was already deleted or not yet created. Check your cookies."
                }
            } else {
                throw new Error("Communication between React and FastAPI is not working. Something went wrong.");
            }
        })
            .then((data) => {
                // this callback function is executed when the promise is fulfilled
                console.log(data);
            })
            .catch((error) => {
                // this callback function is executed when the promise is rejected
                console.error(error);
            });
    }

    const buttonStyles = {
        backgroundColor: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '16px 66px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '5px',
    };

    return (
        <div style={{display: "flex"}}>
            <button style={buttonStyles} onClick={createSession}>Create Session</button>
            <button style={buttonStyles} onClick={readSession}>Read Session</button>
            <button style={buttonStyles} onClick={deleteSession}>Delete Session</button>
        </div>
    );
}

