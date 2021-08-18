const fs = require('fs')

let bedcaJson = require('../../data/bedcaDatabase.json')

const _ = require('lodash')
console.log(Object.keys(bedcaJson[0]))
bedcaJson = bedcaJson.map(element => {
  return _.pick(element, [
    'f_id',
    'f_ori_name',
    'edible_portion',
    'alcohol (etanol)',
    'energía, total',
    'grasa, total (lipidos totales)',
    'proteina, total',
    'agua (humedad)',
    'carbohidratos',
    'fibra, dietetica total',
    'colesterol',
    'Vitamina A equivalentes de retinol de actividades de retinos y carotenoides',
    'Vitamina D',
    'Viamina E equivalentes de alfa tocoferol de actividades de vitámeros E',
    'folato, total',
    'equivalentes de niacina, totales',
    'riboflavina',
    'tiamina',
    'Vitamina B-12',
    'Vitamina B-6, Total',
    'Vitamina C (ácido ascórbico)',
    'calcio',
    'magnesio',
    'sodio',
    'fósforo',
    'ioduro',
    'selenio, total',
    'zinc (cinc)'
  ])
})

bedcaJson.map((element) => {
  delete Object.assign(element, { alcohol: element['alcohol (etanol)'] })['alcohol (etanol)']
  delete Object.assign(element, { energia: element['energía, total'] })['energía, total']
  delete Object.assign(element, { grasa: element['grasa, total (lipidos totales)'] })['grasa, total (lipidos totales)']
  delete Object.assign(element, { proteina: element['proteina, total'] })['proteina, total']
  delete Object.assign(element, { agua: element['agua (humedad)'] })['agua (humedad)']
  delete Object.assign(element, { fosforo: element['fósforo'] })['fósforo']
  delete Object.assign(element, { fibra: element['fibra, dietetica total'] })['fibra, dietetica total']
  delete Object.assign(element, { vitamina_A: element['Vitamina A equivalentes de retinol de actividades de retinos y carotenoides'] })['Vitamina A equivalentes de retinol de actividades de retinos y carotenoides']
  delete Object.assign(element, { vitamina_D: element['Vitamina D'] })['Vitamina D']
  delete Object.assign(element, { vitamina_E: element['Viamina E equivalentes de alfa tocoferol de actividades de vitámeros E'] })['Viamina E equivalentes de alfa tocoferol de actividades de vitámeros E']
  delete Object.assign(element, { folato: element['folato, total'] })['folato, total']
  delete Object.assign(element, { niacina: element['equivalentes de niacina, totales'] })['equivalentes de niacina, totales']
  delete Object.assign(element, { vitamina_B12: element['Vitamina B-12'] })['Vitamina B-12']
  delete Object.assign(element, { vitamina_B6: element['Vitamina B-6, Total'] })['Vitamina B-6, Total']
  delete Object.assign(element, { vitamina_C: element['Vitamina C (ácido ascórbico)'] })['Vitamina C (ácido ascórbico)']
  delete Object.assign(element, { selenio: element['selenio, total'] })['selenio, total']
  delete Object.assign(element, { zinc: element['zinc (cinc)'] })['zinc (cinc)']
})

console.log(bedcaJson)
fs.writeFile('./data/parsedJson.json', JSON.stringify(bedcaJson), (error) => {
  if (error) { console.error(error); return };
  console.log('File has been created')
})
