/// <reference types="node" />
/// <reference types="node" />
import { ReadStream } from 'node:tty';
export interface UploadFile {
    name: string;
    alternativeText?: string;
    caption: string | null;
    folder: string | null;
    folderPath: string;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    sizeInBytes: number;
    tmpWorkingDirectory: string;
    getStream: () => ReadStream;
    buffer: Buffer;
}
