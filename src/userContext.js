import React from "react";

const userContext = React.createContext();

class UserContextProvider extends React.Component {
    state = {
        user: {
            isLoggedIn: false,
            display: "Dunno",
        }
    }

    setLoggedIn = (event) => {
        event.preventDefault()
        this.setState({ user: { isLoggedIn: true }, display: "In" })
    }

    signOut = (event) => {
        event.preventDefault()
        this.setState({ user: { isLoggedIn: false }, display: "Out" })
    }

    render() {
        return (
            <userContext.Provider value={{ ...this.state, setLoggedIn: this.setLoggedIn }}>
                {this.props.children}
            </userContext.Provider>
        )
    }
}

export {
    userContext, UserContextProvider
}
