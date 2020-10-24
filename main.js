const fs = require('fs')

module.exports = function (baseDir = 'persistent') {
  fs.mkdir(baseDir, { recursive: true }, err => { if (err) throw err })
  return {
    _baseDir: baseDir,
    getItem: function (str) {
      try {
        return JSON.parse(fs.readFileSync(`./${this._baseDir}/${str}.json`, 'utf-8'))
      } catch (err) {
        return null
      }
    },
    setItem: function (str, data) {
      fs.writeFile(`./${this._baseDir}/${str}.json`, JSON.stringify(data), { encoding: 'utf-8' })
      return data
    },
    removeItem: (str) => persistent.setItem(str, null)
  }
}
