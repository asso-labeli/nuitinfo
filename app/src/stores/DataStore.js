class DataStore {

    constructor() {
        this.state = {};
    };

    isStorageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return false;
        }
    };

    get(key, _default = null) {
        if (!this.state.hasOwnProperty(key) || this.state['key'] === null || this.state['key'] === undefined || this.state['key'] === "") {
            if (this.isStorageAvailable('localStorage')) {
                if (window.localStorage[key] !== null) {
                    return window.localStorage.getItem(key);
                }
            }
        } else {
            return this.state[key];
        }
        return _default;
    };

    set(key, value) {
        if (this.isStorageAvailable('localStorage')) {
            window.localStorage.setItem(key, value);
        }
        this.state[key] = value;
    };

    remove(key) {
        if (this.isStorageAvailable('localStorage')) {
            window.localStorage.removeItem(key);
        }
        this.state['key'] = null;
    };
}

export default new DataStore();
