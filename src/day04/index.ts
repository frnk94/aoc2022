import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .filter(Boolean)
    .map((v) => v.split(",").map((v) => v.split("-").map(Number)));

const part1 = (rawInput: string) => {
  const pairs = parseInput(rawInput);

  return pairs.reduce((acc, curr) => {
    const min1 = Math.min(curr[0][0]);
    const min2 = Math.min(curr[1][0]);
    const max1 = Math.min(curr[0][1]);
    const max2 = Math.min(curr[1][1]);

    if (min1 === min2) {
      acc++;
    } else if (min1 <= min2) {
      if (max1 >= max2) {
        acc++;
      }
    } else {
      if (max2 >= max1) {
        acc++;
      }
    }

    return acc;
  }, 0);
};

const part2 = (rawInput: string) => {
  const pairs = parseInput(rawInput);

  return pairs.reduce((acc, curr) => {
    const min1 = Math.min(curr[0][0]);
    const min2 = Math.min(curr[1][0]);
    const max1 = Math.min(curr[0][1]);
    const max2 = Math.min(curr[1][1]);

    if (min1 === min2 || max1 === max2) {
      acc++;
    } else if (min1 < min2) {
      if (max1 >= min2) acc++;
    } else {
      if (max2 >= min1) acc++;
    }

    return acc;
  }, 0);
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
