/**
 * Hold instance of API class used to access NKOD API. The purpose
 * is to allow extending profile to modify the use API instance.
 */
import {ApiNkod} from "../api-nkod/api-nkod";

let apiInstance = new ApiNkod();

export const getApi = () => apiInstance;

export const setApi = (api) => apiInstance = api;
