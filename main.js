const fs = require('fs')

module.exports = function (baseDir = 'persistent') {
  fs.mkdir(baseDir, { recursive: true }, err => { if (err) throw err })
  return {
    _baseDir: baseDir,
    getItem: function (key) {
      try {
        return JSON.parse(fs.readFileSync(`./${this._baseDir}/${key}.json`, 'utf-8'))
      } catch (err) {
        return null
      }
    },
    setItem: function (key, data) {
      fs.writeFile(`./${this._baseDir}/${key}.json`, JSON.stringify(data), { encoding: 'utf-8' })
      return data
    },
    removeItem: (key) => persistent.setItem(key, null)
  }
}
