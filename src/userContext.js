import React from "react";

const userContext = React.createContext();

class UserContextProvider extends React.Component {
    state = {
        user: {
            isLoggedIn: false
        }
    }

    signOut = () => {
        this.setState({ user: { isLoggedIn: false }})
    }

    signIn = () => {
        this.setState({ user: { isLoggedIn: true }})
        console.log("Changed LoggedIn State")
    }

    render() {
        return (
            <userContext.Provider value={{ ...this.state, signIn: this.signIn }}>
                {this.props.children}
            </userContext.Provider>
        )
    }
}

export {
    userContext, UserContextProvider
}
