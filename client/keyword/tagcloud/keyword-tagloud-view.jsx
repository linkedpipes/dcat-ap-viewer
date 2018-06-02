import React from "react";
import {connect} from "react-redux";
import {Row, Col, Container} from "reactstrap";
import {fetchKeywordsRequest} from "./keyword-tagloud-action";
import {getString} from "../../app/strings";
import setPageTitle from "../../app-services/page-title";
import {TagCloud} from "react-tagcloud";
import {Link} from "react-router";
import {
    getUrl,
    DATASET_LIST_URL,
    KEYWORDS_QUERY
} from "../../app/navigation";
import {isDataReady} from "../../app-services/http-request";
import {
    keywordsStatusSelector,
    keywordsDataSelector
} from "./keyword-tagloud-reducer";
import {HttpRequestStatus} from "../../app/http-request-status";

const tagRenderer = (tag, size, color) => {
    const url = getUrl(DATASET_LIST_URL, {[KEYWORDS_QUERY]: tag.value});
    const style = {
        "marginLeft": "1REM",
        "verticalAlign": "middle",
        "display": "inline-block"
    };
    return (
        <span className="tag-cloud-tag" style={style} key={tag.value}>
            <Link to={url} className="tag-cloud-tag">
                 <span style={{"color": color, "fontSize": size}}>
                 {tag.value}
                 </span>
            </Link>
        </span>
    )
};

// https://www.npmjs.com/package/react-tagcloud
// "wordWrap": "break-word"
const KeywordTagCloud = ({tags}) => (
    <TagCloud minSize={20}
              maxSize={52}
              shuffle={false}
              tags={tags}
              colorOptions={{
                  "luminosity": "dark",
                  "hue": "random"
              }}
              renderer={tagRenderer}/>
);

class KeywordsViewComponent extends React.Component {

    componentDidMount() {
        this.props.fetchData(this.props.query);
    }

    render() {
        setPageTitle(getString("title.keywords"));

        if (!isDataReady(this.props.status)) {
            return (
                <HttpRequestStatus status={this.props.status}/>
            )
        }

        const style = {
            "margin": "4em 1em 1em 1em",
            "textAlign": "center",
            "display": "block"
        };

        return (
            <Container>
                <Row>
                    <Col sm="12" md={{"size": 9, "offset": 1}}>
                        <div style={style}>
                            <KeywordTagCloud tags={this.props.data}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    "status": keywordsStatusSelector(state),
    "data": keywordsDataSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "fetchData": (query) => {
        dispatch(fetchKeywordsRequest(query));
    }
});

export const KeywordsView = connect(
    mapStateToProps,
    mapDispatchToProps
)(KeywordsViewComponent);
