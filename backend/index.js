import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google-ai/generative-ai";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

if (!process.env.GOOGLE_API_KEY) {
  console.error('Missing GOOGLE_API_KEY in environment');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/classify', async (req, res) => {
  const { image } = req.body;
  if (!image) return res.status(400).json({ error: 'image is required' });

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: 'Identify the bird species from this photo. Return only its common name.'
            },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: image
              }
            }
          ]
        }
      ]
    });

    const species = result.response.text().trim();
    res.json({ species });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: 'Failed to classify image' });
  }
});

app.get('/', (_, res) => {
  res.send('Birdwatcher backend running');
});

app.listen(port, () => console.log(`Backend listening on ${port}`));