
const getYieldForPlant = (plant, environmentFactors) => {
  let plantYield = plant.yield;

  if (environmentFactors) {
    const environmentFactorKeys = Object.keys(environmentFactors);
    const plantFactors = plant.factors;

    for (let key of environmentFactorKeys) {
      const plantFactor = plantFactors[key];

      if (plantFactor) {
        const percentage = plantFactor[environmentFactors[key]];
        plantYield = plantYield * (1 + percentage / 100)
      }
    }
  }

  return plantYield
};

const getYieldForCrop = crop => crop.numPlants * getYieldForPlant(crop.plant);

const getTotalYield = input => input.crops.reduce((acc, cur) => acc + getYieldForCrop(cur), 0);

const getCostsForCrop = crop => crop.numPlants * crop.plant.costs; // Could also add a getCostsForPlant function

const getRevenueForCrop = input => input.yield
  ? input.yield * input.plant.salePrice
  : input.numPlants * getYieldForPlant(input.plant) * input.plant.salePrice;

const getProfitForCrop = input => getRevenueForCrop(input) - getCostsForCrop(input);

const getTotalProfit = input => input.crops.reduce((acc, cur) => acc + getProfitForCrop(cur), 0)

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit
};
