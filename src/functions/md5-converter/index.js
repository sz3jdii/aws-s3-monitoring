async function main(event) {
  const encryptedKeys = [];
  for (const record of event.Records){
    const md5 = record.s3.object.eTag;
    encryptedKeys.push(md5);
  }
  return {
    body: JSON.stringify({message: 'success', encryptedKeys: encryptedKeys}),
    statusCode: 201,
  };
}

module.exports = {main};