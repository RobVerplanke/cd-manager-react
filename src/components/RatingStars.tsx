import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { MAX_AMOUNT_RATING_STARS } from '../lib/constants';

export default function getRatingStars(rating: number) {
  // A list with full and/or empty starts, depending on the score
  const ratingStarsList = [];

  // Return a full star
  function getFilledStar(i: number) {
    return (
      <StarIcon key={i} fontSize="small" className="text-yellow-500 -m-0.5" />
    );
  }

  // Return an empty star
  function getEmptyStar(i: number) {
    return (
      <StarBorderIcon
        key={i}
        fontSize="small"
        className="text-gray-400 -m-0.5"
      />
    );
  }

  // Render a full star for each rating point
  for (let i = 0; i < rating; i++) {
    ratingStarsList.push(getFilledStar(i));
  }

  // Render an empty star for each missing rating point (if there is any)
  if (rating < MAX_AMOUNT_RATING_STARS) {
    for (let i = rating; i < MAX_AMOUNT_RATING_STARS; i++) {
      ratingStarsList.push(getEmptyStar(i));
    }
  }

  return <div>{ratingStarsList}</div>;
}
