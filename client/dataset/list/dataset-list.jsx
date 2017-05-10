import React from "react";
import {Link} from "react-router";

const DatasetList = ({values}) => {
    return (
        <div>
            {values.map((item) => (
                <div key={item.id}>
                    <Link to={"/dataset?url=" + encodeURI(item.iri)}>
                        <h4>{item.title}</h4>
                    </Link>
                    <p>
                        {item.description}
                    </p>
                    <div>
                        {item.format.map((format) => (
                            <span key={format}>{format}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default DatasetList;
