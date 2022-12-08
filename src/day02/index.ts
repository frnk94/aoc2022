import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").filter(Boolean);

const OUTCOME = {
  "A X": [4, 3],
  "A Y": [8, 4],
  "A Z": [3, 8],
  "B X": [1, 1],
  "B Y": [5, 5],
  "B Z": [9, 9],
  "C X": [7, 2],
  "C Y": [2, 6],
  "C Z": [6, 7],
};

const part1 = (rawInput: string) =>
  parseInput(rawInput).reduce(
    // @ts-ignore
    (acc: any, curr: any) => (acc += OUTCOME[curr][0]),
    0,
  );

const part2 = (rawInput: string) =>
  parseInput(rawInput).reduce(
    // @ts-ignore
    (acc: any, curr: any) => (acc += OUTCOME[curr][1]),
    0,
  );

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
