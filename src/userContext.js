import React from "react";

const userContext = React.createContext();

class UserContextProvider extends React.Component {
    state = {
        user: {
            isLoggedIn: localStorage.getItem("loggedIn") === "true", 
            userId: localStorage.getItem("userId")
        }
    }

    signOut = () => {
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("userId", null);
        this.setState({ user: { isLoggedIn: false, userData: null }});
    }

    signIn = (userData) => {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userId", userData);
        this.setState({ user: { isLoggedIn: true, userId: userData }})
    }

    render() {
        return (
            <userContext.Provider value={{ ...this.state, signIn: this.signIn, signOut: this.signOut }}>
                {this.props.children}
            </userContext.Provider>
        )
    }
}

export {
    userContext, UserContextProvider
}
