import { SupabaseClientOptions } from '@supabase/supabase-js'
import { FileOptions } from '@supabase/storage-js'

export interface ProviderOptions {
  url: string
  apiKey: string
  bucket: string
  clientOptions: SupabaseClientOptions<any>
  uploadParams: Omit<FileOptions, 'contentType'>
}
