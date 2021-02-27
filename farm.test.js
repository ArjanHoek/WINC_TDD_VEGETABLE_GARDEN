const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");

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

describe("getYieldForCrop", () => {
  test("Get yield for crop with environment factors", () => {
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

    const crop = {
      plant: corn,
      numPlants: 10,
    };

    const environmentFactors = {
      sun: "high",
      wind: "medium"
    };

    expect(getYieldForCrop(crop, environmentFactors)).toBe(360);
  });
}); // In the crop object, the crop key was replaced by plant, which didn't make sense, since it refers to the plant instead of a crop (which is the object itself). Moreover, the numCrops is replaced by numPlants, since this value should (according to the function name) refer to a single crop, not to multiple crops. !!!

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops and no matching plant factor value", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          medium: 0, // "low is missing"
          high: 50,
        },
        wind: {
          low: 0,
          medium: -20,
          high: -80
        }
      },
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };

    const cornCrop = {
      plant: corn,
      numPlants: 5
    };
    const pumpkinCrop = {
      plant: pumpkin,
      numPlants: 20
    }

    const crops = [cornCrop, pumpkinCrop];

    const environmentFactors = {
      sun: "low",
      wind: "low"
    };

    expect(getTotalYield(crops, environmentFactors)).toBe(230); // At the beginning of the assignment, it looks kind of weird to pass the crops array inside an object, being its only property. Only at the end of the assignment it becomes clear why this is.
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        wind: {
          low: 0,
          medium: -20,
          high: -80
        }
      }
    };

    const environmentFactors = {
      sun: "low",
      wind: "low"
    };

    const crops = [{ plant: corn, numPlants: 0 }];
    expect(getTotalYield(crops, environmentFactors)).toBe(0);
  });
});

describe("getCostsForCrop", () => {

  test("Get costs for crop", () => {
    const corn = {
      name: "corn",
      costs: 1.50,
    };
    const crop = {
      plant: corn,
      numPlants: 120
    }
    expect(getCostsForCrop(crop)).toBe(180);
  });
}); // Environment factors have no effect on crops, therefore it is not added here

describe("getRevenueForCrop", () => {
  test("Get revenue for crop, yield per plant", () => {
    const corn = {
      name: "corn",
      salePrice: 3,
      yield: 2,
      factors: {
        wind: {
          low: 0,
          medium: -20,
          high: -50
        }
      }
    };

    const crop = {
      plant: corn,
      numPlants: 120,
    }

    const environmentFactors = {
      sun: "medium",
      wind: "high"
    };

    expect(getRevenueForCrop(crop, environmentFactors)).toBe(360)
  })

  test("Get revenue for crop, yield per crop", () => {
    const corn = {
      name: "corn",
      salePrice: 2.50,
      factors: {
        wind: {
          low: 0,
          medium: -20,
          high: -50
        }
      }
    };

    const crop = {
      plant: corn,
      yield: 150 // When the yield is assigned in the crop object, does this yield already include the environment factors? In the example code, the factors are set in the plant object, not in the crop object. Would that mean that the total yield of that crop is already corrected for environment factors? If not, it could still be calculated, but then it would be weird to have the factors in the plant object rather than in the crop object. On the other hand, it would also be weird to have the factors set in the crop object, since these factors depend on the type of vegetable, not the crop. That's why I think that the yield property should never be added to the crop object, unless the environment factors are already corrected for. UPDATE: I just realised that the yield in a crop object is not in the example code. I added it here, since in the assignment it is defined as the yield of one plant OR the yield of a crop. Maybe the latter should be removed from the assigment to prevent confusion about this.
    }

    const environmentFactors = {
      sun: "medium",
      wind: "high"
    };

    expect(getRevenueForCrop(crop, environmentFactors)).toBe(375)
  })
})

describe("getProfitForCrop", () => {
  test("Get profit for crop, yield per plant", () => {
    const corn = {
      name: "corn",
      salePrice: 5,
      costs: 3,
      yield: 2,
      factors: {
        wind: {
          low: 0,
          medium: -20,
          high: -50
        }
      }
    };

    const crop = {
      plant: corn,
      numPlants: 100
    }

    const environmentFactors = {
      sun: "medium",
      wind: "high"
    };

    expect(getProfitForCrop(crop, environmentFactors)).toBe(200)
  })

  test("Get profit for crop, yield per crop, with no environment factors", () => {
    const corn = {
      name: "corn",
      salePrice: 4,
      costs: 2,
      factors: {
        wind: {
          low: 0,
          medium: -20,
          high: -50
        }
      }
    };

    const crop = {
      plant: corn,
      numPlants: 100,
      yield: 150
    }

    const environmentFactors = {
      sun: "medium",
      wind: "high"
    };

    expect(getProfitForCrop(crop)).toBe(400)
    expect(getProfitForCrop(crop, environmentFactors)).toBe(400) // See comment above, environment has no effect on the yield if the yield property is set in the crop object rather than in the plant object
  })
})

describe("getTotalProfit", () => {
  test("Calculate total yield with multiple crops, with no environment factors", () => {
    const corn = {
      name: "corn",
      salePrice: 4,
      costs: 2,
      yield: 1,
      factors: {
        sun: {
          low: 0,
          medium: 20,
          high: 30
        }
      }
    };

    const cornCrop = {
      plant: corn,
      numPlants: 100
    };

    const pumpkin = {
      name: "corn",
      salePrice: 7,
      costs: 4,
      yield: 2,
      factors: {
        wind: {
          low: 0,
          medium: -20,
          high: -50
        }
      }
    };

    const pumpkinCrop = {
      plant: pumpkin,
      numPlants: 50
    };

    const crops = [cornCrop, pumpkinCrop];

    const environmentFactors = {
      sun: "medium",
      wind: "high"
    };

    expect(getTotalProfit(crops, environmentFactors)).toBe(430); // 100 * -2 + 100 * 4 * 1 * 1.2 + 50 * -4 + 50 * 7 * 2 * 0.5
  });

  test("Calculate total profit with 0 amount", () => {
    const corn = {
      name: "corn",
      salePrice: 5,
      costs: 3,
      yield: 2,
      factors: {
        sun: {
          low: 0,
          medium: 25,
          high: 40
        }
      }
    };

    const crops = [{ plant: corn, numPlants: 0 }];

    const environmentFactors = {
      sun: "high",
    };

    expect(getTotalProfit(crops, environmentFactors)).toBe(0);
  });
});

// Questions and remarks: 
// - In the functions above, the plant/crop/environmentFactors objects are written again and again for each test. I was thinking of making a global object, at least for the environmentFactors, but I'm not sure if that's considered good practice. If one of these factors are changed globally, the expected outcome of every single test has to be recalculated. I suppose that there's be no way to automatize that, since the outcome will be biased (I believe that an expected output should involve no calculations from the computer, at least not in the testing phase). How do you think about this?

// - I mentioned it somewhere above, but I wanted to point out again the confusion in the example code about the crop/plant property name. For example this (from the getYieldForCrop test)

  // const corn = {
  //     name: "corn",
  //     yield: 3,
  // };
  // const input = {
  //     crop: corn,
  //     numCrops: 10,
  // };

// The corn variable refers to the corn plant (the input is passed as an argument to the getYieldForCrop() function, suggesting that the argument should be a crop item). The input variable should refer to the crop, but inside the object, the crop key refers to the corn plant. That doesn't make sense. In another piece of code there is an array of crops (getTotalYield test). In that array are objects that also have the numCrops property, even though the items in the array itself are supposed to be crops. It does not make sense to have a numCrops property inside a single crop item.
