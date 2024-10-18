import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { type ItemWithCoverCardProps } from '../../lib/types/types';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import getRatingStars from '../RatingStars';
import { isAlbum, isCd } from '../../utils/helperFunctions';

function ItemWithCoverCard({ item }: { item: ItemWithCoverCardProps }) {
  const coverThumbnail = isCd(item)
    ? item.cover.cdThumbnail
    : item.cover.albumThumbnail;
  const cdCount = isAlbum(item) ? item.cdsInAlbum : item.cdCount;

  return (
    <div className="grid grid-cols-[50px_1fr_90px_100px_1fr] gap-2 items-center py-1 border-b">
      {/* Cover Thumbnail */}
      <div className="w-full h-full">
        <img
          src={coverThumbnail || 'https://placehold.co/30x30'}
          alt={item.title}
          className="object-cover w-full h-full rounded"
        />
      </div>

      {/* Title and artist info */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <h3 className="mr-2 text-sm font-bold">{item.title}</h3>

          {/* Render 'More details' icon */}
          <Link
            to={`/details/${item.id}`}
            className="text-[#176061]"
            aria-label="Item details"
          >
            <InfoIcon sx={{ fontSize: 18 }} />
          </Link>

          {/* Render Edit icon */}
          <Link
            to={`/edit/${item.id}`}
            className="pl-1 text-[#176061]"
            aria-label="Edit item"
          >
            <EditNoteOutlinedIcon fontSize="small" />
          </Link>
        </div>
        <p className="text-xs text-gray-600">{item.artist}</p>
      </div>

      {/* Display the length of the track or the amount of CDs for albums or CDs */}
      <div className="text-xs text-gray-600">
        {cdCount !== undefined ? cdCount : 'N/A'}
      </div>

      {/* Render rating stars */}
      {getRatingStars(item.rating)}

      {/* Render tags */}
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Link
            to={`/tag-selection/${tag}`}
            key={tag}
            className="bg-gray-200 rounded-full px-2 py-1 text-xs"
            aria-label="Tag"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ItemWithCoverCard;
