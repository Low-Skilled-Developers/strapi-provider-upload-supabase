import { DeleteStoreFile } from './delete-store-file.interface'
import { UploadFile } from './upload-file.interface'
import { UploadStreamFile } from './upload-stream-file.interface'

export interface StrapiUploadProvider {
  upload: (file: UploadFile) => void,
  uploadStream: (file: UploadStreamFile) => void,
  getSignedUrl: (file: unknown) => Record<'url', string> | Promise<Record<'url', string>>
  delete: (file: DeleteStoreFile) => void,
  isPrivate: () => boolean,
}
