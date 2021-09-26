require('dotenv').config();
const SNSClient = require("./snsClient").SNSClient;

exports.handler = async function (event) {
    try {
        const commandType = event.type ? event.type : '';

        const snsClient = new SNSClient();
        const snsMessage = {
            Message: JSON.stringify({commandType}),
            MessageAttributes: {MessageGroupId: {DataType: 'String', StringValue: 'a-group'}},
            TopicArn: 'arn:aws:sns:us-east-1:771384749710:smart-drop-off-box-sns-topic.fifo'
        };
        const result = await snsClient.publishSNSMessage(snsMessage);
        return {responseCode: 200, body: {result}};
    } catch (e) {
        return e;
    }
};