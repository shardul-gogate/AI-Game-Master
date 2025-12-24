import { readFile, writeFile } from '../utils/fileHelpers.js';
import { FilePaths, ApiPaths } from '../utils/constants.js';

export default function register(app) {
  app.get(ApiPaths.Api_Settings, async (req, res) => {
    try {
      const data = await readFile(FilePaths.FilePath_OllamaSettings);
      res.json({
        ok: true,
        message: 'Settings retrieved successfully',
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        ok: false,
        message: 'Failed to retrieve settings',
        error: err.message,
      });
    }
  });

  app.post(ApiPaths.Api_Settings, async (req, res) => {
    try {
      await writeFile(FilePaths.FilePath_OllamaSettings, req.body);
      res.json({ ok: true, message: 'Settings saved successfully' });
    } catch (err) {
      res.status(500).json({
        ok: false,
        message: 'Failed to save settings',
        error: err.message,
      });
    }
  });
}
