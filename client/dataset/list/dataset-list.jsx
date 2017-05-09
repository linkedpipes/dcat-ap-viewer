import React from "react";

const DatasetList = ({values}) => {
    return (
        <div>
            {values.map((item) => (
                <div key={item.id}>
                    <h4>{item.title}</h4>
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
