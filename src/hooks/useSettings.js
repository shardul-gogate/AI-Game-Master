import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { ApiPaths } from '../utils/constants';

export function useSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get(ApiPaths.Api_Settings)
      .then((data) => setSettings(data));
  }, []);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    api.post(ApiPaths.Api_Settings, newSettings);
  };

  return { settings, saveSettings };
}
