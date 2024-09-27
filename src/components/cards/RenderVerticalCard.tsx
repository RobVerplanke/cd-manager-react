import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { RenderVerticalCardProps } from '../../lib/types/types';

function RenderVerticalCard({ item }: { item: RenderVerticalCardProps }) {
  return (
    <div className="grid grid-cols-[80px_1fr_30px] gap-4 items-center py-2 border-b">
      <div className="item-thumbnail">
        <img
          src={item.cover.thumbnail}
          alt={`${item.title} cover`}
          className="w-full h-auto rounded"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <h3 className="mr-3 text-lg font-bold">{item.title}</h3>
          <button className="pt-0.5 text-gray-600">
            <EditNoteOutlinedIcon />
          </button>
        </div>
        <p className="text-sm text-gray-600">{item.artist}</p>
        {'cdCount' in item && (
          <p className="text-xs text-gray-600">CDs: {item.cdCount}</p>
        )}
        <p>⭐⭐⭐⭐⭐</p>
        <div className="flex flex-wrap gap-2 mt-2">
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
      <div className="text-blue-500 cursor-pointer"></div>
    </div>
  );
}

export default RenderVerticalCard;
