import { UploadFile } from './upload-file.interface'

export interface UploadStreamFile extends UploadFile {
  stream: ReturnType<UploadFile['getStream']>,
}
