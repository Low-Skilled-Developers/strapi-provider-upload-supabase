import { StrapiProviderSetupConfig } from './interfaces/strapi-provider-setup-config.interface'
import { SupabaseUploadProvider } from './supabase-upload.provider'

export const supabaseUploadProviderSetupConfig: StrapiProviderSetupConfig<SupabaseUploadProvider> = {
  provider: SupabaseUploadProvider.provider,
  name: SupabaseUploadProvider.name,
  auth: SupabaseUploadProvider.auth,
  init: SupabaseUploadProvider.init
}
