import fs from "fs";
import path from "path";
import { ApiPaths } from "../utils/constants.js";

export default function register(app) {
    app.post(ApiPaths.Api_FullSave, async (req, res) => {
        const { saveName } = req.body;

        if (!saveName || typeof saveName !== "string" || saveName.includes("..") || saveName.includes("/") || saveName.includes("\\")) {
            return res.status(400).json({ ok: false, message: "Invalid save name." });
        }

        const dataDir = path.resolve(process.cwd(), 'data');
        const savedGamesDir = path.join(dataDir, "saved_games");
        const newSaveDir = path.join(savedGamesDir, saveName);

        try {
            await fs.promises.mkdir(newSaveDir, { recursive: true });

            const filesToCopy = ["gamestate.json", "plotpoints.json", "progress.json", "quests.json"];

            for (const file of filesToCopy) {
                const sourcePath = path.join(dataDir, file);
                const destPath = path.join(newSaveDir, file);
                await fs.promises.copyFile(sourcePath, destPath);
            }

            res.json({ ok: true, message: `Game saved successfully as '${saveName}'.` });
        } catch (err) {
            console.error(`Error during full save for '${saveName}':`, err);
            res.status(500).json({ ok: false, message: "Failed to save game." });
        }
    });
}