import React from "react";

const userContext = React.createContext({
    user: {
        loggedIn: false
    }
});

export {
    userContext
}
