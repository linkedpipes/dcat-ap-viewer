import React from "react";
import {Link} from "react-router";
import TagLine from "../../components/tag-line"

const DatasetList = ({values}) => {
    return (
        <div>
            <hr/>
            {values.map((item) => (
                <div key={item.id}>
                    <Link to={"/dataset?url=" + encodeURI(item.iri)}>
                        <h4>{item.title}</h4>
                    </Link>
                    <p style={{
                        "overflow": "hidden",
                        "display": "-webkit-box",
                        "WebkitLineClamp": "3",
                        "WebkitBoxOrient": "vertical"}}>
                        {item.description}
                    </p>
                    <TagLine values={item.format} size={0.7}/>
                    <hr/>
                </div>
            ))}
        </div>
    )
};

export default DatasetList;
