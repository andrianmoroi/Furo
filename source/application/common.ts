import * as path from "path"
import { promises as fs } from "fs"

export function isDev() {
    return process.env.DEVELOPMENT == "1"
}

export async function getAllMusicFiles() {
    const music = path.join(__dirname, "../../sounds/music")

    const files = await getFiles(music)

    return files
}

async function getFiles(dirPath: string) {
    let files: string[] = []
    const items = await fs.readdir(dirPath)

    for (let i = 0; i < items.length; i++) {
        let filePath = path.join(dirPath, items[i]);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            files = files.concat(await getFiles(filePath));
        } else {
            files.push(filePath)
        }
    }

    return files;
}