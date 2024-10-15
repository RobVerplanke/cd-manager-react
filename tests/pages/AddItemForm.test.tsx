import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ItemFormPage } from '../../src/components/pages';
import addNewItem from '../../src/api/addNewItemAPI';

// Mock the API-function
vi.mock('../../src/api/addNewItemAPI', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('ItemFormPage', () => {
  it('Edit mode: Renders specific input fields for album', async () => {
    render(
      <MemoryRouter>
        <ItemFormPage isEditMode={true} />
      </MemoryRouter>
    );

    // Common and type specific input fields are rendered
    expect(screen.getByLabelText('Artist name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Featuring artists:')).toBeInTheDocument();
    expect(screen.getByLabelText('Title:')).toBeInTheDocument();
    expect(screen.getByLabelText('Rating:')).toBeInTheDocument();
    expect(screen.getByLabelText('Tags:')).toBeInTheDocument();
    expect(screen.getByLabelText('Extra Info:')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount of CDs:')).toBeInTheDocument();
    expect(screen.getByLabelText('Release year:')).toBeInTheDocument();
    expect(screen.getByLabelText('Thumbnail cover:')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Size cover:')).toBeInTheDocument();

    // Submit button
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
  });

  it('Add mode: Renders common input fields', async () => {
    render(
      <MemoryRouter>
        <ItemFormPage isEditMode={false} />
      </MemoryRouter>
    );

    // Common input fields are rendered
    expect(screen.getByLabelText('Artist name:')).toHaveValue('');
    expect(screen.getByLabelText('Featuring artists:')).toHaveValue('');
    expect(screen.getByLabelText('Title:')).toHaveValue('');
    expect(screen.getByLabelText('Rating:')).toHaveValue('0');
    expect(screen.getByLabelText('Tags:')).toHaveValue('');
    expect(screen.getByLabelText('Extra Info:')).toHaveValue('');

    // Submit button
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
  });

  it('Add mode: Renders specific input fields for album', async () => {
    render(
      <MemoryRouter>
        <ItemFormPage isEditMode={false} />
      </MemoryRouter>
    );

    // Type specific input fields are rendered
    expect(screen.getByLabelText('Amount of CDs:')).toHaveValue(0);
    expect(screen.getByLabelText('Release year:')).toHaveValue('2000');
    expect(screen.getByLabelText('Thumbnail cover:')).toHaveValue('');
    expect(screen.getByLabelText('Full Size cover:')).toHaveValue('');
  });
});

it('Sends data after user clicked on submit button', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <ItemFormPage isEditMode={false} />
    </MemoryRouter>
  );

  // Fill the form with mock data
  await user.type(screen.getByLabelText('Artist name:'), 'Album Artist');
  await user.type(
    screen.getByLabelText('Featuring artists:'),
    'Other Artist,Another Artist'
  );
  await user.type(screen.getByLabelText('Title:'), 'Album title');
  await user.selectOptions(screen.getByLabelText('Rating:'), '5');
  await user.type(screen.getByLabelText('Tags:'), 'rock,classic,pop');
  await user.type(screen.getByLabelText('Extra Info:'), 'My first album');
  await user.type(screen.getByLabelText('Amount of CDs:'), '4');
  await user.type(screen.getByLabelText('Release year:'), '2000');
  await user.type(
    screen.getByLabelText('Thumbnail cover:'),
    'https://placehold.co/30x30'
  );
  await user.type(
    screen.getByLabelText('Full Size cover:'),
    'https://placehold.co/400x400'
  );

  // Click submit button
  const submitButton = screen.getByRole('button', { name: 'Submit' });
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
