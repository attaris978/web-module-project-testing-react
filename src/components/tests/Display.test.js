import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Display from './../Display';
import mockFetchShow from './../../api/fetchShow.js';

jest.mock('./../../api/fetchShow'); //, () => () => fakeData);

const fakeData = {
    selectedSeason: 'none',
    // show: {
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
//   }
};
  

test('renders without errors with no props', async () => {
 render(<Display />)

 });

test('renders Show component when the button is clicked ', async () => {
   
  mockFetchShow.mockResolvedValueOnce(fakeData);
  render(<Display />);

    // userEvent.click(screen.getByText(/Press to Get Show Data/));
    
    
    userEvent.click(screen.getByRole('button'));
    const newShow = await screen.findByText(/Strangest Things/);
    expect(newShow).toBeInTheDocument();


 });

test('renders show season options matching your data when the button is clicked', async () => { 
  mockFetchShow.mockResolvedValueOnce(fakeData);

  render(<Display />);
  userEvent.click(screen.getByRole('button'));

    await waitFor( () => {
      const seasonOptions = screen.queryAllByTestId('season-option');
      expect(seasonOptions).toHaveLength(2);
    })

    

});
test('test displayfunc is called', async () => {
  mockFetchShow.mockResolvedValueOnce(fakeData);
  const displayFunc = jest.fn();

  render(<Display displayFunc={displayFunc} />);
  userEvent.click(screen.getByRole('button'));

  await waitFor( () => {
    expect(displayFunc).toHaveBeenCalled();
  }
  )



});
