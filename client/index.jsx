import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import {Provider} from "react-redux";
import {configureStore} from "./store";
import {syncHistoryWithStore} from "react-router-redux";
import App from "./application/app";
import {DatasetListView} from "./dataset/list/dataset-list-view";
import {DatasetDetailView} from "./dataset/detail/dataset-detail-view"
import {OrganisationListView} from "./organisation/list/organisation-list-view"

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={DatasetListView}/>
                <Route path="dataset" component={DatasetDetailView}/>
                <Route path="organisations" component={OrganisationListView}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById("app"));
