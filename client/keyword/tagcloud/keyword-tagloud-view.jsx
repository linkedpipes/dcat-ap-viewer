import React from "react";
import {connect} from "react-redux";
import {Row, Col, Container} from "reactstrap";
import {fetchKeywordsRequest} from "./keyword-tagloud-action";
import {getString} from "../../application/strings";
import setPageTitle from "../../services/page-title";
import {TagCloud} from "react-tagcloud";
import {Link} from "react-router";
import {
    getUrl,
    DATASET_LIST_URL,
    KEYWORDS_QUERY
} from "../../application/navigation";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FAILED
} from "./../../services/http-request";

const customRenderer = (tag, size, color) => {
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

class KeywordsViewComponent extends React.Component {

    componentDidMount() {
        this.props.fetchData(this.props.query);
    }

    render() {
        setPageTitle(getString("title.keywords"));

        // TODO Export status report to another component
        if (this.props.status === STATUS_INITIAL) {
            return (
                <div style={{"textAlign": "center", "fontSize": "2em"}}>
                    {getString("s.no_data")}
                </div>
            )
        } else if (this.props.status === STATUS_FETCHING) {
            return (
                <div style={{"textAlign": "center", "fontSize": "2em"}}>
                    {getString("s.fetching")}
                </div>
            )
        } else if (this.props.status === STATUS_FAILED) {
            return (
                <div style={{"textAlign": "center", "fontSize": "2em"}}>
                    {getString("s.failed")}
                </div>
            )
        }

        const data = [];
        this.props.keywords.forEach((item) => data.push({
            "value": item["label"],
            "count": item["count"]
        }));

        let data_publishers = [
            {"value": "rozpočet", "count": "6"},
            {"value": "faktury", "count": "6"},
            {"value": "výdaje", "count": "4"},
            {"value": "sport", "count": "4"},
            {"value": "objednávky", "count": "4"},
            {"value": "smlouvy", "count": "4"},
            {"value": "příjmy", "count": "3"},
            {"value": "veřejná doprava", "count": "3"},
            {"value": "číselník", "count": "3"},
            {"value": "kontroly", "count": "3"},
            {"value": "ceny", "count": "3"},
            {"value": "zaměstnanci", "count": "3"},
            {"value": "věk", "count": "3"},
            {"value": "zařízení", "count": "2"},
            {"value": "Počet obyvatel", "count": "2"},
            {"value": "zastávka", "count": "2"},
            {"value": "volební okrsky", "count": "2"},
            {"value": "investice", "count": "2"},
            {"value": "zima", "count": "2"},
            {"value": "Katastrální mapa", "count": "2"},
            {"value": "Adresy", "count": "2"},
            {"value": "MHD", "count": "2"},
            {"value": "SMS", "count": "2"},
            {"value": "turistika", "count": "2"},
            {"value": "kontrola", "count": "2"},
            {"value": "zeleň", "count": "2"},
            {"value": "odpad", "count": "2"},
            {"value": "petice", "count": "2"},
            {"value": "fluktuace", "count": "2"},
            {"value": "veřejná správa", "count": "2"}
        ];

        // https://www.npmjs.com/package/react-tagcloud
        // "wordWrap": "break-word"
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm="12" md={{"size": 9, "offset": 1 }}>
                            <div  style={{
                                "margin": "4em 1em 1em 1em",
                                "textAlign": "center",
                                "display":"block"
                            }}>
                                <TagCloud minSize={20}
                                          maxSize={52}
                                          shuffle={false}
                                          tags={data}
                                          colorOptions={{
                                              "luminosity": "dark",
                                              "hue": "random"
                                          }}
                                          renderer={customRenderer}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md={{"size": 9, "offset": 1 }}>
                            <div  style={{
                                "margin": "4em 1em 1em 1em",
                                "textAlign": "center",
                                "display":"block"
                            }}>
                                <TagCloud minSize={20}
                                          maxSize={52}
                                          shuffle={false}
                                          tags={data_publishers}
                                          colorOptions={{
                                              "luminosity": "dark",
                                              "hue": "random"
                                          }}
                                          renderer={customRenderer}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    "status": state.keywords.data.status,
    "keywords": state.keywords.data.keywords
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "fetchData": (query) => {
        dispatch(fetchKeywordsRequest(query));
    }
});

export const KeywordsViewView = connect(
    mapStateToProps,
    mapDispatchToProps
)(KeywordsViewComponent);