import { axios } from '@/api/request'

export function metadataFileDownload (fileId) {
  return axios.get('/openapi/sys/portal/tmMetadataFile/metadataFileDownload?fileId=' + fileId,
    {
      responseType: 'arraybuffer'
    }
  )
}
