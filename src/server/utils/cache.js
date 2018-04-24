import { Transform } from 'stream'
import cache from 'js-cache'

export default (key) => {
  const bufferedChunks = []
  return new Transform({
    transform(data, enc, cb) {
      bufferedChunks.push(data)
      cb(null, data)
    },

    flush(cb) {
      cache.set(key, Buffer.concat(bufferedChunks))
      cb()
    }
  })
}