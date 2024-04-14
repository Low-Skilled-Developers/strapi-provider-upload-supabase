export interface StrapiProviderSetupConfig<T = any> {
  provider: string,
  name: string,
  auth: Record<string, Record<'label' | 'type', string>>,
  init: (providerOptions?: any) => T
}
