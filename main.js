/**
 * @fileoverview Exposes fs-persistent methods.
 * @author Lautaro Capella <laucape@gmail.com>
 */
const fs = require('fs')
const path = require('path')

/**
 * @constant __defaultBaseDir Default baseDir
 */
const __defaultBaseDir = 'persistent'

/**
 * Returns an instance of fs-persistent
 * @param {string} baseDir Partition for items  
 * @returns {object} Object with fs-persistent API methods.
 */
module.exports = function (baseDir = __defaultBaseDir) {
  const __baseDir = path.join(process.cwd(), baseDir)
  fs.mkdirSync(__baseDir, { recursive: true })
  return {
    /**
     * Returns an item stored with setItem()
     * @param {string} key The stored key you want to retrieve
     * @returns {*} The stored data or NULL if nothing is found
     */
    getItem: function (key) {
      try {
        // the "|| __defaultBaseDir" is needed for method extraction, where this._baseDir = undefined
        return JSON.parse(fs.readFileSync(path.join(__baseDir, `${key}.json`), 'utf-8'))
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
      // the "|| __defaultBaseDir" is needed for method extraction, where this._baseDir = undefined
      fs.writeFile(path.join(__baseDir, `${key}.json`), JSON.stringify(data), { encoding: 'utf-8' }, err => { if (err) throw err })
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
