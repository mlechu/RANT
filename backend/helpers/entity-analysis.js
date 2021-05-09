const language = require('@google-cloud/language');

const client = new language.LanguageServiceClient();
const tdata = require('../training-data')

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
  let processed = {
    skills: [],
    companies: [],
    other: [],
  }
  entities.forEach(entity => {
    if (tdata.skills.includes(entity.name)) {
      processed.skills.push(entity.name)
    } else if (tdata.companies.includes(entity.name)){
      processed.companies.push(entity.name)
    } else if (entity.salience > 0.009) {
      processed.other.push(entity.name)
    }
    // console.log(entity.name);
    // console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
    // if (entity.metadata && entity.metadata.wikipedia_url) {
    //   console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
    // }
  });
  console.log(processed)
  return processed;
  // processed is an object
  // processed.companies = []
  // processed.languages = []
}

module.exports = {
    analyze
} 