/**
 * @fileoverview Exposes fs-persistent methods.
 * @author Lautaro Capella <laucape@gmail.com>
 */
const fs = require('fs')
const path = require('path')

/**
 * Fallback constants
 * 
 * @constant __defaultBaseDir Default baseDir
 */
const __defaultBaseDir = 'persistent'

/**
 * `reviver` callback type.
 *
 * @callback reviverCallback
 * @param {string} key Key of JSON object
 * @param {any} value Value for that key
 */

/**
 * Returns an instance of fs-persistent
 * @param {string} baseDir Partition for items  
 * @param {reviverCallback} reviver (Optional) Reviver function for callback. For further detail, see documentation
 * @returns {object} Object with fs-persistent API methods.
 */
module.exports = function (baseDir = __defaultBaseDir, reviver = (key, value) => value) {
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
        return JSON.parse(fs.readFileSync(path.join(__baseDir, `${key}.json`), 'utf8'), reviver)
      } catch (err) {
        return null
      }
    },
    /**
     * Stores any kind of data into de filesystem persistently
     * @param {string} key Any name you want to give it.
     * @param {*} data The data to store.
     * @param {boolean} async If `true` the filesystem write operation is made **async**. Default `false` (sync write). Async is better for example in a mass data storage process or when you need to speed up response time. But it __will not work__ if used immediately before a getItem() call.
     * @returns {*} The same data to store.
     */

    setItem: function (key, data, async = false) {
      if (async)
        fs.writeFile(path.join(__baseDir, `${key}.json`), JSON.stringify(data), { encoding: 'utf8' }, err => { if (err) throw err })
      else
        fs.writeFileSync(path.join(__baseDir, `${key}.json`), JSON.stringify(data), { encoding: 'utf8' })
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
