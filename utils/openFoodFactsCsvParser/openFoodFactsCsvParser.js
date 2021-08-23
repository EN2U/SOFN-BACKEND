
const axios = require('axios')

const urlCompany = 'bonarea'
const file = 'OpenFoodFacts200k'
const max = 200

const url = 'https://es.openfoodfacts.org/cgi/search.pl?action=process&page_size=1000&json=true&page='

const _ = require('lodash')
const fs = require('fs')
const parsedJson = []

async function x () {
  let size = 0

  while (size < max) {
    size = size + 1
    console.log(size)

    const dataList = await axios.get(`${url}${size}`)

    dataList.data.products.forEach(element =>
      parsedJson.push(_.pick(element, ['_id', 'product_name', 'product_name_es']))
    )
    console.log(size)
  }
  fs.writeFile(`./data/comercial/parsed${file}.json`, JSON.stringify(parsedJson), (error) => {
    if (error) { console.error(error); return };
    console.log('File has been created')
  })
}

x()
