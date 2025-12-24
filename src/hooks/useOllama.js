import { useState, useEffect } from 'react';
import api from '../utils/api';
import { ApiPaths } from '../utils/constants';

export function useOllama() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchModels() {
      const data = await api.get(ApiPaths.Api_Ollama_Models);
      setModels(data);
    }
    fetchModels();
  }, []);

  async function generate(prompt, settings, onCompletion) {
    const { ollamaModel, systemInstructions } = settings;
    setLoading(true);
    const payload = {
      prompt: prompt,
      model: ollamaModel,
      system: systemInstructions,
      options: {
        temperature: 0.85,
        top_p: 0.85,
        num_predict: 512,
        repeat_penalty: 1.15,
        num_ctx: 8192
      }
    };
    try {
      const data = await api.post(ApiPaths.Api_Ollama_Generate, payload);
      onCompletion(data || "No response")
    } catch (e) {
      onCompletion("Error: " + e.message)
    } finally {
      setLoading(false);
    }
  }

  return { models, generate, loading };
}
