interface User {
  name: string;
  readonly age: number;
  isAdmin?: boolean;
}

type Boy = string;

const user: User = {
  name: "Ermiyas",
  age: 14,
};

type Users = {
  name: string;
  age: number;
};

const num: Boy = "Ermi";

let isOnline: Array<boolean> = [true, false, true];
const result: [status: string, code: number] = ["ok", 200];

function ermi<T>(bur: T): T {
  return bur;
}

let val = ermi<number>(16);
