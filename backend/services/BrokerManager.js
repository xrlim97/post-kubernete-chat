const amqplib = require('amqplib');
const { BROKER_MQ_DOMAIN } = require('../constants');
const { getRandomInt } = require('../utils.js/utils-numbers');

class BrokerConnection {
    constructor() {
        this.amqp_url = `amqp://${BROKER_MQ_DOMAIN}`;
        this.queue = `message_queue_${getRandomInt(1000)}`;
        this.exchange = "massage_exchange";
        this.rkey = "message_route";
        this.conn = null;
        this.ch = null;
    }

    async connect() {
        this.conn = await amqplib.connect(this.amqp_url, "heartbeat=60");
        this.ch = await this.conn.createChannel();
        await this.ch.assertExchange(this.exchange, 'direct', { durable: true }).catch(console.error);
        await this.ch.assertQueue(this.queue, { durable: true });
        await this.ch.bindQueue(this.queue, this.exchange, this.rkey);
        console.log(`Connected to broker`);
    }

    async publish(msg, userId) {
        console.log(msg, userId);
        await this.ch.publish(this.exchange, this.rkey, Buffer.from(`{"data": "${msg}", "userId":"${userId}"}`));
    }

    attachReceptionListener(func) {
        this.ch.consume(this.q, (data) => {
            console.log(data.content.toString());
            var json = JSON.parse(data.content.toString());
            func(json.data, json.userId);
        });
    }
}

module.exports = {
    BrokerConnection
}