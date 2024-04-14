import { DeleteStoreFile } from './interfaces/delete-store-file.interface';
import { ProviderOptions } from './interfaces/provider-options.interface';
import { StrapiUploadProvider } from './interfaces/strapi-upload-provider.interface';
import { UploadFile } from './interfaces/upload-file.interface';
import { UploadStreamFile } from './interfaces/upload-stream-file.interface';
export declare class SupabaseUploadProvider implements StrapiUploadProvider {
    private readonly storage;
    private readonly options;
    static readonly provider = "supabase";
    static readonly auth: {
        url: {
            label: string;
            type: string;
        };
        apiKey: {
            label: string;
            type: string;
        };
        bucket: {
            label: string;
            type: string;
        };
        clientOptions: {
            label: string;
            type: string;
        };
        uploadParams: {
            label: string;
            type: string;
        };
    };
    static init(options?: ProviderOptions): SupabaseUploadProvider;
    constructor(options?: ProviderOptions);
    upload: (file: UploadFile) => Promise<{
        url: string;
    }>;
    uploadStream: (file: UploadStreamFile) => Promise<{
        url: string;
    }>;
    delete: (file: DeleteStoreFile) => Promise<import("@supabase/storage-js").FileObject | undefined>;
    getSignedUrl: (file: any) => Promise<{
        url: string;
    }>;
    isPrivate: () => boolean;
    private uploadToSupabase;
    private get fromBucket();
}
