const writeFileSync = require('fs').writeFileSync

/**
 * @class Standings
 */
module.exports = class Standings {
  /**
   * @constructor
   */
  constructor (browser, page) {
    this.browser = browser
    this.page = page

    this.standings = []
    this.url = 'https://www.carrefour.es/?q=chocolate&page=1'
  }

  /**
   * @method main
   */
  async main () {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' })
    await this.page.waitFor(2000)

    // Decided to add more data for fun. Notice how I also refactored to cut down on some boilerplate
    // by adding a reusable function inside of the map statement.
    await this.page.evaluate(() => {
      const elements = document.getElementsByClassName('ebx-result-price__value')
      console.log(elements)
    })

    // this.writeToJson()
    // return this.standings
  }

  /**
   * @method writeToJson
   */
  writeToJson () {
    writeFileSync('./data/standings.json', JSON.stringify(this.standings))
  }
}
