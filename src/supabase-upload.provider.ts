import { SupabaseClient, createClient } from '@supabase/supabase-js'

import { getFilePath } from './helpers/get-file-path.helper'
import { DeleteStoreFile } from './interfaces/delete-store-file.interface'
import { ProviderOptions } from './interfaces/provider-options.interface'
import { StrapiUploadProvider } from './interfaces/strapi-upload-provider.interface'
import { UploadFile } from './interfaces/upload-file.interface'
import { UploadStreamFile } from './interfaces/upload-stream-file.interface'

export class SupabaseUploadProvider implements StrapiUploadProvider {
  private readonly storage: SupabaseClient['storage']
  private readonly options: ProviderOptions

  public static readonly provider = 'supabase'
  public static readonly auth = {
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
  }

  static init(options?: ProviderOptions) {
    return new SupabaseUploadProvider(options)
  }

  constructor(options?: ProviderOptions) {
    if(!options) {
      // FIXME: add options normalizer
      throw new TypeError('Invalid provider configuration')
    }

    this.options = options
    this.storage = createClient(options.url, options.apiKey, options.clientOptions).storage
  }

  public upload = async (file: UploadFile) => {
    const publicUrl = await this.uploadToSupabase(file, 'buffer')
    // FIXME: need to work "copy public url feature"
    Reflect.set(file, 'url', publicUrl)

    // NOTE: doesn't affect anything
    return {
      url: publicUrl,
    }
  }

  public uploadStream = async (file: UploadStreamFile) => {
    const publicUrl = await this.uploadToSupabase(file, 'stream')
    // FIXME: need to work "copy public url feature"
    Reflect.set(file, 'url', publicUrl)

    // NOTE: doesn't affect anything
    return {
      url: publicUrl,
    }
  }

  public delete = async (file: DeleteStoreFile) => {
    const path = getFilePath(file)

    const { data, error } = await this.fromBucket.remove([path])
    if(error) {
      console.log('===> delete error: ', error)

      throw error
    }

    return data.at(0)
  }

  // checkFileSize(file, { sizeLimit }) {
  //   // (optional)
  //   // implement your own file size limit logic
  // },

  public getSignedUrl = async (file: any) => {
    console.log('===> getSignedUrl file: ', file)
    const params = {
      path: file.path,
      expires: 60, // URL expiration time in seconds
    }

    const { data, error } = await this.fromBucket.createSignedUrl(params.path, params.expires)
    if(error) {
      console.log('===> getSignedUrl error: ', error)
      throw error
    }

    console.log('===> getSignedUrl data: ', data)

    return {
      url: data.signedUrl,
    }
  }

  // CHECK: if getSignedUrl called when "isPrivate: true"
  public isPrivate = () => {
    // (optional)
    // if it is private, file urls will be signed
    // Returns a boolean
    return false
  }

  private async uploadToSupabase(file: UploadFile | UploadStreamFile, body: 'buffer' | 'stream' = 'buffer'): Promise<string> {
    const path = getFilePath(file)
    const fileBody = body === 'buffer' ? file.buffer  : file.getStream()
    const fileOptions = {
      ...this.options.uploadParams,
      contentType: file.mime,
    }

    const uploadResponse = await this.fromBucket.upload(path, fileBody, fileOptions)
    if(uploadResponse.error) {
      console.error('===> upload error: ', uploadResponse.error)
      throw uploadResponse.error
    }

    const { publicUrl } = this.fromBucket.getPublicUrl(uploadResponse.data.path).data

    return publicUrl
  }

  private get fromBucket() {
    return this.storage.from(this.options.bucket)
  }
}
