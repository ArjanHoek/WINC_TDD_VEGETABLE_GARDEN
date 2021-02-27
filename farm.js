
const getYieldForPlant = plant => plant.yield;
const getYieldForCrop = input => input.numCrops * getYieldForPlant(input.crop);
const getTotalYield = input => input.crops.reduce((acc, cur) => acc + getYieldForCrop(cur), 0);

const getCostsForCrop = input => input.numPlants * input.crop.costs;
const getRevenueForCrop = input => input.numPlants * input.crop.salePrice;

module.exports = { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop };
