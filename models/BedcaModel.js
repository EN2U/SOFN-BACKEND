const mongoose = require('mongoose')
const { Schema } = mongoose
const ErrorRequest = require('../errorHandling/requestError')

const Role = new Schema({
  f_id: {
    type: String
  },
  f_ori_name: {
    type: String
  },
  edible_portion: {
    type: String
  },
  alcohol: {
    type: String
  },
  energía: {
    type: String
  },
  grasa: {
    type: String
  },
  proteina: {
    type: String
  },
  agua: {
    type: String
  },
  carbohidratos: {
    type: String
  },
  fibra: {
    type: String
  },
  colesterol: {
    type: String
  },
  vitamina_A: {
    type: String
  },
  vitamina_D: {
    type: String
  },
  vitamina_Evi: {
    type: String
  },
  folato: {
    type: String
  },
  niacina: {
    type: String
  },
  riboflavina: {
    type: String
  },
  tiamina: {
    type: String
  },
  vitamina_B12: {
    type: String
  },
  vitamina_B6: {
    type: String
  },
  vitamina_C: {
    type: String
  },
  calcio: {
    type: String
  },
  hierro: {
    type: String
  },
  potasio: {
    type: String
  },
  magnesio: {
    type: String
  },
  sodio: {
    type: String
  },
  fosforo: {
    type: String
  },
  ioduro: {
    type: String
  },
  selenio: {
    type: String
  },
  zinc: {
    type: String
  }
})

module.exports = mongoose.model('Role', Role)
