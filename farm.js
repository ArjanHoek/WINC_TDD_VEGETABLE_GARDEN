
const getYieldForPlant = plant => plant.yield;
const getYieldForCrop = input => input.numCrops * getYieldForPlant(input.crop);
const getTotalYield = input => input.crops.reduce((acc, cur) => acc + getYieldForCrop(cur), 0);



module.exports = { getYieldForPlant, getYieldForCrop, getTotalYield };
