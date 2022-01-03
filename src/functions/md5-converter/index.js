async function main(event) {
  console.log(event)
  return {
    body: JSON.stringify({message: 'success'}),
    statusCode: 201,
  };
}

module.exports = {main};