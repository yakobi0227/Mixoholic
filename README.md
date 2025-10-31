# 🍸 Mixoholic

An AI-powered mixology assistant that generates creative cocktail recipes from leftover or low-selling spirits using OpenAI's GPT technology.

## Features

- **AI-Generated Recipes**: Generate unique cocktail recipes based on available ingredients
- **Recipe Refinement**: Refine existing recipes with custom feedback (e.g., "make it sweeter", "add more citrus")
- **Modern UI**: Clean, responsive React interface built with Vite
- **RESTful API**: Express backend with `/generate` and `/refine` endpoints

## Project Structure

```
Mixoholic/
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx     # Main application component
│   │   └── App.css     # Application styles
│   ├── .env.example    # Environment variables template
│   └── package.json
├── server/              # Node.js + Express backend
│   ├── index.js        # Server entry point with API endpoints
│   ├── .env.example    # Environment variables template
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yakobi0227/Mixoholic.git
cd Mixoholic
```

### 2. Set up the backend

```bash
cd server
npm install

# Create .env file from example
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your_actual_api_key_here
```

### 3. Set up the frontend

```bash
cd ../client
npm install

# (Optional) Create .env file if you need to change the API URL
cp .env.example .env
```

### 4. Run the application

In one terminal, start the backend:

```bash
cd server
npm run dev
```

In another terminal, start the frontend:

```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## API Endpoints

### POST `/generate`

Generate a cocktail recipe from ingredients.

**Request Body:**
```json
{
  "ingredients": ["vodka", "lime juice", "simple syrup", "mint"]
}
```

**Response:**
```json
{
  "name": "Mojito Moderne",
  "ingredients": ["2 oz vodka", "1 oz lime juice", "0.75 oz simple syrup", "8-10 mint leaves"],
  "instructions": ["Muddle mint with simple syrup", "Add vodka and lime juice", "Shake with ice", "Strain into glass"],
  "garnish": "Fresh mint sprig and lime wheel",
  "glassType": "Highball glass"
}
```

### POST `/refine`

Refine an existing recipe based on feedback.

**Request Body:**
```json
{
  "recipe": { /* existing recipe object */ },
  "feedback": "Make it sweeter and add a fruity twist"
}
```

**Response:**
```json
{
  "name": "Sweet Berry Mojito",
  "ingredients": ["2 oz vodka", "1 oz lime juice", "1 oz simple syrup", "8-10 mint leaves", "5 fresh raspberries"],
  "instructions": ["Muddle mint and raspberries with simple syrup", "Add vodka and lime juice", "Shake with ice", "Double strain into glass"],
  "garnish": "Fresh mint sprig, lime wheel, and raspberries",
  "glassType": "Highball glass"
}
```

## Technologies Used

### Frontend
- React 18
- Vite
- CSS3

### Backend
- Node.js
- Express
- OpenAI API
- CORS
- dotenv

## Environment Variables

### Server (.env)
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

### Client (.env) - Optional
```
VITE_API_URL=http://localhost:3001
```

## Development

- Backend runs on `http://localhost:3001`
- Frontend runs on `http://localhost:5173`
- Hot reload is enabled for both frontend and backend during development

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.