import { getStar } from "../../../utils/functions";
import { editorClickable } from "../../../utils/a11y";
import { symbol } from "../../../utils/icons";
import Image from "../Image";
import ReviewText from "../ReviewText";
import RatingIcon from "../RatingIcon";

const ThemeTwo = ({
  attributes = {},
  itemEls = {},
  item = {},
  index,
  activeIndex,
  setActiveIndex,
  isBackend,
}) => {
  const { starIconColor, grid2Bg, showStarBadge } = attributes || {};

  const { img = {}, reviewText = "", rating = 5 } = item || {};

  // The corner score pill. Only the Gradient Border Grid declares
  // `showStarBadge`, so every other block rendering this theme reads `undefined`
  // here and is unchanged -- the attribute is both the control and the gate.
  //
  // The numeric score rather than a second row of stars: the star row above
  // already says how many, and repeating it in a pill would say it twice.
  const badgeScore = Math.min(5, Math.max(0, Number(rating) || 0));

  return (
    <div
      key={index}
      className={`single ${
        isBackend && index === activeIndex ? "btbNowEditing" : ""
      }`}
      {...editorClickable(isBackend, () => setActiveIndex(index))}>
      {showStarBadge && (
        <span className="btb-star-badge">
          <span className="btb-star-badge-icon" aria-hidden="true">
            ★
          </span>
          {badgeScore.toFixed(1)}
        </span>
      )}

      <div className="top">
        <RatingIcon
          attributes={attributes}
          getStar={getStar}
          rating={rating}
          starIconColor={starIconColor}
        />
        <ReviewText
          attributes={attributes}
          itemEls={itemEls}
          isBackend={isBackend}
          reviewText={reviewText}
        />
        <div className="icon">{symbol(grid2Bg)}</div>
      </div>

      <div className="bottom">
        <Image attributes={attributes} img={img}>
          {itemEls?.img}
        </Image>
        <div className="info">
          {itemEls?.name}
          {itemEls?.deg}
        </div>
      </div>
    </div>
  );
};
export default ThemeTwo;
