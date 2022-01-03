const aws = require('aws-sdk');

exports.main = async (event) => {
    await publishSNS(event, process.env.SNS_TOPIC_ARN);
}

async function publishSNS(payload, topicArn) {
    const sns = new aws.SNS();
    await sns.publish({
        Message: JSON.stringify(payload),
        TargetArn: topicArn
    }).promise().then((data) => {
        console.log('SNS push succeeded: ', data);
    }).catch((err) => {
        console.error(err);
    });
}