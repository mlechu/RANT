const OpenAI = require('openai-api')
const openAI = new OpenAI(process.env.OPENAI_API_KEY);

const getQuestions = async (keywords) => {
    try {
        const gptResponse = await openAI.complete({
            engine: 'davinci',
            prompt: 'Create a list of questions for my React interview.\n1. Tell me why you used react over other libraries?\n2. What are the features of React?\n3. Differentiate between states and props.\n',
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

exports.getQuestions = getQuestions