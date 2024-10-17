import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { MAX_AMOUNT_RATING_STARS } from '../lib/constants';

export default function getRatingStars(rating: number) {
  // Render a list of stars. Full stars for every rating score and empty stars for each missing score
  return (
    <div>
      {Array.from({ length: MAX_AMOUNT_RATING_STARS }, (_, i) =>
        i < rating ? (
          <StarIcon
            key={i}
            fontSize="small"
            className="text-yellow-500 -m-0.5"
          />
        ) : (
          <StarBorderIcon
            key={i}
            fontSize="small"
            className="text-gray-400 -m-0.5"
          />
        )
      )}
    </div>
  );
}
