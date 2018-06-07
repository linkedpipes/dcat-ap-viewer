const registered = [];

export function register(entity) {
    registered.push(entity);
}

export function getRegistered() {
    return registered;
}