import * as cookie from '../libraries/cookie';
class UserStore {
    constructor() {
        this.state = {};
        this.init();
    };

    init() {
        this.state.email = null;
        this.state.id = null;
        this.state.firstName = null;
        this.state.lastName = null;
        this.state.token = null;
        this.state.logged = false;
    };

    setUser(user) {
        this.state.id = user._id;
        this.state.email = user.email;
        this.state.firstName = user.firstName;
        this.state.lastName = user.lastName;
        this.state.logged = true;
    };

    setToken(token) {
        this.state.token = token;
        this.state.logged = true;
        cookie.set('token', token);
    };

    setCredentials(firstName, lastName) {
        this.state.firstName = firstName;
        this.state.lastName = lastName;
    };

    setEmail(email) {
        this.state.email = email;
    };

    getToken() {
        if (this.state.token === null) {
            this.state.token = cookie.get('token');
        }
        return this.state.token;
    };

    getCredentials() {
        return {firstName: this.state.firstName, lastName: this.state.lastName};
    };

    getEmail() {
        return this.state.email;
    };

    getID() {
        return this.state.id;
    };

    logout() {
        cookie.remove('token');
        this.init();
    };

}

export default new UserStore();