import { checkWinner } from "../utils/checkWinner";

test("check winner empty state", () => {
  const clearState = ["", "", "", "", "", "", "", "", "", ""];
  expect(checkWinner(clearState)).toBe(null);
});

test("check winner X row win state", () => {
  const clearState = ["X", "X", "X", "", "0", "", "", "", "", "0"];
  expect(checkWinner(clearState)).toBe("X");
});

test("check winner 0 col win state", () => {
  const clearState = ["0", "", "", "0", "", "", "0", "", "X", "X"];
  expect(checkWinner(clearState)).toBe("0");
});

test("check winner 0 diagonal win state", () => {
  const clearState = ["", "", "0", "", "", "0", "X", "", "0", "X"];
  expect(checkWinner(clearState)).toBe("0");
});

test("check winner Draw state", () => {
  const clearState = ["X", "0", "0", "0", "X", "X", "0", "X", "0"];
  expect(checkWinner(clearState)).toBe("Draw");
});

test("check at random state to e null", () => {
  const clearState = ["X", "", "", "", "", "", "", "", "0"];
  expect(checkWinner(clearState)).toBe(null);
});
