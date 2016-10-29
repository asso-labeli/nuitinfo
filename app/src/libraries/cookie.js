export function get(key) {
    let name = key + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function set(key, value) {
    let expires = new Date();
    expires.setTime(expires.getTime() + (60 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + '; expires=' + expires.toUTCString() + ";path=/";
}

export function remove(key) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}