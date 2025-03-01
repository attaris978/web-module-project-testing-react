import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Episode from "./../Episode";

const fakeData = {
  id: 1000000,
  name: "testEpisode",
  season: 3,
  number: 22,
  summary: "This is the summary",
  runtime: "Eternal",
};

test("renders without error", () => {
  render(<Episode episode={fakeData} />);
});

test("renders the summary test passed as prop", () => {

    render(<Episode episode={fakeData} />);
expect(screen.getByText(/This is the summary/)).toBeVisible();
expect(screen.getByText(/This is the summary/)).not.toBeNull();
const {rerender, getByText} = render( <Episode episode={{summary: 'This is a second summary'}} />);
rerender( <Episode episode={{summary: 'This is a second summary'}} />)
// .rerender(<Episode episode={{summary: 'This is a second summary'}} />)
expect(getByText('This is a second summary')).toBeVisible();
});

test("renders default image when image is not defined", () => {
    render(<Episode episode={{...fakeData, image:null }} />);
    expect(screen.getByAltText("https://i.ibb.co/2FsfXqM/stranger-things.png")).toBeInTheDocument();
});
