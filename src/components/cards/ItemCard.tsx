import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { ItemCardProps } from '../../lib/types/types';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import getRatingStars from '../RatingStars';

function ItemCard({ item }: { item: ItemCardProps }) {
  return (
    <div className="grid grid-cols-[1fr_90px_100px_1fr] gap-2 items-center py-2 border-b">
      <div className="flex flex-col">
        <div className="flex items-center">
          <h3 className="mr-2 text-sm font-bold">{item.title}</h3>
          <Link
            to={`/details/${item.id}`}
            className="text-gray-500"
            aria-label="Item details"
          >
            <InfoIcon sx={{ fontSize: 18 }} />
          </Link>
          <Link
            to={`/edit/${item.id}`}
            className="pl-2 text-gray-600"
            aria-label="Edit item"
          >
            <EditNoteOutlinedIcon fontSize="small" />
          </Link>
        </div>
        <p className="text-xs text-gray-600">{item.artist}</p>
      </div>

      <div className="text-xs text-gray-600">
        {'length' in item && item.length}
      </div>
      {getRatingStars(item.rating)}
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

export default ItemCard;
