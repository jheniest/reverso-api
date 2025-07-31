# Reverso API Server

A RESTful API server wrapping the unofficial Reverso translation services, ready for deployment on Render.

## 🚀 Live API Endpoints

Once deployed, your API will be available at: `https://your-app-name.onrender.com`

### Available Endpoints:

- **GET /** - API documentation and endpoint list
- **GET /api/translate** - Translation service
- **GET /api/context** - Context examples
- **GET /api/spellcheck** - Spell checking
- **GET /api/synonyms** - Synonyms lookup
- **GET /health** - Health check

## 📖 API Usage Examples

### Translation
```
GET /api/translate?text=hello&from=english&to=portuguese
```

Response:
```json
{
  "ok": true,
  "text": "hello",
  "source": "english",
  "target": "portuguese",
  "translations": ["olá", "oi", "alô"],
  "detected_language": "eng"
}
```

### Context Examples
```
GET /api/context?text=good morning&from=english&to=portuguese
```

### Spell Check
```
GET /api/spellcheck?text=helo world&lang=english
```

### Synonyms
```
GET /api/synonyms?text=beautiful&lang=english
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start server
npm start

# Test the API
npm test
```

## 🌐 Deploy to Render

1. Push this code to GitHub
2. Connect your GitHub repo to Render
3. Render will automatically use the `render.yaml` configuration
4. Your API will be live at `https://your-app-name.onrender.com`

## 📝 Supported Languages

The API supports the same languages as Reverso.net including:
- English, Portuguese, Spanish, French, German, Italian, Russian, Arabic, Chinese, Japanese, and more.

## ⚡ Rate Limiting

This API uses the Reverso website internally, so please be respectful with request frequency to avoid being blocked.

## 📄 License

MIT License - Feel free to use this for your projects!
