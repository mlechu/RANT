const OpenAI = require('openai-api')
const openAI = new OpenAI(process.env.OPENAI_API_KEY);
const templates = require('../training-data').templates

const numPrompts = 4;
const samplePrompts = 'Create a list of questions for my React interview.\n1. Tell me why you used react over other libraries?\n2. What are the features of React?\n3. Differentiate between states and props.\n';

const getQuestions = async (keywordJson) => {
    try {
        p = await generatePrompts(keywordJson);
        const gptResponse = await openAI.complete({
            engine: 'davinci',
            prompt: p,
            maxTokens: 120,
            temperature: 0.75,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ['9.']
        });
                
        console.log(gptResponse.data, gptResponse.data.choices[0].text);
    } catch (err) {
        console.error(err.message)
    }
}

const generatePrompts = async function(keywordJson) {
    let templatesCopy = JSON.parse(JSON.stringify(templates));

    // delete some prompts
    let toDelete = templates.length - numPrompts
    for (let i = toDelete; i > 0; i--) {
        templatesCopy.splice(randIndex(templatesCopy.length), 1); 
    }
    console.log("Prompt template: ");
    console.log(templatesCopy);
    
    let prompt = "List of questions for my job interview:\n";

    // PLEASE refactor i wrote this 2.5 hours before the hackathon deadline LOL
    // actually change functionality first
    for (let i = 0; i < templatesCopy.length; i++) {
        for (blankspec of templatesCopy[i].a){
            // console.log(templatesCopy[i].q.replace('_blank_', keywordJson.languages[randIndex(keywordJson.companies.length)]))
            if (blankspec.includes('company') && keywordJson.companies.length > 0) {
                prompt = prompt.concat((i+1).toString() + '. ' + templatesCopy[i].q.replace('_blank_', keywordJson.companies[randIndex(keywordJson.companies.length)]) + '\n');
            } else if (blankspec.includes('language') && keywordJson.languages.length > 0) {
                prompt = prompt.concat((i+1).toString() + '. ' + templatesCopy[i].q.replace('_blank_', keywordJson.languages[randIndex(keywordJson.languages.length)]) + '\n');
            } else if (keywordJson.other.length > 0) {
                prompt = prompt.concat((i+1).toString() + '. ' + templatesCopy[i].q.replace('_blank_', keywordJson.other[randIndex(keywordJson.other.length)]) + '\n');
            }
        }
    }
    console.log('p: ', prompt);
    return prompt;
    // return new Promise((resolve, reject) => {
    //     resolve(prompt);
    // });
}

const randIndex = function(size) {
    return (Math.floor(Math.random() * size));
}

exports.getQuestions = getQuestions