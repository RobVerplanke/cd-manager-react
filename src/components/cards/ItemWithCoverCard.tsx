import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { ItemWithCoverCardProps } from '../../lib/types/types';
import InfoIcon from '@mui/icons-material/Info';

function ItemWithCoverCard({ item }: { item: ItemWithCoverCardProps }) {
  return (
    <div className="grid grid-cols-[50px_1fr_90px_100px_1fr] gap-2 items-center py-2 border-b">
      {/* Cover Thumbnail */}
      <div className="w-full h-full">
        <img
          src="https://placehold.co/30x30"
          alt={item.title}
          className="object-cover w-full h-full rounded"
        />
      </div>

      {/* Title and artist info */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <h3 className="mr-2 text-lg font-bold">{item.title}</h3>
          <button className="pt-0.5 text-gray-500">
            <InfoIcon sx={{ fontSize: 18 }} />
          </button>
          <button className="pt-0.5 pl-2 text-gray-600">
            <EditNoteOutlinedIcon fontSize="small" />
          </button>
        </div>
        <p className="text-sm text-gray-600">{item.artist}</p>
      </div>

      {/* Length or CD count */}
      <div className="text-sm text-gray-600">
        {'cdCount' in item && item.cdCount}
      </div>

      {/* Rating */}
      <p>⭐⭐⭐⭐⭐</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <button
            key={tag}
            className="bg-gray-200 rounded-full px-2 py-1 text-xs"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ItemWithCoverCard;
