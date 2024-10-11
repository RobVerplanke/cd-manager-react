import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { ItemWithCoverCardProps } from '../../lib/types/types';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import getRatingStars from '../RatingStars';

function ItemWithCoverCard({ item }: { item: ItemWithCoverCardProps }) {
  const coverThumbnail =
    item.type === 'album'
      ? item.specificFields.album.cover.thumbnail
      : item.specificFields.cd.cover.thumbnail;

  const cdCount =
    item.type === 'album'
      ? item.specificFields.album.cdCount
      : item.specificFields.cd.cdCount;

  return (
    <div className="grid grid-cols-[50px_1fr_90px_100px_1fr] gap-2 items-center py-2 border-b">
      {/* Cover Thumbnail */}
      <div className="w-full h-full">
        <img
          src={coverThumbnail || 'default-thumbnail.jpg'}
          alt={item.title}
          className="object-cover w-full h-full rounded"
        />
      </div>

      {/* Title and artist info */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <h3 className="mr-2 text-lg font-bold">{item.title}</h3>
          <Link to={`/details/${item.id}`} className="pt-0.5 text-gray-500">
            <InfoIcon sx={{ fontSize: 18 }} />
          </Link>
          <Link to={`/edit/${item.id}`} className="pt-0.5 pl-2 text-gray-600">
            <EditNoteOutlinedIcon fontSize="small" />
          </Link>
        </div>
        <p className="text-sm text-gray-600">{item.artist}</p>
      </div>

      {/* Display the length of the track or the amount of CDs for albums or CDs */}
      <div className="text-sm text-gray-600">
        {cdCount !== undefined ? cdCount : 'N/A'}
      </div>

      {/* Rating */}
      {getRatingStars(item.rating)}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Link
            to={`/tag-selection/${tag}`}
            key={tag}
            className="bg-gray-200 rounded-full px-2 py-1 text-xs"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ItemWithCoverCard;
