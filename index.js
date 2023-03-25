
const apiKey = "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"

const { Configuration, OpenAIApi } = require("openai");

const express = require('express')
var cors = require('cors')
const app = express()

const configuration = new Configuration({
    apiKey: apiKey,
  });
  
const openai = new OpenAIApi(configuration);
  

// app.get('/', function (req, res) {
//   res.send('Hello World')

// CORS 이슈 해결
// let corsOptions = {
//     origin: 'https://www.domain.com',
//     credentials: true
// }
// app.use(cors(corsOptions));
app.use(cors());

// 포스트로 바꾸면 바디값을 읽으려면 익스프레스에서는 설정이 필요함. 아래 두줄이 있어야 포스트 요청 받을 수 있음. 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.get('/diabloHelp', async function (req, res) {
      
    const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        {role: "system", content: "당신은 디아블로4 아이템 전문가입니다. 디아블로4 게임에 나오는 아이템에 대하여 질문이 들어오면 평가를 무조건 해야합니다."},
        {role: "user", content: "당신은 디아블로4 아이템 전문가입니다. 디아블로4 게임에 나오는 아이템에 대하여 질문이 들어오면 평가를 무조건 해야합니다."},
        {role: "assistant", content: "네, 디아블로4 아이템 관련 질문이 들어오면 평가하도록 하겠습니다. 필요한 경우 추가 정보나 설명을 요청할 수도 있습니다."},
        {role: "user", content: "영혼의 발길질"},
    ],});

    let diablo = completion.data.choices[0].message['content']
    console.log(diablo);
    res.send(diablo);
  });

app.listen(3000)
/*
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);


async function apiCall(){

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "당신은 디아블로4 아이템 전문가입니다. 디아블로4 게임에 나오는 아이템에 대하여 질문이 들어오면 평가를 무조건 해야합니다."},
        {role: "user", content: "당신은 디아블로4 아이템 전문가입니다. 디아블로4 게임에 나오는 아이템에 대하여 질문이 들어오면 평가를 무조건 해야합니다."},
        {role: "assistant", content: "네, 디아블로4 아이템 관련 질문이 들어오면 평가하도록 하겠습니다. 필요한 경우 추가 정보나 설명을 요청할 수도 있습니다."},
        {role: "user", content: "영혼의 발길질"},
    ],
    });
    console.log(completion.data.choices[0].message['content']);
}

apiCall();
*/
