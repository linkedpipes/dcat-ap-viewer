import React from "react";
import Header from "./header";

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <div>
                    {React.cloneElement(this.props.children, this.props)}
                </div>
            </div>
        );
    };
}

export default App;