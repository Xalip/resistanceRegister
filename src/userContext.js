import React from "react";

const userContext = React.createContext();

class UserContextProvider extends React.Component {
    state = {
        user: {
            isLoggedIn: false
        }
    }

    setLoggedIn = (event) => {
        event.preventDefault()
        this.setState({ user: { isLoggedIn: !this.state.user.isLoggedIn } })
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
