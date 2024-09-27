import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { RenderHorizontalCardProps } from '../../lib/types/types';

function RenderHorizontalCard({ item }: { item: RenderHorizontalCardProps }) {
  return (
    <div className="grid grid-cols-[1fr_50px_100px_1fr] gap-2 items-center py-2 border-b">
      <div className="flex flex-col">
        <div className="flex items-center">
          <h3 className="mr-3 text-lg font-bold">{item.title}</h3>
          <button className="pt-0.5 text-gray-600">
            <EditNoteOutlinedIcon />
          </button>
        </div>
        <p className="text-sm text-gray-600">{item.artist}</p>
      </div>

      <div className="text-sm text-gray-600">
        {'length' in item && item.length}
        {'cdCount' in item && item.cdCount}
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

export default RenderHorizontalCard;
