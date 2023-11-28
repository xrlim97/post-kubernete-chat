
class ServerManager {
    constructor(webSocketManager, brokerManager) {
        this.webSocketManager = webSocketManager;
        this.brokerManager = brokerManager;
    }

    async connect() {
        await this.webSocketManager.connect();
        await this.brokerManager.connect();
    }

    async setListeners() {
        this.webSocketManager.setOnMessageReceivedListener((data, userId) => this.onMessageReceivedFromWebSocket(data, userId));
        this.brokerManager.attachReceptionListener((data, userId) => this.onMessageReceivedFromBroker(data, userId));
    
    }

    onMessageReceivedFromWebSocket(data, userId) {
        console.log(`Send data to broker: [${data}] - from WS ${userId}`);
        this.brokerManager.publish(data, userId);
    }

    onMessageReceivedFromBroker(data, userId) {
        console.log(`Send data to clients [${data}] - from Broker ${userId}`);
        this.webSocketManager.simpleSendDataToConsumers(data, userId);
    }
}

module.exports = ServerManager