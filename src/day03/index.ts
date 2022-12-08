import run from "aocrunner";
import _ from "lodash";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getScore = (c: string) => alphabet.indexOf(c) + 1;

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((v) => {
    let half = Math.floor(v.length / 2);
    return [v.slice(0, half), v.slice(half, v.length)];
  });

const part1 = (rawInput: string) => {
  const bags = parseInput(rawInput);

  const unique = bags.reduce((acc, curr) => {
    const str = curr[0];
    let banned = [] as string[];
    _.map(str, (w) => {
      if (!banned.includes(w) && curr[1].includes(w)) {
        acc.push(w);
        banned.push(w);
      }
    });
    return acc;
  }, []);

  return unique.reduce((acc, curr) => (acc += getScore(curr)), 0);
};

const part2 = (rawInput: string) => {
  const bags = _.chunk(rawInput.split("\n").filter(Boolean), 3);

  const unique = bags.reduce((acc, curr) => {
    const str = curr[0];
    let banned = [] as string[];
    _.map(str, (w) => {
      if (!banned.includes(w) && curr[1].includes(w) && curr[2].includes(w)) {
        acc.push(w);
        banned.push(w);
      }
    });
    return acc;
  }, []);

  return unique.reduce((acc, curr) => (acc += getScore(curr)), 0);
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
