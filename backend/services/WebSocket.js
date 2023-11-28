const { PORT } = require('../constants');
const os = require('os');
const WebSocketServer = require('ws');

class WebSocketManager {

    constructor() {
        this.webSockets = [];
        this.webSocketsDict = {}
        this.sentMsg = [];
        this.onMessageReceivedListener = null;
    }

    async connect() {
        this.wss = new WebSocketServer.Server({ port: PORT });
        this.wss.getUniqueID = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4();
        };
        
        this.wss.on("connection", ws => {
            ws.id = this.wss.getUniqueID();
            this.webSockets.push(ws);
            this.webSocketsDict[`${ws.id}`] = ws;
            this.setListeners(ws);
            this.sendWelcomeMessage(ws);
            this.sendExistingMessages(ws);
        });
        console.log(`The WebSocket server is running on port: ${PORT}`);
    }

    setOnMessageReceivedListener(listener) {
        this.onMessageReceivedListener = listener;
    }

    simpleSendDataToConsumers(data, fromCustomerId) {
        console.log(`customer Id : ${fromCustomerId}`)
        if(Object.entries(this.webSocketsDict).includes(fromCustomerId)){
            return;
        }
        this.sentMsg.push(`${data}`);
        this.webSockets.forEach(ws => {
            try {
                ws.send(`${data}`);
            } catch (e) {
            }
        });
    }

    setListeners(ws) {
        ws.onmessage = data => {
            this.sentMsg.push(`${data.data}`);

            this.webSockets.forEach(webSocket => {
                if(webSocket.id === data.target.id){
                    return;
                }
                try {
                    webSocket.send(`${data.data}`);
                } catch (e) {
                }
            });

            if (this.onMessageReceivedListener == null) {
                return;
            }

            this.onMessageReceivedListener(`${data.data}`, `${data.target.id}`);

        };

        ws.onclose = () => {
            console.log("the client has disconnected");
        };

        ws.onerror = () => {
            console.log("Some error occurred")
        };

    }

    sendWelcomeMessage(ws) {
        ws.send(`Welcome to ${os.hostname()}`);
    }

    sendExistingMessages(ws) {
        this.sentMsg.forEach(msg => {
            try {
                ws.send(msg)
            } catch (e) {

            }
        });
    }

}

module.exports = {
    WebSocketManager
}