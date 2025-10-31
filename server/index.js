import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Mixoholic API is running' });
});

// Generate cocktail recipe endpoint
app.post('/generate', async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: 'Please provide at least one ingredient' });
    }

    const prompt = `You are a professional mixologist. Create a unique cocktail recipe using the following ingredients: ${ingredients.join(', ')}.

Please provide:
1. A creative cocktail name
2. Complete list of ingredients with measurements
3. Step-by-step instructions
4. Garnish suggestions
5. Glass type recommendation

Format the response as JSON with keys: name, ingredients, instructions, garnish, glassType.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    const recipe = JSON.parse(completion.choices[0].message.content);
    res.json(recipe);
  } catch (error) {
    console.error('Error generating cocktail:', error);
    res.status(500).json({ error: 'Failed to generate cocktail recipe' });
  }
});

// Refine cocktail recipe endpoint
app.post('/refine', async (req, res) => {
  try {
    const { recipe, feedback } = req.body;

    if (!recipe || !feedback) {
      return res.status(400).json({ error: 'Please provide both recipe and feedback' });
    }

    const prompt = `You are a professional mixologist. Here is a cocktail recipe:
${JSON.stringify(recipe, null, 2)}

The user wants to refine it with the following feedback: "${feedback}"

Please provide an updated recipe incorporating this feedback.

Format the response as JSON with keys: name, ingredients, instructions, garnish, glassType.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const refinedRecipe = JSON.parse(completion.choices[0].message.content);
    res.json(refinedRecipe);
  } catch (error) {
    console.error('Error refining cocktail:', error);
    res.status(500).json({ error: 'Failed to refine cocktail recipe' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
