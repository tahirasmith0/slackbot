// server.js
import express from 'express';
import cors from 'cors'
import axios from 'axios';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const RAPIDAPI_KEY = '2a52a4bb7emsh5782e6172e47ce2p1ae9acjsnff286b393188';  // << your key
const RAPIDAPI_HOST = 'judge0-ce.p.rapidapi.com';

app.post('/run', async (req, res) => {
  const { code, language } = req.body;

  let language_id;
  if (language === 'python') language_id = 71;
  else if (language === 'javascript') language_id = 63;
  else if (language === 'cpp') language_id = 54;
  else {
    return res.status(400).json({ message: 'Unsupported language' });
  }

  try {
    const submissionResponse = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        source_code: code,
        language_id: language_id,
      },
      {
        headers: {
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY,
          'content-type': 'application/json'
        }
      }
    );

    res.json(submissionResponse.data);
  } catch (error) {
    console.error('Error submitting code to Judge0:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to run code', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
