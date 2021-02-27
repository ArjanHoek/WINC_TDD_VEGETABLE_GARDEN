const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit
} = require("./farm");

// const corn = {
//   name: "corn",
//   yield: 30,
//   factors: {
//     sun: {
//       low: -50,
//       medium: 0,
//       high: 50,
//     },
//   },
// };

const environmentFactors = {
  sun: "low",
};

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -20,
        high: -80
      }
    },
  };

  const environmentFactors = {
    sun: "high",
    wind: "medium"
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant with environment factors", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(36);
  });
});

// describe("getYieldForCrop", () => {
//   test("Get yield for crop, simple", () => {
//     const corn = {
//       name: "corn",
//       yield: 3,
//     };

//     const crop = {
//       plant: corn,
//       numPlants: 10,
//     };

//     expect(getYieldForCrop(crop)).toBe(30);
//   });
// }); // In the crop object, the crop key was replaced by plant, which didn't make sense, since it refers to the plant instead of a crop (which is the object itself). Moreover, the numCrops is replaced by numPlants, since this value should (according to the function name) refer to a single crop, not to multiple crops. !!!

// describe("getTotalYield", () => {
//   test("Calculate total yield with multiple crops", () => {
//     const corn = {
//       name: "corn",
//       yield: 3,
//     };
//     const pumpkin = {
//       name: "pumpkin",
//       yield: 4,
//     };

//     const cornCrop = {
//       plant: corn,
//       numPlants: 5
//     };
//     const pumpkinCrop = {
//       plant: pumpkin,
//       numPlants: 2
//     }

//     const crops = [cornCrop, pumpkinCrop];
//     expect(getTotalYield({ crops })).toBe(23); // At the beginning of the assignment, it looks kind of weird to pass the crops array inside an object, being its only property. Only at the end of the assignment it becomes clear why this is.
//   });

//   test("Calculate total yield with 0 amount", () => {
//     const corn = {
//       name: "corn",
//       yield: 3,
//     };
//     const crops = [{ plant: corn, numPlants: 0 }];
//     expect(getTotalYield({ crops })).toBe(0);
//   });
// });

// describe("getCostsForCrop", () => {

//   test("Get costs for crop", () => {
//     const corn = {
//       name: "corn",
//       costs: 1.50,
//     };
//     const crop = {
//       plant: corn,
//       numPlants: 120
//     }
//     expect(getCostsForCrop(crop)).toBe(180);
//   });
// });

// describe("getRevenueForCrop", () => {
//   test("Get revenue for crop, yield per plant, with no environment factors", () => {
//     const corn = {
//       name: "corn",
//       salePrice: 3,
//       yield: 2
//     };
//     const crop = {
//       plant: corn,
//       numPlants: 120,
//     }
//     expect(getRevenueForCrop(crop)).toBe(720)
//   })

//   test("Get revenue for crop, yield per crop, with no environment factors", () => {
//     const corn = {
//       name: "corn",
//       salePrice: 2.50,
//     };
//     const crop = {
//       plant: corn,
//       yield: 150
//     }
//     expect(getRevenueForCrop(crop)).toBe(375)
//   })
// })

// describe("getProfitForCrop", () => {
//   test("Get profit for crop, yield per plant, with no environment factors", () => {
//     const corn = {
//       name: "corn",
//       salePrice: 5,
//       costs: 3,
//       yield: 2
//     };
//     const crop = {
//       plant: corn,
//       numPlants: 100
//     }
//     expect(getProfitForCrop(crop)).toBe(700)
//   })

//   test("Get profit for crop, yield per crop, with no environment factors", () => {
//     const corn = {
//       name: "corn",
//       salePrice: 4,
//       costs: 2,
//     };
//     const crop = {
//       plant: corn,
//       numPlants: 100,
//       yield: 150
//     }
//     expect(getProfitForCrop(crop)).toBe(400)
//   })
// })

// describe("getTotalProfit", () => {
//   test("Calculate total yield with multiple crops, with no environment factors", () => {
//     const corn = {
//       name: "corn",
//       salePrice: 4,
//       costs: 2,
//       yield: 1
//     };
//     const cornCrop = {
//       plant: corn,
//       numPlants: 100
//     }
//     const pumpkin = {
//       name: "corn",
//       salePrice: 7,
//       costs: 4,
//       yield: 2
//     };
//     const pumpkinCrop = {
//       plant: pumpkin,
//       numPlants: 50
//     }
//     const crops = [cornCrop, pumpkinCrop];
//     expect(getTotalProfit({ crops })).toBe(700);
//   });

//   test("Calculate total profit with 0 amount", () => {
//     const corn = {
//       name: "corn",
//       salePrice: 5,
//       costs: 3,
//       yield: 2
//     };
//     const crops = [{ plant: corn, numPlants: 0 }];
//     expect(getTotalProfit({ crops })).toBe(0);
//   });
// });