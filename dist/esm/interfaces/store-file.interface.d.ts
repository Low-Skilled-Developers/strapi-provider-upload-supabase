export interface StoreFile {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    folderPath: string;
}
