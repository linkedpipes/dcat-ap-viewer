import React from "react";
import {Link} from "react-router";

// TODO item.format
const DatasetList = ({values}) => {
    return (
        <div>
            <hr/>
            {values.map((item) => (
                <div key={item.id}>
                    <Link to={"/dataset?url=" + encodeURI(item.iri)}>
                        <h4>{item.title}</h4>
                    </Link>
                    <p>
                        {item.description}
                    </p>
                    <hr/>
                </div>
            ))}
        </div>
    )
};

export default DatasetList;
