import { readdir } from "fs/promises";

export class FileSystem {
    path: string;
    files?: string[];
    constructor(path: string, files?: string[]) {
        this.path = path;
        this.files = files;
    }

    async ReadFolder(): Promise<string[]> {
        try {
            const files = await readdir(this.path);
            return files;
        } catch (error) {
            throw error;
        }
    }

    async LoadFiles(){
        try {
            let items: ArrayBuffer[] = [];
            for(const file of this.files as string[]){
                const image = await Bun.file(`${this.path}/${file}`).arrayBuffer();
                items.push(image);
            }
            return items;
        } catch (error) {
            throw error;
        }
    }

        async FolderSize(){
        try {
            let items: number = 0;
            for(const file of this.files as string[]){
                const image = Bun.file(`${this.path}/${file}`).size;
                items += image;
            }
            return items;
        } catch (error) {
            throw error;
        }
    }
}