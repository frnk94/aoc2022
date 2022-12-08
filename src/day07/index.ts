import run from "aocrunner";

const results = [] as number[];
const results2 = [] as number[];

class FileSystem {
  private root: Dirrectory;
  private currentDir: Dirrectory;

  constructor(input?: string) {
    this.root = new Dirrectory("/");
    this.currentDir = this.root;
    this.init(input);
  }

  init(input?: string) {
    if (!input) return;

    const cmds = input
      .split("$ ")
      .filter(Boolean)
      .map((v) => {
        if (v.startsWith("cd")) {
          return v.replace("\n", "").split(" ");
        } else {
          return v.split("\n").filter(Boolean);
        }
      });

    cmds.forEach((cmd) => {
      if (cmd[0] === "cd") {
        this.cd(cmd[1]);
      } else if ((cmd[0] = "ls")) {
        const instructions = cmd.slice(1).map((v) => v.split(" "));

        instructions.forEach((instruction) => {
          if (instruction[0] === "dir") {
            this.mkDir(instruction[1]);
          } else {
            this.touch(Number(instruction[0]), instruction[1]);
          }
        });
      }
    });
  }

  solvePart1() {
    this.root.solvePart1();
  }

  solvePart2() {
    this.root.solvePart2(30000000 - (70000000 - this.root.size));
  }

  cd(name: string) {
    if (name === "/") {
      this.currentDir = this.root;
    } else if (name === "..") {
      this.currentDir = this.currentDir.parent || this.currentDir;
    } else {
      const newCurr = this.currentDir.children.find((d) => d.name === name);

      if (newCurr) {
        this.currentDir = newCurr;
      } else {
        throw new Error(
          `Directory ${name} not found on ${this.currentDir.name}`,
        );
      }
    }
  }

  mkDir(name: string) {
    this.currentDir.mkDir(name);
  }

  touch(size: number, name: string) {
    this.currentDir.touch(size, name);
  }

  ls() {
    this.currentDir.children.forEach((c) => {
      console.log(`-> ${c.name}`);
    });
    this.currentDir.files.forEach((f) => {
      console.log(`[${f.size}] ${f.name}`);
    });
  }
}

class Dirrectory {
  name: string;
  children: Dirrectory[];
  parent: Dirrectory | undefined;
  files: File[];
  size: number;

  constructor(name: string, parent?: Dirrectory) {
    this.name = name;
    this.size = 0;
    this.children = [];
    this.files = [];
    this.parent = parent;
  }

  solvePart1() {
    if (this.size <= 100000) {
      results.push(this.size);
    }
    this.children.forEach((c) => c.solvePart1());
  }

  solvePart2(n: number) {
    if (this.size >= n) {
      results2.push(this.size);
    }
    this.children.forEach((c) => c.solvePart2(n));
  }

  getAbsolutePath(): string {
    if (!this.parent) return "/";

    return this.parent.getAbsolutePath() + this.name;
  }

  mkDir(name: string) {
    this.children.push(new Dirrectory(name, this));
  }

  touch(size: number, name: string) {
    this.files.push(new File(name, size));
    this.setSize();
  }

  protected setSize() {
    const total = this.files.reduce((acc, curr) => (acc += curr.size), 0);
    const childrenSize = this.children.reduce(
      (acc, curr) => (acc += curr.size),
      0,
    );
    this.size = total + childrenSize;
    this.parent?.setSize();
  }
}

class File {
  name: string;
  size: number;
  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

const part1 = (rawInput: string) => {
  const fs = new FileSystem(rawInput);
  fs.solvePart1();
  return results.reduce((acc, curr) => (acc += curr), 0);
};

const part2 = (rawInput: string) => {
  const fs = new FileSystem(rawInput);
  fs.solvePart2();
  return Math.min(...results2);
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
