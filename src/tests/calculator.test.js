/**
 * Unit tests for the CLI calculator's arithmetic functions.
 *
 * Covers addition, subtraction, multiplication, and division,
 * including the example operations from images/calc-basic-operations.png
 * (2 + 3, 10 - 4, 45 * 2, 20 / 5) plus additional edge cases such as
 * division by zero, negative numbers, decimals, and the calculate()
 * dispatcher.
 *
 * Also covers the extended operations from images/calc-extended-operations.png
 * (5 % 2, 2 ^ 3, √16) — modulo, power/exponentiate, and squareRoot/sqrt —
 * plus edge cases such as modulo by zero and square root of a negative number.
 */

const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  exponentiate,
  power,
  sqrt,
  squareRoot,
  calculate,
} = require("../calculator");

describe("add", () => {
  test("2 + 3 = 5 (example from image)", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("adds two positive numbers", () => {
    expect(add(10, 15)).toBe(25);
  });

  test("adds negative numbers", () => {
    expect(add(-5, -7)).toBe(-12);
  });

  test("adds a positive and a negative number", () => {
    expect(add(10, -4)).toBe(6);
  });

  test("adds decimal numbers", () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
  });

  test("adding zero returns the other operand", () => {
    expect(add(0, 42)).toBe(42);
  });
});

describe("subtract", () => {
  test("10 - 4 = 6 (example from image)", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("subtracts two positive numbers", () => {
    expect(subtract(20, 5)).toBe(15);
  });

  test("result can be negative", () => {
    expect(subtract(4, 10)).toBe(-6);
  });

  test("subtracts negative numbers", () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  test("subtracting zero returns the original number", () => {
    expect(subtract(9, 0)).toBe(9);
  });
});

describe("multiply", () => {
  test("45 * 2 = 90 (example from image)", () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test("multiplies two positive numbers", () => {
    expect(multiply(6, 7)).toBe(42);
  });

  test("multiplying by zero returns zero", () => {
    expect(multiply(100, 0)).toBe(0);
  });

  test("multiplying by a negative number negates the result", () => {
    expect(multiply(5, -3)).toBe(-15);
  });

  test("multiplies decimal numbers", () => {
    expect(multiply(1.5, 2)).toBeCloseTo(3);
  });
});

describe("divide", () => {
  test("20 / 5 = 4 (example from image)", () => {
    expect(divide(20, 5)).toBe(4);
  });

  test("divides two positive numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("divides negative numbers", () => {
    expect(divide(-10, -2)).toBe(5);
  });

  test("result can be a decimal", () => {
    expect(divide(7, 2)).toBe(3.5);
  });

  test("dividing zero by a non-zero number returns zero", () => {
    expect(divide(0, 5)).toBe(0);
  });

  test("throws an error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero is not allowed.");
  });
});

describe("calculate (operation dispatcher)", () => {
  test.each([
    ["+", 2, 3, 5],
    ["add", 2, 3, 5],
    ["-", 10, 4, 6],
    ["subtract", 10, 4, 6],
    ["*", 45, 2, 90],
    ["x", 45, 2, 90],
    ["multiply", 45, 2, 90],
    ["/", 20, 5, 4],
    ["divide", 20, 5, 4],
  ])("calculate(%s) resolves operation %s correctly", (operation, a, b, expected) => {
    expect(calculate(a, b, operation)).toBe(expected);
  });

  test("throws for an unsupported operation", () => {
    expect(() => calculate(1, 2, "unsupported")).toThrow(/Unsupported operation/);
  });

  test("propagates division by zero error through calculate()", () => {
    expect(() => calculate(5, 0, "/")).toThrow("Division by zero is not allowed.");
  });
});

describe("modulo", () => {
  test("5 % 2 = 1 (example from image)", () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test("10 % 3 = 1", () => {
    expect(modulo(10, 3)).toBe(1);
    expect(calculate(10, 3, "%")).toBe(1);
    expect(calculate(10, 3, "mod")).toBe(1);
    expect(calculate(10, 3, "modulo")).toBe(1);
  });

  test("modulo with negative operands", () => {
    expect(modulo(-10, 3)).toBe(-1);
    expect(modulo(10, -3)).toBe(1);
  });

  test("modulo of zero by a non-zero number returns zero", () => {
    expect(modulo(0, 5)).toBe(0);
  });

  test("throws an error when modulo by zero", () => {
    expect(() => modulo(5, 0)).toThrow("Modulo by zero is not allowed.");
    expect(() => calculate(5, 0, "%")).toThrow("Modulo by zero is not allowed.");
  });
});

describe("exponentiate / power", () => {
  test("2 ^ 3 = 8 (example from image)", () => {
    expect(exponentiate(2, 3)).toBe(8);
    expect(power(2, 3)).toBe(8);
  });

  test("2 ^ 10 = 1024", () => {
    expect(calculate(2, 10, "^")).toBe(1024);
    expect(calculate(2, 10, "pow")).toBe(1024);
    expect(calculate(2, 10, "exponentiate")).toBe(1024);
  });

  test("power is an alias for exponentiate", () => {
    expect(power).toBe(exponentiate);
  });

  test("handles negative exponents", () => {
    expect(calculate(2, -1, "^")).toBe(0.5);
    expect(power(2, -1)).toBe(0.5);
  });

  test("raising to the power of zero returns one", () => {
    expect(power(5, 0)).toBe(1);
  });

  test("handles a negative base with an integer exponent", () => {
    expect(power(-2, 3)).toBe(-8);
  });
});

describe("sqrt / squareRoot", () => {
  test("√16 = 4 (example from image)", () => {
    expect(sqrt(16)).toBe(4);
    expect(squareRoot(16)).toBe(4);
  });

  test("sqrt(9) = 3", () => {
    expect(calculate(9, 0, "sqrt")).toBe(3);
  });

  test("squareRoot is an alias for sqrt", () => {
    expect(squareRoot).toBe(sqrt);
  });

  test("square root of zero is zero", () => {
    expect(squareRoot(0)).toBe(0);
  });

  test("square root of a non-perfect square returns a decimal", () => {
    expect(squareRoot(2)).toBeCloseTo(1.4142135624);
  });

  test("throws an error for negative operands", () => {
    expect(() => sqrt(-4)).toThrow(
      "Cannot compute the square root of a negative number."
    );
    expect(() => squareRoot(-16)).toThrow(
      "Cannot compute the square root of a negative number."
    );
    expect(() => calculate(-4, 0, "sqrt")).toThrow(
      "Cannot compute the square root of a negative number."
    );
  });
});
