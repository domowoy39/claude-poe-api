
const express = require('express');
const { exec } = require('child_process');
const app = express();
require('dotenv').config();

app.use(express.json());

app.post('/generate', (req, res) => {
  const input = req.body.story?.trim();

  if (!input || input.length < 10) {
    return res.status(400).json({ error: 'Недостаточно текста для генерации.' });
  }

  console.log('✅ Запрос получен на /generate');
  console.log('📨 Тело запроса:', input);

  exec(`node poe_claude_bot.js "${input.replace(/"/g, '\"')}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Ошибка Claude:', error.message);
      return res.status(500).json({ error: 'Ошибка генерации' });
    }
    if (stderr) {
      console.error('⚠️ Предупреждение:', stderr);
    }

    console.log('💬 Ответ Claude:', stdout);
    res.json({ result: stdout.trim() });
  });
});

app.listen(3000, () => {
  console.log('🟢 Сервер запущен на порту 3000');
});
