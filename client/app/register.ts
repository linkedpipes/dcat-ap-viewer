/**
 * General components like: views, services ...
 */
const registered = [];

/**
 * Visual components like: header, footer ...
 */
const elements = {};

export function register(entity) {
  registered.push(entity);
}

export function getRegistered() {
  return registered;
}
