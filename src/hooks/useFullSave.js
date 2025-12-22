import { ApiPaths } from "../utils/constants";
import api from "../utils/api";

export function useFullSave() {
  const saveFullGame = (saveName) => {
    api.post(ApiPaths.Api_FullSave, { saveName });
  };

  return { saveFullGame };
}