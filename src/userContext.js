import React from "react";

const userContext = React.createContext();

class UserContextProvider extends React.Component {
    state = {
        user: {
            isLoggedIn: false
        }
    }

    setLoggedIn = () => {
        this.setState({ user: { isLoggedIn: !this.state.user.isLoggedIn } })
        console.log("Changed LoggedIn State")
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
