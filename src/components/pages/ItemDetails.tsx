import { useParams } from 'react-router-dom';
import getItemById from '../../api/getItemById';
import { Album, Cd, Track } from '../../lib/types/types';
import { useEffect, useState } from 'react';

function ViewItemPAge() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Album | Cd | Track | null>(null);

  // Fetch item data when ID is available
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await getItemById(id);
        if (data) {
          setItem(data); // Set item only if data exists
        } else {
          console.error('Item not found');
          setItem(null); // Explicitly set null if no item is found
        }
      };
      fetchData();
    }
  }, [id]);

  // Display loading message when data is not available (yet)
  if (!item) return <div>Loading data...</div>;

  return (
    <main className="my-6 pl-6">
      <div className="text-3xl mb-4">
        <span>Item Details</span>
      </div>
      <dl className="grid grid-cols-2 gap-4">
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
            <dd>{item.featuringArtists.join(', ')}</dd>
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
        <div>
          <dt className="font-semibold">Release year:</dt>
          <dd>{item.year}</dd>
        </div>
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
              <dt className="font-semibold">CD Count:</dt>
              <dd>{item.specificFields.album.cdCount}</dd>
            </div>
            <div>
              <dt className="font-semibold">Cover:</dt>
              <dd>
                <img
                  src={item.specificFields.album.cover.fullSize}
                  alt="Album cover"
                />
              </dd>
            </div>
          </>
        )}
        {item.type === 'cd' && (
          <>
            <div>
              <dt className="font-semibold">CD Count:</dt>
              <dd>{item.specificFields.cd.cdCount}</dd>
            </div>
            <div>
              <dt className="font-semibold">Track Count:</dt>
              <dd>{item.specificFields.cd.trackCount}</dd>
            </div>
            {item.specificFields.cd.partOfAlbum && (
              <div>
                <dt className="font-semibold">Part of Album:</dt>
                <dd>{item.specificFields.cd.partOfAlbum}</dd>
              </div>
            )}
            <div>
              <dt className="font-semibold">Cover:</dt>
              <dd>
                <img
                  src={item.specificFields.cd.cover.thumbnail}
                  alt="CD cover"
                />
              </dd>
            </div>
          </>
        )}
        {item.type === 'track' && (
          <>
            <div>
              <dt className="font-semibold">CD Title:</dt>
              <dd>{item.specificFields.track.cdTitle}</dd>
            </div>
            <div>
              <dt className="font-semibold">Track number:</dt>
              <dd>{item.specificFields.track.trackNumber}</dd>
            </div>
            <div>
              <dt className="font-semibold">Length:</dt>
              <dd>{item.specificFields.track.length}</dd>
            </div>
          </>
        )}
      </dl>
    </main>
  );
}

export default ViewItemPAge;
