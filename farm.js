
const getYieldForPlant = plant => plant.yield;
const getYieldForCrop = input => input.numCrops * getYieldForPlant(input.crop);
const getTotalYield = input => input.crops.reduce((acc, cur) => acc + getYieldForCrop(cur), 0);

const getCostsForCrop = input => input.numPlants * input.crop.costs;


module.exports = { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop };
