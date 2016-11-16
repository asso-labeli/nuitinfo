export default {
    isEmpty(o) {
        if (typeof o === "undefined") {
            return true;
        } else if (o === null) {
            return true;
        } else if (Object.getPrototypeOf(o) === String.prototype) {
            return o === "";
        } else if (Object.getPrototypeOf(o) === Array.prototype) {
            return JSON.stringify(o) === "[]";
        } else if (Object.getPrototypeOf(o) === Object.prototype) {
            return JSON.stringify(o) === "{}";
        }
        return false;
    }
};