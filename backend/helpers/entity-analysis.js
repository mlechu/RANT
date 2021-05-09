const language = require('@google-cloud/language');

const client = new language.LanguageServiceClient();


const analyze = async function(text) {  

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  // console.log(text);

  const [result] = await client.analyzeEntities({document});
  // console.log(result)
  const entities = result.entities;

  entities.sort((a, b)=>{
    return b.salience-a.salience;
  }) // in descending order of usefulness

  
  // console.log('Entities:');
  // entities.forEach(entity => {
  //   console.log(entity.name);
  //   console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
  //   if (entity.metadata && entity.metadata.wikipedia_url) {
  //     console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
  //   }
  // });
  return entities;
}

module.exports = {
    analyze
} 