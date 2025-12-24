import ollama from 'ollama';
import { ApiPaths, Ollama_Host_URL } from '../utils/constants.js';

export default function register(app) {
  app.get(ApiPaths.Api_Ollama_Models, async (_req, res) => {
    try {
      const response = await ollama.list();
      res.json({
        ok: true,
        message: 'Ollama models retrieved successfully',
        data: response.models,
      });
    } catch (err) {
      res.status(500).json({
        ok: false,
        message: 'Failed to retrieve Ollama models. Is Ollama running?',
        error: err.message,
      });
    }
  });

  app.post(ApiPaths.Api_Ollama_Generate, async (req, res) => {
    const { prompt, model, system, options } = req.body;

    try {
      const payload = {
        model,
        prompt,
        system,
        options,
        stream: false
      };

      const ollamaResponse = await fetch(`${Ollama_Host_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!ollamaResponse.ok) {
        const errText = await ollamaResponse.text();
        return res
          .status(502)
          .json({
            ok: false,
            message: "Ollama error",
            error: errText,
          });
      }

      const data = await ollamaResponse.json();
      return res.json({
        ok: true,
        message: "",
        data: data.response,
      });
    } catch (err) {
      return res
        .status(500)
        .json({
          ok: false,
          message: "An unexpected error occurred",
          error: err.message,
        });
    }
  });
}
