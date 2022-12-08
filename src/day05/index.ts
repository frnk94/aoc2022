import run from "aocrunner";
import _ from "lodash";

class Stacks {
  stacks: Stack[];
  constructor(values: string[][]) {
    this.stacks = values.map((v) => new Stack(v));
  }

  move(n: number, from: number, to: number) {
    for (let i = 0; i < n; i++) {
      const items = this.stacks[from - 1].remove(1);
      this.stacks[to - 1].add(items);
    }
  }

  moveStack(n: number, from: number, to: number) {
    const items = this.stacks[from - 1].remove(n);
    this.stacks[to - 1].add(items);
  }

  solvePart1() {
    return this.stacks.reduce(
      (acc, curr) => (acc += curr.stack.slice(0)[0]),
      "",
    );
  }
}

class Stack {
  stack: string[];
  constructor(values: string[]) {
    this.stack = values;
  }

  add(v: string | string[]) {
    if (_.isString(v)) {
      this.stack.unshift(v);
    } else {
      this.stack.unshift(...v);
    }
  }

  remove(n = 1): string[] {
    return this.stack.splice(0, n);
  }

  get(n: number) {
    console.log(n);

    return this.stack[n];
  }
}

const parseCrates = (crates: string) => {
  const lines = crates.split("\n").slice(0, -1);
  return lines
    .map((l) => [...l.matchAll(/[A-Z]|    ?/g)].map((v) => v[0]))
    .reduce((acc, curr) => {
      curr.forEach((v, i) => {
        if (v === "    ") return acc;

        if (acc[i]) {
          acc[i].push(v);
        } else {
          acc[i] = [v];
        }
      });

      return acc;
    }, [] as string[][]);
};

const part1 = (rawInput: string) => {
  const [crates, instructions] = rawInput.split("\n\n").filter(Boolean);

  const stacks = new Stacks(parseCrates(crates));

  const moves = instructions
    .split("\n")
    .filter(Boolean)
    .map((v) =>
      v
        .match(/move (\d+) from (\d+) to (\d+)/)
        ?.slice(1, 4)
        .map(Number),
    );

  moves.forEach((m = []) => stacks.move(m[0], m[1], m[2]));

  return stacks.solvePart1();
};

const part2 = (rawInput: string) => {
  const [crates, instructions] = rawInput.split("\n\n").filter(Boolean);
  const stacks = new Stacks(parseCrates(crates));

  const moves = instructions
    .split("\n")
    .filter(Boolean)
    .map((v) =>
      v
        .match(/move (\d+) from (\d+) to (\d+)/)
        ?.slice(1, 4)
        .map(Number),
    );

  moves.forEach((m = []) => stacks.moveStack(m[0], m[1], m[2]));

  return stacks.solvePart1();
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
