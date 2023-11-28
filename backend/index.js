const { WebSocketManager } = require("./services/WebSocket");
const { BrokerConnection } = require('./services/BrokerManager');
const ServerManager = require('./services/ServerManager');

const bc = new BrokerConnection();
const wsm = new WebSocketManager();
const sm = new ServerManager(wsm, bc);

sm.connect().then(() =>{
    sm.setListeners();
});