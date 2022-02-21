import {t, tUrl} from "../../viewer-react/service/i18";
import {NavLink, Link} from "react-router-dom";
import React from "react";

export function navLink(url, label) {
  return tUrl(url, {}, (to => (
    <NavLink
      to={to}
      className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
    >
      {t(label)}
    </NavLink>
  )));
}

export function tLink(url, label, query = {}) {
  return tUrl(url, query, (to => (
    <Link to={to}>
      {t(label)}
    </Link>
  )));
}

export function link(url, label, query = {}) {
  return tUrl(url, query, (to => (
    <Link to={to}>
      {label}
    </Link>
  )));
}
