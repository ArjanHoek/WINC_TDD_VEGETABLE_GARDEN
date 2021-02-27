const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getCostsForCrop", () => {

  test("Get costs for crop", () => {
    const corn = {
      name: "corn",
      costs: 1.50,
    };
    const input = {
      crop: corn,
      numPlants: 120
    }
    expect(getCostsForCrop(input)).toBe(180);
  });
});

describe("getRevenueForCrop", () => {
  test("Get revenue for crop, yield per plant", () => {
    const corn = {
      name: "corn",
      salePrice: 3,
      yield: 2
    };
    const input = {
      crop: corn,
      numPlants: 120,
    }
    expect(getRevenueForCrop(input)).toBe(720)
  })

  test("Get revenue for crop, yield per crop", () => {
    const corn = {
      name: "corn",
      salePrice: 2.50,
    };
    const input = {
      crop: corn,
      yield: 150
    }
    expect(getRevenueForCrop(input)).toBe(375)
  })
})

describe("getProfitForCrop", () => {
  test("Get profit for crop, yield per plant", () => {
    const corn = {
      name: "corn",
      salePrice: 5,
      costs: 3,
      yield: 2
    };
    const input = {
      crop: corn,
      numPlants: 100
    }
    expect(getProfitForCrop(input)).toBe(700)
  })

  test("Get profit for crop, yield per crop", () => {
    const corn = {
      name: "corn",
      salePrice: 4,
      costs: 2,
    };
    const input = {
      crop: corn,
      numPlants: 100,
      yield: 150
    }
    expect(getProfitForCrop(input)).toBe(400)
  })
})