import "font-awesome/css/font-awesome.min.css";

const StarRating = ({ selectedStars = 3 }: any) => {
  const totalStars = 5;
  const firstMethod = () => {
    return [...Array(totalStars)].map((el, i: any) =>
      i < selectedStars ? (
        <i key={i} className="fa fa-star text-red-800" />
      ) : (
        <i key={i} className="fa fa-star-o" />
      )
    );
  };

  const secondMethod = () => {
    return [...Array(totalStars)].map((el, i: any) =>
      i < selectedStars && i + 1 > selectedStars ? (
        <i key={i} className="fa fa-star-half-o text-red-800" />
      ) : i < selectedStars ? (
        <i key={i} className="fa fa-star text-red-800" />
      ) : (
        <i key={i} className="fa fa-star-o" />
      )
    );
  };
  return (
    <>{Number.isInteger(selectedStars) ? firstMethod() : secondMethod()}</>
  );
};

export default StarRating;
