import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { ItemCardProps } from '../../lib/types/types';
import InfoIcon from '@mui/icons-material/Info';

function ItemCard({ item }: { item: ItemCardProps }) {
  return (
    <div className="grid grid-cols-[1fr_90px_100px_1fr] gap-2 items-center py-2 border-b">
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

      <div className="text-sm text-gray-600">
        {'length' in item && item.length}
      </div>
      <p>⭐⭐⭐⭐⭐</p>
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

export default ItemCard;
