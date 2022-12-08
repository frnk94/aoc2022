import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const buffer = rawInput;
  let result = 0;

  for (let i = 0; i < buffer.length; i++) {
    const c = buffer[i];
    const rest = buffer.slice(i + 1, i + 4);

    if (_.uniq([c, ...rest]).length === 4) {
      result = i + 4;
      break;
    }
  }

  return result;
};

const part2 = (rawInput: string) => {
  const buffer = rawInput;
  let result = 0;

  for (let i = 0; i < buffer.length; i++) {
    const c = buffer[i];
    const rest = buffer.slice(i + 1, i + 14);

    if (_.uniq([c, ...rest]).length === 14) {
      result = i + 14;
      break;
    }
  }

  return result;
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
