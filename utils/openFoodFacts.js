
const parseOpenFoodFacts = (openFoodFactsObject) => {
  const newOpenFoodFactsObject = openFoodFactsObject.map(element => {
    return {
      _id: element._id,
      product_name: element.product_name_es !== '' && element.product_name_es ? element.product_name_es : element.product_name,
      allergens: element.allergens,
      brands: element.brands,
      stores: element.stores,
      carbohydrates: element.nutriments.carbohydrates_100g !== '' && element.nutriments.carbohydrates_100g ? element.nutriments.carbohydrates_100g : element.nutriments.carbohydrates,
      energy: element.nutriments['energy-kcal_100g'] !== '' && element.nutriments['energy-kcal_100g'] ? element.nutriments['energy-kcal_100g'] : element.nutriments['energy-kcal'],
      fat: element.nutriments.fat_100g !== '' && element.nutriments.fat_100g ? element.nutriments.fat_100g : element.nutriments.fat,
      fiber: element.nutriments.fiber_100g !== '' && element.nutriments.fiber_100g ? element.nutriments.fiber_100g : element.nutriments.fiber,
      proteins: element.nutriments.proteins_100g !== '' && element.nutriments.proteins_100g ? element.nutriments.proteins_100g : element.nutriments.proteins,
      salt: element.nutriments.salt_100g !== '' && element.nutriments.salt_100g ? element.nutriments.salt_100g : element.nutriments.salt,
      saturedFat: element.nutriments['satured-fat_100g'] !== '' && element.nutriments['satured-fat_100g'] ? element.nutriments['satured-fat_100g'] : element.nutriments['satured-fat'],
      sodium: element.nutriments.sodium_100g !== '' && element.nutriments.sodium_100g ? element.nutriments.sodium_100g : element.nutriments.sodium,
      sugar: element.nutriments.sugars_100g !== '' && element.nutriments.sugars_100g ? element.nutriments.sugars_100g : element.nutriments.sugars,
      image_url: element.image_url,
      nutrition_data_per: element.nutrition_data_per
    }
  })
  return newOpenFoodFactsObject
}

module.exports = {
  parseOpenFoodFacts
}
