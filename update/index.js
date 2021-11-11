const dynamoose = require('dynamoose');

exports.handler = async (event) => {

  const jsonBody = JSON.parse(event.body);

  const peopleSchema = new dynamoose.Schema({
    'id': Number,
    'name': String,
    'age': Number
  });

  const peopleTable = dynamoose.model('people', peopleSchema);

  let data = null;
  let status = 500;

  try{
    const id = event.pathParameters.id
    data = await peopleTable.update({id: id});
    status = 200;

  } catch (error){
    status = 400;
    data = new Error(error);
  }

  const response = {
    statusCode: status,
    body: JSON.stringify(data),
    message: 'This person has been deleted.'
  };
  return response;
};