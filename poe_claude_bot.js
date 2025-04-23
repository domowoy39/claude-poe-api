
const axios = require('axios');

(async () => {
  const message = process.argv[2];
  if (!message) throw new Error('Нет входного сообщения');

  const query = `mutation ($bot: String!, $query: String!, $source: String!, $withChatBreak: Boolean!) {
    chatHelpers_sendMessageMutation(
      bot: $bot,
      query: $query,
      source: $source,
      withChatBreak: $withChatBreak
    ) {
      message { text }
    }
  }`;

  const response = await axios.post(
    'https://poe.com/api/gql_POST',
    {
      query,
      variables: {
        bot: "a2_Claude-3-Opus",
        query: message,
        source: "chat_break",
        withChatBreak: true
      }
    },
    {
      headers: {
        "Content-Type": "application/json",
        "poe-formkey": "1d48f86dd45046b37c75809fb18a1e46",
        "poe-tchannel": "poe-chan107-8888-khdmheplpsggkmmtleig"
      }
    }
  );

  const text = response.data?.data?.chatHelpers_sendMessageMutation?.message?.text;
  if (!text) throw new Error('Ответ Claude пустой');
  console.log(text.trim());
})().catch(err => {
  console.error('❌ Ошибка при генерации:', err.message);
  process.exit(1);
});
