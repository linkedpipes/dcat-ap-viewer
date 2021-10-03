import React from "react";

const EMPTY_ELEMENT: Element = {
  "name": "empty-element",
  "element": (() => null) as React.FunctionComponent,
};

export interface Registrable {

  name: string;

}

export interface Reducer extends Registrable {

  reducer: (state: object, action: object) => object;

}

function isReducer(object: Registrable): object is Reducer {
  const reducer = object as Reducer;
  return reducer.reducer !== undefined;
}

export interface Element extends Registrable {

  element: React.Component | React.FunctionComponent;

}

function isElement(object: any): object is Element {
  const view = object as Element;
  return view.element !== undefined;
}

export interface View extends Registrable {

  url: string;

  view: React.Component;

  // Translation of url and query arguments.
  navigation: Record<string, Record<string, string | string[]>>;

  // If true exact path is used without the prefix.
  exact?: boolean;

  // Set query values that should be included in canonical query.
  canonicalQuery?: string[]

}

function isView(object: Registrable): object is View {
  const view = object as View;
  return view.view !== undefined
    && view.url !== undefined
    && view.navigation !== undefined;
}

export interface Service extends Registrable {
  service: {
    "beforeCreateStore": () => void
  }
}

function isService(object: Registrable): object is Service {
  const view = object as Service;
  return view.service !== undefined;
}

export interface Translation extends Registrable {

  translations: Record<string, Record<string, string>>;

  translationsNamespace?: string;

}

function isTranslation(object: Registrable): object is Translation {
  const view = object as Translation;
  return view.translations !== undefined;
}

const registered: { [name: string]: Registrable } = {};

export function register(
  entity: Reducer | Element | View | Service | Translation,
): void {
  if (registered[entity.name] === undefined) {
    registered[entity.name] = entity;
  } else {
    console.error("Re-register of", entity.name);
  }
}

export function removeFromRegistry(name:string): void {
  delete registered[name];
}

export function registerOnlyOnce(
  entity: Reducer | Element | View | Service | Translation,
) {
  if (registered[entity.name] === undefined) {
    registered[entity.name] = entity;
  }
}

export const getReducers = () => selectByType(isReducer);

function selectByType<T extends Registrable>(
  selector: (object: Registrable) => object is T
) {
  return Object.values(registered)
    .filter(selector)
    .map(item => item as T);
}

export const getViews = () => selectByType(isView);

export const getServices = () => selectByType(isService);

export const getTranslation = () => selectByType(isTranslation);

const DEVELOP_REPORTED: Set<string> = new Set();

export function getElement(name: string): Element {
  const value: Registrable = registered[name];
  if (value === undefined) {
    if (!DEVELOP_REPORTED.has(name)) {
      DEVELOP_REPORTED.add(name);
      console.warn("Missing element:", name);
    }
    return EMPTY_ELEMENT;
  }
  if (isElement(value)) {
    return (value as Element);
  }
  if (!DEVELOP_REPORTED.has(name)) {
    DEVELOP_REPORTED.add(name);
    console.error(
      "Registered entity (" + name + ") is not of type element.",
      value);
  }
  return EMPTY_ELEMENT;
}

export function getViewByUrl(url: string): View | undefined {
  let value: Registrable | undefined = undefined;
  for (const item of Object.values(registered)) {
    if (!(isView(item))) {
      continue;
    }
    if (item.url === url) {
      value = item;
      break;
    }
  }
  if (value === undefined) {
    if (!DEVELOP_REPORTED.has(url)) {
      DEVELOP_REPORTED.add(url);
      console.warn("Missing view:", url);
    }
    return undefined;
  }
  if (isView(value)) {
    return (value as View);
  }
  if (!DEVELOP_REPORTED.has(url)) {
    DEVELOP_REPORTED.add(url);
    console.error(
      "Registered entity (" + url + ") is not of type element.",
      value);
  }
  return undefined;
}
