const getYieldForPlant = (plant, ef = {}) => Object.keys(ef).reduce((acc, cur) =>
  (plant.factors && plant.factors[cur]) ? (acc * (1 + plant.factors[cur][ef[cur]] / 100)) || acc : acc, plant.yield);

const getYieldForCrop = (crop, ef) => crop.numPlants * getYieldForPlant(crop.plant, ef);

const getTotalYield = (crops, ef) => crops.reduce((acc, crop) => acc + getYieldForCrop(crop, ef), 0);

const getCostsForCrop = ({ numPlants, plant }) => numPlants * plant.costs;

const getRevenueForCrop = (input, ef) => input.yield ? input.yield * input.plant.salePrice : getYieldForCrop(input, ef) * input.plant.salePrice;

const getProfitForCrop = (input, ef) => getRevenueForCrop(input, ef) - getCostsForCrop(input);

const getTotalProfit = (crops, ef) => crops.reduce((acc, cur) => acc + getProfitForCrop(cur, ef), 0)

module.exports = { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit };

// In steps 6-11, two function references are missing: getTotalYield and getRevenueForCrop also need to incorporate the environment factors. I don't what the official solution would say, but in my code the environment factors are only incorporated in the getYieldForPlant function, the other functions are just passing the object further downstream, so technically there would be only one step instead of 6 or even more.