import React from "react";

const userContext = React.createContext();

class UserContextProvider extends React.Component {
    state = {
        user: {
            isLoggedIn: localStorage.getItem("loggedIn") === "true"
        }
    }

    signOut = () => {
        localStorage.setItem("loggedIn", false);
        this.setState({ user: { isLoggedIn: false }});
    }

    signIn = () => {
        localStorage.setItem("loggedIn", true);
        this.setState({ user: { isLoggedIn: true }})
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
