import React from "react";
import {connect} from "react-redux";
import {keywordsSelector} from "../dataset-list-reducer";
import {KEYWORDS_QUERY} from "@/app/navigation";
import {updateQueryFilters} from "../dataset-list-actions";
import {TagCloud} from "react-tagcloud";

class _KeywordCloud extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return (
            <div className="col col-sm-12 col-md-9 offset-md-1"
                 style={{"textAlign": "center", "display": "block"}}>
                <br/>
                <TagCloud minSize={20}
                          maxSize={52}
                          shuffle={false}
                          tags={this.props.keyword}
                          colorOptions={{
                              "luminosity": "dark",
                              "hue": "random"
                          }}
                          renderer={tagRenderer}
                          onClick={this.onClick}/>
            </div>
        );
    }

    onClick(tag) {
        this.props.setKeywordsFacet(tag.label, true);
    }

}

const tagRenderer = (tag, size, color) => {
    const style = {
        "marginLeft": "1REM",
        "verticalAlign": "middle",
        "display": "inline-block",
        "cursor": "grab"
    };
    // If all elements have the same count, then size is NaN.
    if (isNaN(size)) {
        size = 32;
    }
    return (
        <span className="tag-cloud-tag" style={style} key={tag.label}>
             <span style={{"color": color, "fontSize": size}}>
             {tag.label}
             </span>
        </span>
    )
};

const mapStateToProps = (state, ownProps) => ({
    "keyword": keywordsSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "setKeywordsFacet": (value, isActive) => dispatch(updateQueryFilters(
        ownProps.location, KEYWORDS_QUERY, value, isActive
    ))
});

const KeywordCloud = connect(mapStateToProps, mapDispatchToProps)(_KeywordCloud);

export default KeywordCloud;