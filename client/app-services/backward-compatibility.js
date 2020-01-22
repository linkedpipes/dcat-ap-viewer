import "isomorphic-fetch";
import {Promise} from "es6-promise";

if (!window.Promise) {
  window.Promise = Promise;
}