import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders Tic Tac Toe grid", () => {
  render(<App />);
  const headerElement = screen.getByText(/Tic Tac Toe/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders Modal and select input form", () => {
  render(<App />);
  const selectElement = screen.getByText(/Choose a Game Mode:/i);
  expect(selectElement).toBeInTheDocument();
});

test("renders next Button Element", () => {
  render(<App />);
  const nextButtonElement = screen.getByText(/Next/i);
  expect(nextButtonElement).toBeInTheDocument();
});

test("renders player status", () => {
  render(<App />);
  const playerStatus = screen.getByText(/Player :X's turn now./i);
  expect(playerStatus).toBeInTheDocument();
});

test("renders Clear grid button", () => {
  render(<App />);
  const clearGrid = screen.getByText(/Clear grid/i);
  expect(clearGrid).toBeInTheDocument();
});
