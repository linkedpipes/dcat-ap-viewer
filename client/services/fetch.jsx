import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";

class FetchComponent extends React.Component {

    componentDidMount() {
        this.updateData();
    }

    componentDidUpdate() {
        this.updateData();
    }

    updateData() {
        if (this.shouldFetchData()) {
            this.fetchData();
        }
    }

    shouldFetchData() {
        return this.props.fetch;
    }

    fetchData() {
        fetch(this.props.url).then(result => {
            return result.json();
        }).then(json => {
            this.props.onSuccess(json);
        }).catch(error => {
            this.props.onError(error);
        });
    }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, this.props)}
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch, ownProps) => ({
    "onSuccess": (data) => {
        if (ownProps.onSuccess) {
            dispatch(ownProps.onSuccess(data));
        }
    },
    "onError": (error) => {
        if (ownProps.onError) {
            dispatch(ownProps.onError(error));
        }
    }
});

export const Fetch = connect(undefined, mapDispatchToProps)(FetchComponent);

Fetch.propTypes = {
    "url": PropTypes.string.isRequired,
    "fetch": PropTypes.bool.isRequired,
    "onSuccess": PropTypes.func.isRequired,
    "onError": PropTypes.func,
    "children": PropTypes.element.isRequired
};

//
// Fetch component usage example.
//
// class DatasetListPage extends React.Component {
//     render() {
//         console.log("DatasetListContainer.render");
//         return (
//             <Row>
//                 <Col md={3} style={{backgroundColor: "yellow"}}>
//                     FACET FILTERS
//                 </Col>
//                 <Col md={9}>
//                     <div style={{backgroundColor: "lightgreen"}}>
//                         SEARCH
//                     </div>
//                     <div style={{backgroundColor: "beige"}}>
//                         <Fetch url={this.props.url}
//                                fetch={this.props.fetch}
//                                onSuccess={fetchDataSuccess}>
//                             <DatasetListComponent/>
//                         </Fetch>
//                         <Button color="primary" onClick={() => {
//                             this.props.dispatch(fetchDataRequest);
//                         }}>primary</Button>
//                     </div>
//                 </Col>
//             </Row>
//         );
//     }
// }

