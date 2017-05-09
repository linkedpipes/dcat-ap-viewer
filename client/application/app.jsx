import React from "react";
import {Container} from "reactstrap";
import Header from "./header";

class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Container>
                    {React.cloneElement(this.props.children, this.props)}
                </Container>
            </div>
        );
    };
}

export default App;