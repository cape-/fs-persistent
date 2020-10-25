/**
 * @fileoverview Exposes fs-persistent methods.
 * @author Lautaro Capella <laucape@gmail.com>
 */
const fs = require('fs')
const path = require('path')

/**
 * Returns an instance of fs-persistent
 * @param {string} baseDir Partition for items  
 * @returns {object} Object with fs-persistent API methods.
 */
module.exports = function (baseDir = 'persistent') {
  var __baseDir = path.join(process.cwd(), baseDir)
  fs.mkdir(__baseDir, { recursive: true }, err => { if (err) throw err })
  return {
    _baseDir: __baseDir,
    /**
     * Returns an item stored with setItem()
     * @param {string} key The stored key you want to retrieve
     * @returns {*} The stored data or NULL if nothing is found
     */
    getItem: function (key) {
      try {
        return JSON.parse(fs.readFileSync(path.join(process.cwd(), this._baseDir, `${key}.json`), 'utf-8'))
      } catch (err) {
        return null
      }
    },
    /**
     * Stores any kind of data into de filesystem persistently
     * @param {string} key Any name you want to give it.
     * @param {*} data The data to store.
     * @returns {*} The same data to store.
     */
    setItem: function (key, data) {
      fs.writeFile(path.join(process.cwd(), this._baseDir, `${key}.json`), JSON.stringify(data), { encoding: 'utf-8' })
      return data
    },
    /**
     * Deletes an stored item
     * @param {string} key The stored key you want to delete
     * @returns {null} 
     */
    removeItem: (key) => persistent.setItem(key, null)
  }
}
