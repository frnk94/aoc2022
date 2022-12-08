import run from "aocrunner";

const sumFc = (acc: number, curr: number) => (acc += curr);
const parseInput = (rawInput: string) =>
  rawInput.split("\n\n").map((v) => v.split("\n").map(Number));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return Math.max(...input.map((rations) => rations.reduce(sumFc)));
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map((v) => v.reduce(sumFc))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce(sumFc);
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
