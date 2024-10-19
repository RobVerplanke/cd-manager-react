import { Link, useParams } from 'react-router-dom';
import getItemById from '../../api/getItemById';
import { type Album, type Cd, type Track } from '../../lib/types/types';
import { useEffect, useState } from 'react';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useData } from '../../context/DataContext';

function ViewItemPAge() {
  const { id } = useParams<{ id: string }>();
  const { setError } = useData();
  const [item, setItem] = useState<Album | Cd | Track | null>(null);

  // Fetch item data when ID is available
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await getItemById(id, setError);
        if (data) {
          setItem(data); // Set item only if data exists
        } else {
          setItem(null); // Explicitly set null if no item is found
        }
      };
      fetchData();
    }
  }, [id]);

  // Display loading message when data is not available (yet)
  if (!item) return <div>Loading data...</div>;

  return (
    <main className="my-5 pl-6">
      <div className="text-2xl mb-4 border-b-2 border-[#176061] pb-4">
        <span>Item Details</span>
      </div>
      <div className="mb-4">
        {item.type === 'album' && (
          <dd>
            <img src={item.cover.albumFullSize} alt="Album cover" />
          </dd>
        )}
        {item.type === 'cd' && (
          <dd>
            <img src={item.cover.cdFullSize} alt="Album cover" />
          </dd>
        )}
      </div>

      {/* 
      
      Begin table 
      
      */}

      <table className="min-w-fit text-sm">
        <thead>
          <tr className="border-b-2 border-[#48CFCB]">
            <th className="pb-4 font-normal text-base text-left">
              {/* Render 'Edit item' icon */}
              <Link
                to={`/edit/${item.id}`}
                role="button"
                aria-label="Edit item"
              >
                <EditNoteOutlinedIcon fontSize="medium" />
                Edit
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b font-bold">ID</td>
            <td className="py-2 pl-12 border-b text-left">{item.id}</td>
            {''}
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-bold">Type</td>
            <td className="py-2 pl-12 border-b text-left">{item.type}</td>
            {''}
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-bold">Artist name</td>
            <td className="py-2 pl-12 border-b text-left">{item.artist}</td>
            {''}
          </tr>
          {item.featuringArtists && (
            <tr>
              <td className="py-2 px-4 border-b font-bold">
                Featuring Artists
              </td>
              <td className="py-2 pl-12 border-b text-left">
                {item.featuringArtists.length ? (
                  item.featuringArtists.join(', ')
                ) : (
                  <p>None</p>
                )}{' '}
              </td>
              {''}
            </tr>
          )}
          <tr>
            <td className="py-2 px-4 border-b font-bold">Title</td>
            <td className="py-2 pl-12 border-b text-left">{item.title}</td>
            {''}
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-bold">Tags</td>
            <td className="py-2 pl-12 border-b text-left">
              {item.tags.join(', ')}
            </td>
            {''}
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-bold">Rating</td>
            <td className="py-2 pl-12 border-b text-left">{item.rating}</td>
            {''}
          </tr>

          {item.type === 'album' && (
            <>
              <tr>
                <td className="py-2 px-4 border-b font-bold">Release year</td>
                <td className="py-2 pl-12 border-b text-left">
                  {item.albumYear}
                </td>
                {''}
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-bold">Amount of CDs</td>
                <td className="py-2 pl-12 border-b text-left">
                  {item.cdsInAlbum}
                </td>
                {''}
              </tr>
            </>
          )}

          {item.type === 'cd' && (
            <>
              <tr>
                <td className="py-2 px-4 border-b font-bold">Release year</td>
                <td className="py-2 pl-12 border-b text-left">{item.cdYear}</td>
                {''}
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-bold">Amount of CDs</td>
                <td className="py-2 pl-12 border-b text-left">
                  {item.cdCount}
                </td>
                {''}
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-bold">
                  Amount of tracks
                </td>
                <td className="py-2 pl-12 border-b text-left">
                  {item.trackCount}
                </td>
                {''}
              </tr>
              {item.partOfAlbum && (
                <tr>
                  <td className="py-2 px-4 border-b font-bold">
                    Part of album
                  </td>
                  <td className="py-2 pl-12 border-b text-left">
                    {item.partOfAlbum}
                  </td>
                  {''}
                </tr>
              )}
            </>
          )}
          {item.type === 'track' && (
            <>
              <tr>
                <td className="py-2 px-4 border-b font-bold">CD title</td>
                <td className="py-2 pl-12 border-b text-left">
                  {item.cdTitle}
                </td>
                {''}
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-bold">Track no.</td>
                <td className="py-2 pl-12 border-b text-left">
                  {item.trackNumber}
                </td>
                {''}
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-bold">Length</td>
                <td className="py-2 pl-12 border-b text-left">{item.length}</td>
                {''}
              </tr>
            </>
          )}
          <tr>
            <td className="py-2 px-4 border-b font-bold">Extra information</td>
            <td className="py-2 pl-12 border-b text-left">{item.extraInfo}</td>
            {''}
          </tr>
        </tbody>
      </table>
      {/*
      
      End table
      
      */}
    </main>
  );
}

export default ViewItemPAge;
