import { useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [refineFeedback, setRefineFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const ingredientList = ingredients
        .split(',')
        .map(i => i.trim())
        .filter(i => i.length > 0);

      if (ingredientList.length === 0) {
        setError('Please enter at least one ingredient');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredientList }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate cocktail');
      }

      const data = await response.json();
      setRecipe(data);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async (e) => {
    e.preventDefault();
    if (!refineFeedback.trim() || !recipe) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/refine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipe, feedback: refineFeedback }),
      });

      if (!response.ok) {
        throw new Error('Failed to refine cocktail');
      }

      const data = await response.json();
      setRecipe(data);
      setRefineFeedback('');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🍸 Mixoholic</h1>
        <p className="tagline">AI-Powered Mixology Assistant</p>
      </header>

      <main className="container">
        <section className="input-section">
          <h2>Create Your Cocktail</h2>
          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label htmlFor="ingredients">
                Enter your ingredients (comma-separated):
              </label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., vodka, lime juice, simple syrup, mint"
                rows="3"
                disabled={loading}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Generating...' : 'Generate Cocktail'}
            </button>
          </form>
        </section>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {recipe && (
          <section className="recipe-section">
            <div className="recipe-card">
              <h2 className="recipe-name">{recipe.name}</h2>
              
              <div className="recipe-details">
                <div className="detail-group">
                  <h3>🥃 Glass Type</h3>
                  <p>{recipe.glassType}</p>
                </div>

                <div className="detail-group">
                  <h3>📝 Ingredients</h3>
                  {Array.isArray(recipe.ingredients) ? (
                    <ul>
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{recipe.ingredients}</p>
                  )}
                </div>

                <div className="detail-group">
                  <h3>👨‍🍳 Instructions</h3>
                  {Array.isArray(recipe.instructions) ? (
                    <ol>
                      {recipe.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  ) : (
                    <p>{recipe.instructions}</p>
                  )}
                </div>

                <div className="detail-group">
                  <h3>🌿 Garnish</h3>
                  <p>{recipe.garnish}</p>
                </div>
              </div>

              <div className="refine-section">
                <h3>Refine Recipe</h3>
                <form onSubmit={handleRefine}>
                  <div className="form-group">
                    <textarea
                      value={refineFeedback}
                      onChange={(e) => setRefineFeedback(e.target.value)}
                      placeholder="e.g., Make it sweeter, Add more citrus, Make it less strong..."
                      rows="2"
                      disabled={loading}
                    />
                  </div>
                  <button type="submit" disabled={loading || !refineFeedback.trim()} className="btn-secondary">
                    {loading ? 'Refining...' : 'Refine Recipe'}
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
