import { createClient } from '@supabase/supabase-js';
import { getFilePath } from './helpers/get-file-path.helper';
export class SupabaseUploadProvider {
    storage;
    options;
    static provider = 'supabase';
    static auth = {
        url: {
            label: "Supabase Api Url",
            type: "text"
        },
        apiKey: {
            label: "Supabase Api Key",
            type: "text"
        },
        bucket: {
            label: "Supabase storage bucket (e.g. 'my-bucket')",
            type: "text"
        },
        // directory: {
        //   label: "Directory to pass uploaded files",
        //   type: "text"
        // },
        clientOptions: {
            label: "Supabase client options",
            type: "object",
        },
        uploadParams: {
            label: "Supabase upload params",
            type: "object",
        }
    };
    static init(options) {
        return new SupabaseUploadProvider(options);
    }
    constructor(options) {
        if (!options) {
            // FIXME: add options normalizer
            throw new TypeError('Invalid provider configuration');
        }
        this.options = options;
        this.storage = createClient(options.url, options.apiKey, options.clientOptions).storage;
    }
    upload = async (file) => {
        const publicUrl = await this.uploadToSupabase(file, 'buffer');
        // FIXME: need to work "copy public url feature"
        Reflect.set(file, 'url', publicUrl);
        // NOTE: doesn't affect anything
        return {
            url: publicUrl,
        };
    };
    uploadStream = async (file) => {
        const publicUrl = await this.uploadToSupabase(file, 'stream');
        // FIXME: need to work "copy public url feature"
        Reflect.set(file, 'url', publicUrl);
        // NOTE: doesn't affect anything
        return {
            url: publicUrl,
        };
    };
    delete = async (file) => {
        const path = getFilePath(file);
        const { data, error } = await this.fromBucket.remove([path]);
        if (error) {
            // console.log('===> delete error: ', error)
            throw error;
        }
        return data.at(0);
    };
    // checkFileSize(file, { sizeLimit }) {
    //   // (optional)
    //   // implement your own file size limit logic
    // },
    getSignedUrl = async (file) => {
        // console.log('===> getSignedUrl file: ', file)
        const params = {
            path: file.path,
            expires: 60, // URL expiration time in seconds
        };
        const { data, error } = await this.fromBucket.createSignedUrl(params.path, params.expires);
        if (error) {
            // console.log('===> getSignedUrl error: ', error)
            throw error;
        }
        // console.log('===> getSignedUrl data: ', data)
        return {
            url: data.signedUrl,
        };
    };
    // CHECK: if getSignedUrl called when "isPrivate: true"
    isPrivate = () => {
        // (optional)
        // if it is private, file urls will be signed
        // Returns a boolean
        return false;
    };
    async uploadToSupabase(file, body = 'buffer') {
        const path = getFilePath(file);
        const fileBody = body === 'buffer' ? file.buffer : file.getStream();
        const fileOptions = {
            contentType: file.mime,
            duplex: 'half',
            ...this.options.uploadParams,
        };
        const uploadResponse = await this.fromBucket.upload(path, fileBody, fileOptions);
        if (uploadResponse.error) {
            // console.error('===> upload error: ', uploadResponse.error)
            throw uploadResponse.error;
        }
        const { publicUrl } = this.fromBucket.getPublicUrl(uploadResponse.data.path).data;
        return publicUrl;
    }
    get fromBucket() {
        return this.storage.from(this.options.bucket);
    }
}
