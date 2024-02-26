import { FC } from "react";

type Props ={
    value: number
}
const Rating: FC<Props> = ({ value }) => {
    const filledStars = '★'.repeat(value);
    const emptyStars = '☆'.repeat(5 - value);
  
    const stars = filledStars + emptyStars;
  
    return (
      <div>
        <span>{stars}</span>
      </div>
    );
  };
  
  export default Rating
  