import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ItemFormPage } from '../../src/components/pages';
import addNewItem from '../../src/api/addNewItemAPI';

// Mock the API-function
// vi.mock('../../src/api/addNewItemAPI', () => ({
//   __esModule: true,
//   default: vi.fn(),
// }));

vi.mock('../../src/api/addNewItemAPI', () => ({
  __esModule: true,
  default: vi.fn((...args) => {
    console.log('addNewItem called with:', args);
    return;
  }),
}));

describe('ItemFormPage', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear all mocks before each test
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Restore all mocks after each test
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('Initially renders common and specific input fields for album category', async () => {
    render(
      <MemoryRouter>
        <ItemFormPage isEditMode={true} />
      </MemoryRouter>
    );

    // Common and type specific input fields are rendered
    expect(screen.getByLabelText(/Artist name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Featuring artists:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/album Title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rating:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tags:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Extra Info:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount of CDs:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Release year:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Thumbnail cover:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Size cover:/i)).toBeInTheDocument();

    // Submit button
    const submitButton = screen.getByRole('button', { name: 'Submit form' });
    expect(submitButton).toBeInTheDocument();
  });

  it('Renders common and specific input fields for CD category', async () => {
    render(
      <MemoryRouter>
        <ItemFormPage isEditMode={false} />
      </MemoryRouter>
    );

    // Select CD catagory
    const cdRadioButton = screen.getByLabelText('CD');
    await userEvent.click(cdRadioButton);

    // Common and type specific input fields for CD are rendered
    expect(screen.getByLabelText(/Artist name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Featuring artists:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cd title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rating:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tags:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Extra Info:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount of CDs:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount of tracks:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Release year:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Part of Album:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Thumbnail cover:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Size cover:/i)).toBeInTheDocument();

    // Submit button
    const submitButton = screen.getByRole('button', { name: 'Submit form' });
    expect(submitButton).toBeInTheDocument();
  });

  it('Renders common and specific input fields for track category', async () => {
    render(
      <MemoryRouter>
        <ItemFormPage isEditMode={false} />
      </MemoryRouter>
    );

    // Select CD catagory
    const cdRadioButton = screen.getByLabelText('Track');
    await userEvent.click(cdRadioButton);

    // Common and type specific input fields for CD are rendered
    expect(screen.getByLabelText(/Artist name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Featuring artists:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Track title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rating:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tags:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Extra Info:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CD title:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Track number:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Length:/i)).toBeInTheDocument();

    // Submit button
    const submitButton = screen.getByRole('button', { name: 'Submit form' });
    expect(submitButton).toBeInTheDocument();
  });

  it('Sends album data after user clicked on submit button', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ItemFormPage isEditMode={false} />
      </MemoryRouter>
    );

    // Fill the form with mock data
    await user.type(screen.getByLabelText(/Artist name:/i), 'Album Artist');
    await user.type(
      screen.getByLabelText(/Featuring artists:/i),
      'Other Artist,Another Artist'
    );
    await user.type(screen.getByLabelText(/Album title:/i), 'Album title');
    await user.selectOptions(screen.getByLabelText(/Rating:/i), '5');
    await user.type(screen.getByLabelText(/Tags:/i), 'rock,classic,pop');
    await user.type(screen.getByLabelText(/Extra Info:/i), 'My first album');
    await user.type(screen.getByLabelText(/Amount of CDs:/i), '4');
    await user.type(screen.getByLabelText(/Release year:/i), '2000');
    await user.type(
      screen.getByLabelText(/Thumbnail cover:/i),
      'https://placehold.co/30x30'
    );
    await user.type(
      screen.getByLabelText(/Full Size cover:/i),
      'https://placehold.co/400x400'
    );

    // Click submit button
    const submitButton = screen.getByRole('button', { name: 'Submit form' });
    await user.click(submitButton);

    // Check whether addNewItem function is called with the correct values
    await waitFor(() => {
      expect(addNewItem).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          type: 'album',
          artist: 'Album Artist',
          featuringArtists: ['Other Artist', 'Another Artist'],
          title: 'Album title',
          albumYear: 2000,
          rating: 5,
          tags: ['rock', 'classic', 'pop'],
          extraInfo: 'My first album',
          cdsInAlbum: 4,
          cover: {
            albumThumbnail: 'https://placehold.co/30x30',
            albumFullSize: 'https://placehold.co/400x400',
          },
        }),
        expect.any(Function)
      );
    });
  });

  // it.only('Sends cd data after user clicked on submit button', async () => {
  //   const user = userEvent.setup();

  //   render(
  //     <MemoryRouter>
  //       <ItemFormPage isEditMode={false} />
  //     </MemoryRouter>
  //   );

  //   // Select CD catagory
  //   const cdRadioButton = screen.getByLabelText('CD');
  //   await userEvent.click(cdRadioButton);

  //   // Fill the form with mock data
  //   await user.type(screen.getByLabelText('Artist name:'), 'CD Artist');
  //   await user.type(
  //     screen.getByLabelText('Featuring artists:'),
  //     'Other Artist,Another Artist'
  //   );
  //   await user.type(screen.getByLabelText('Title:'), 'CD title');
  //   await user.selectOptions(screen.getByLabelText('Rating:'), '3');
  //   await user.type(screen.getByLabelText('Tags:'), 'dance,techno,k-pop');
  //   await user.type(screen.getByLabelText('Extra Info:'), 'My first CD');
  //   await user.type(screen.getByLabelText('Amount of CDs:'), '2');
  //   await user.type(screen.getByLabelText('Amount of tracks:'), '14');
  //   await user.type(
  //     screen.getByLabelText('Thumbnail cover:'),
  //     'https://placehold.co/30x30'
  //   );
  //   await user.type(
  //     screen.getByLabelText('Full Size cover:'),
  //     'https://placehold.co/400x400'
  //   );

  //   // Click submit button
  //   const submitButton = screen.getByRole('button', { name: 'Submit' });
  //   await user.click(submitButton);

  //   const setError = () => {};

  //   // Check whether addNewItem function is called with the correct values
  //   await waitFor(() => {
  //     expect(addNewItem).toHaveBeenCalledWith(
  //       expect.any(String),
  //       expect.objectContaining(
  //         {
  //         id: expect.any(String),
  //         type: 'cd',
  //         artist: 'CD Artist',
  //         featuringArtists: ['Other Artist', 'Another Artist'],
  //         title: 'CD title',
  //         cdYear: 2000,
  //         rating: 3,
  //         tags: ['dance', 'techno', 'k-pop'],
  //         extraInfo: 'My first CD',
  //         cdCount: 2,
  //         trackCount: 14,
  //         partOfAlbum: '',
  //         cover: {
  //           cdThumbnail: 'https://placehold.co/30x30',
  //           cdFullSize: 'https://placehold.co/400x400',
  //         },
  //       }
  //     ),
  //       setError
  //     );
  //   });
  // });
});
