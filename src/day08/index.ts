import run from "aocrunner";

class Arrangment {
  values: number[][];
  constructor(input: string) {
    this.values = this.init(input);
  }

  private init(input: string) {
    const lines = input.split("\n").filter(Boolean);
    return lines.map((l) => l.split("").map(Number));
  }

  getVisible(): number {
    return this.values.reduce((acc, row, rowIndex) => {
      // Horizon edge
      if (rowIndex === 0 || rowIndex === row.length - 1)
        return (acc += row.length);

      return (acc += row.reduce((sum, col, colIndex) => {
        if (colIndex === 0 || colIndex === row.length - 1) return (sum += 1);

        const fullColumn = this.values.reduce((acc, curr) => {
          acc.push(curr[colIndex]);
          return acc;
        }, []);

        if (row.slice(0, colIndex).every((v) => col > v)) {
          return (sum += 1);
        } else if (row.slice(colIndex + 1).every((v) => col > v)) {
          return (sum += 1);
        } else if (fullColumn.slice(0, rowIndex).every((v) => col > v)) {
          return (sum += 1);
        } else if (fullColumn.slice(rowIndex + 1).every((v) => col > v)) {
          return (sum += 1);
        }

        return sum;
      }, 0));
    }, 0);
  }

  getScenicScore() {
    let score = 0;

    for (let rowIndex = 1; rowIndex < this.values.length - 1; rowIndex++) {
      const row = this.values[rowIndex];

      for (let colIndex = 1; colIndex < row.length - 1; colIndex++) {
        const column = this.values.reduce((acc, curr) => {
          acc.push(curr[colIndex]);
          return acc;
        }, []);

        const element = row[colIndex];

        const left = row.slice(0, colIndex).reverse();
        const right = row.slice(colIndex + 1);
        const top = column.slice(0, rowIndex).reverse();
        const bottom = column.slice(rowIndex + 1);

        const elementScore = [left, right, top, bottom].reduce((acc, dir) => {
          let tmpScore = 0;

          for (const iterator of dir) {
            if (element > iterator) {
              tmpScore++;
            } else {
              tmpScore++;
              break;
            }
          }

          if (acc === 0) {
            return (acc += tmpScore);
          }

          return (acc *= tmpScore);
        }, 0);

        score = Math.max(score, elementScore);
      }
    }

    return score;
  }
}

const part1 = (rawInput: string) => {
  const forest = new Arrangment(rawInput);
  return forest.getVisible();
};

const part2 = (rawInput: string) => {
  const forest = new Arrangment(rawInput);
  return forest.getScenicScore();
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
