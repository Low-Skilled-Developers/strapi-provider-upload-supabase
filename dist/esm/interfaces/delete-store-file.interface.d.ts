import { StoreFile } from './store-file.interface';
export interface DeleteStoreFile extends StoreFile {
    id: string | number;
    width: number | null;
    height: number | null;
    formats: unknown | null;
    url: string | null;
    previewUrl: string | null;
    provider: string;
    provider_metadata: unknown;
    createdAt: string;
    updatedAt: string;
}
