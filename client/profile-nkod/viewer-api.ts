// Provide access to selected services from viewer-react, imported
// services are automatically registered.
export * from "../viewer-react/core/register";
export * from "../viewer-react/service/i18";
export * from "../viewer-react/service/navigation";
export * from "../viewer-react/catalog-list/catalog-list-service";
export * from "../viewer-react/publisher-list/publisher-list-service";
export * from "../viewer-react/service/label";
export * from "../viewer-react/service/modal";
export * from "../viewer-react/service/page-title";

// Access to viewer-react.
export {default as configuration} from "./nkod-configuration"
export {formatNumber} from "../viewer-react/format-utils";

// Often used components goes here.
export * from "../profile-lkod/components/link";
