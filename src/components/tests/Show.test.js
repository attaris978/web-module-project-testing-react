import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Show from "./../Show";
import userEvent from "@testing-library/user-event";

const mockHandleSelect = jest.fn();

const fakeData = {
  name: "Strangest Things",
  summary: "This is the show summary",
  image: null,

  seasons: [
    {
      id: "0",
      name: "Season 1",
      episodes: [],
    },
    {
      id: "1",
      name: "Season 2",
      episodes: [],
    },
  ],
};

test("renders without errors", () => {
  render(<Show show={fakeData} selectedSeason="none" />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} />);
  expect(screen.getByText(/Fetching data\.\.\./)).toBeVisible();
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={fakeData} selectedSeason="0" />);
  expect(screen.getAllByTestId("season-option").length).toBe(2);
});

test("handleSelect is called when an season is selected", () => {
  
  render(
    <Show
      show={fakeData}
      selectedSeason="none"
      handleSelect={() => mockHandleSelect()}
    />
  );
  expect(mockHandleSelect.mock.calls.length).toBe(0);
  fireEvent.change(screen.getByLabelText(/Select A Season/), {target: { value : '0' } } )
  
  expect(mockHandleSelect.mock.calls.length).toBe(1);

});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  render(<Show show={fakeData} selectedSeason="none" />);
  const { rerender } = render(<Show show={fakeData} selectedSeason="1" />);
  rerender();
});
