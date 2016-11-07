class AlertStore {
    constructor() {
        this.state = {
            alerts: []
        };
    }

    addAlert(message, type) {
        this.state.alerts.push({
            message: message,
            type: type
        });
    }

    getAlerts() {
        let alerts = JSON.parse(JSON.stringify(this.state.alerts));
        return this.state.alerts = [];
    }
}