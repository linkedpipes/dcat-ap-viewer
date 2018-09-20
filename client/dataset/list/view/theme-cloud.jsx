import React from "react";
import {connect} from "react-redux";
import {themesSelector} from "../dataset-list-reducer";
import {THEME_QUERY} from "@/app/navigation";
import {updateQueryFilters} from "../dataset-list-actions";
import {TagCloud} from "react-tagcloud";
import {labelsSelector, selectLabel} from "app-services/labels";

class _ThemeCloud extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        const tagRenderer = createTagRenderer(this.props.labels);
        return (
            <div className="col col-sm-12 col-md-9 offset-md-1"
                 style={{"textAlign": "center", "display": "block"}}>
                <br/>
                <TagCloud minSize={20}
                          maxSize={52}
                          shuffle={false}
                          tags={this.props.theme}
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
        this.props.setThemeFacet(tag.iri, true);
    }

}

function createTagRenderer(labels) {

    return (tag, size, color) => {
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
            <span className="tag-cloud-tag" style={style} key={tag.iri}>
             <span style={{"color": color, "fontSize": size}}>
             {selectLabel(labels, tag.iri)}
             </span>
        </span>
        )
    };

}

const mapStateToProps = (state, ownProps) => ({
    "theme": themesSelector(state),
    "labels": labelsSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "setThemeFacet": (value, isActive) => dispatch(updateQueryFilters(
        ownProps.location, THEME_QUERY, value, isActive
    ))
});

const ThemeCloud = connect(mapStateToProps, mapDispatchToProps)(_ThemeCloud);

export default ThemeCloud;