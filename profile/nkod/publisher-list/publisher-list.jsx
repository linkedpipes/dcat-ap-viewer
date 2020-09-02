import React, {useEffect} from "react";
import {PropTypes} from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import {
  register,
  getRegisteredElement,
  selectT,
  selectTUrl,
  selectTLabel,
  URL_DATASET_LIST,
} from "../../client-api";
import {
  Status,
  fetchPublisherList,
  publishersListSelector,
  ELEMENT_PUBLISHER_LIST,
} from "../../../client/publisher-list";
import {formatNumber} from "../utils";
import {STATUS_FAILED, STATUS_LOADING} from "../nkod-component-names";

const PublisherList = () => {
  const dispatch = useDispatch();
  const t = useSelector(selectT);
  const tLabel = useSelector(selectTLabel);
  const tUrl = useSelector(selectTUrl);
  const data = useSelector(publishersListSelector);
  useEffect(() => {
    if (data.status === Status.Undefined) {
      dispatch(fetchPublisherList());
    }
  }, []);
  //
  const LoadingView = getRegisteredElement(STATUS_LOADING);
  const FailedView = getRegisteredElement(STATUS_FAILED);
  switch (data.status) {
  case Status.Undefined:
  case Status.Loading:
    return (<LoadingView/>);
  case Status.Failed:
    return (<FailedView/>);
  case Status.Ready:
    return publisherListView(t, tLabel, tUrl, data.publishers);
  default:
    return null;
  }
};

function publisherListView(t, tLabel, tUrl, publishers) {
  return (
    <div className="container p-3">
      <h4>
        {formatNumber(publishers.length)}&nbsp;{t("publishers_found")}
      </h4>
      <hr/>
      <div className="row">
        {publishers.map((publisher) => (
          <PublisherListItem
            key={publisher.iri}
            t={t}
            tUrl={tUrl}
            tLabel={tLabel}
            publisher={publisher}
          />
        ))}
      </div>
    </div>
  );
}

function PublisherListItem({t, tUrl, tLabel, publisher}) {
  return (
    <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-3">
      <div className="card p-2">
        <div className="card-body px-2">
          <h5 className="card-title">
            <Link to={tUrl(URL_DATASET_LIST, {"publisher": publisher.iri})}>
              <h4>{tLabel(publisher.iri)}</h4>
            </Link>
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {getDatasetCountLabel(publisher.datasetCount, t)}
          </li>
        </ul>
      </div>
    </div>
  );
}

PublisherListItem.propTypes = {
  "t": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "publisher": PropTypes.object.isRequired,
};

function getDatasetCountLabel(count, t) {
  if (count === undefined || count === null) {
    return "";
  } else if (count === 1) {
    return t("one_dataset");
  } else if (count <= 4) {
    return count + t("two_three_datasets");
  } else {
    return formatNumber(count) + t("many_datasets");
  }
}

register({
  "name": ELEMENT_PUBLISHER_LIST,
  "element": PublisherList,
});
