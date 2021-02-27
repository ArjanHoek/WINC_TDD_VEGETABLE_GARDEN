const getYieldForPlant = (plant, ef = {}) => Object.keys(ef).reduce((acc, cur) =>
  (plant.factors && plant.factors[cur]) ? (acc * (1 + plant.factors[cur][ef[cur]] / 100)) || acc : acc, plant.yield);

const getYieldForCrop = (crop, ef) => crop.numPlants * getYieldForPlant(crop.plant, ef);

const getTotalYield = (crops, ef) => crops.reduce((acc, crop) => acc + getYieldForCrop(crop, ef), 0);

const getCostsForCrop = crop => crop.numPlants * crop.plant.costs;

const getRevenueForCrop = (input, ef) => input.yield ? input.yield * input.plant.salePrice : getYieldForCrop(input, ef) * input.plant.salePrice;

const getProfitForCrop = (input, ef) => getRevenueForCrop(input, ef) - getCostsForCrop(input);

const getTotalProfit = (crops, ef) => crops.reduce((acc, cur) => acc + getProfitForCrop(cur, ef), 0)

module.exports = { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit };