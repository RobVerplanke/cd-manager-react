import { Link, useParams } from 'react-router-dom';
import getItemById from '../../api/getItemById';
import { type Album, type Cd, type Track } from '../../lib/types/types';
import { useEffect, useState } from 'react';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useData } from '../../context/DataContext';

function ViewItemPAge() {
  const { id } = useParams<{ id: string }>();
  const { setError, setConfirmationMessage, setIsItemMutated } = useData();
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
      <div className="text-xl mb-4 border-b-2 border-slate-400 pb-4">
        <span>Item Details</span>
        <Link
          to={`/edit/${item.id}`}
          className="pt-0.5 pl-2 text-gray-600"
          aria-label="Edit item"
        >
          <EditNoteOutlinedIcon fontSize="medium" />
        </Link>
      </div>
      <dl className="flex flex-col pl-6">
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
        <div className="flex text-sm">
          <div className="flex flex-col gap-2">
            <div>
              <dt className="font-semibold">ID:</dt>
              <dd>{item.id}</dd>
            </div>
            <div>
              <dt className="font-semibold">Type:</dt>
              <dd>{item.type}</dd>
            </div>
            <div>
              <dt className="font-semibold">Artist name:</dt>
              <dd>{item.artist}</dd>
            </div>
            {item.featuringArtists && (
              <div>
                <dt className="font-semibold">Featuring Artists:</dt>
                <dd>
                  {item.featuringArtists.length ? (
                    item.featuringArtists.join(', ')
                  ) : (
                    <p>None</p>
                  )}
                </dd>
              </div>
            )}
            <div>
              <dt className="font-semibold">Title:</dt>
              <dd>{item.title}</dd>
            </div>
            <div>
              <dt className="font-semibold">Tags:</dt>
              <dd>{item.tags.join(', ')}</dd>
            </div>
          </div>
          <div className="flex flex-col gap-2 pl-40">
            <div>
              <dt className="font-semibold">Rating:</dt>
              <dd>{item.rating}</dd>
            </div>
            <div>
              <dt className="font-semibold">Extra Info:</dt>
              <dd>{item.extraInfo}</dd>
            </div>

            {/* Specific Fields */}
            {item.type === 'album' && (
              <>
                <div>
                  <dt className="font-semibold">Release year:</dt>
                  <dd>{item.albumYear}</dd>
                </div>
                <div>
                  <dt className="font-semibold">CD Count:</dt>
                  <dd>{item.cdsInAlbum}</dd>
                </div>
              </>
            )}
            {item.type === 'cd' && (
              <>
                <div>
                  <dt className="font-semibold">Release year:</dt>
                  <dd>{item.cdYear}</dd>
                </div>
                <div>
                  <dt className="font-semibold">CD Count:</dt>
                  <dd>{item.cdCount}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Track Count:</dt>
                  <dd>{item.trackCount}</dd>
                </div>
                {item.partOfAlbum && (
                  <div>
                    <dt className="font-semibold">Part of Album:</dt>
                    <dd>{item.partOfAlbum}</dd>
                  </div>
                )}
              </>
            )}
            {item.type === 'track' && (
              <>
                <div>
                  <dt className="font-semibold">CD Title:</dt>
                  <dd>{item.cdTitle}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Track number:</dt>
                  <dd>{item.trackNumber}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Length:</dt>
                  <dd>{item.length}</dd>
                </div>
              </>
            )}
          </div>
        </div>
      </dl>
    </main>
  );
}

export default ViewItemPAge;
