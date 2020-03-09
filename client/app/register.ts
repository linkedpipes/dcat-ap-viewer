import React from "react";

const EMPTY_ELEMENT: React.FunctionComponent = () => null;

export interface Registrable {
  name: string;
}

/**
 * Registration object of a reducer.
 */
export interface Reducer extends Registrable {
  reducer: (state: object, action: object) => object;
}

/**
 * Registration object of an element (component) used in the application.
 */
export interface Element extends Registrable {
  element: React.Component;
}

/**
 * Registration object of a view accessible by URL.
 */
export interface View extends Registrable {
  url: string;
  // List of all relevant parameters.
  query?: string[],
  view: React.Component;
  // If true exact path is used without the prefix.
  exact?: boolean;
}

const registered: { [name: string]: Registrable } = {};

export function register<T extends Registrable>(entity: T): void {
  registered[entity.name] = entity;
}

export function getRegisteredReducers(): Reducer[] {
  return Object.values(registered)
    .filter(isReducer)
    .map(item => item as Reducer);
}

function isReducer(object: Registrable): object is Reducer {
  const reducer = object as Reducer;
  return reducer.reducer !== undefined;
}

const DEVELOP_REPORTED: Set<string> = new Set();

export function getRegisteredElement(name: string)
  : React.Component | React.FunctionComponent {
  //
  const value: Registrable = registered[name];
  if (value === undefined) {
    if (!DEVELOP_REPORTED.has(name)) {
      DEVELOP_REPORTED.add(name);
      console.log("Missing element:", name);
    }
    return EMPTY_ELEMENT;
  }
  if (isElement(value)) {
    return (value as Element).element;
  }
  if (!DEVELOP_REPORTED.has(name)) {
    DEVELOP_REPORTED.add(name);
    console.log(
      "Registered entity (" + name + ") is not of type element.",
      value);
  }
  return EMPTY_ELEMENT;
}

function isElement(object: any): object is Element {
  const view = object as Element;
  return view.element !== undefined;
}

export function getRegisteredViews(): View[] {
  return Object.values(registered).filter(isView).map(item => item as View);
}

function isView(object: Registrable): object is View {
  const view = object as View;
  return view.view !== undefined && view.url !== undefined;
}
