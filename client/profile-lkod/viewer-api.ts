// Provide access to selected services from viewer-react, imported
// services are automatically registered.
export * from "../viewer-react/core/register";
export * from "../viewer-react/service/i18";
export * from "../viewer-react/service/navigation";
export * as Canonical from "../viewer-react/service/canonical-link";
export {LoadingIndicator} from "../viewer-react/service/loading-indicator";
export * from "../viewer-react/keyword-list/keyword-list-service";
export * from "../viewer-react/dataset-list/dataset-list-service";
export * from "../viewer-react/dataset-detail/dataset-detail-service";
export * from "../viewer-react/service/label";
export * from "../viewer-react/service/modal";
export * from "../viewer-react/service/page-title";
export {default as configuration} from "./lkod-configuration"
export {QUALITY} from "./vocabulary-quality";
export {LEGAL} from "./vocabulary-legal";

// Often used components goes here.
export * from "./components/link";
