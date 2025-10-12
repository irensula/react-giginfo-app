import { useState } from "react";
import { FaStar } from "react-icons/fa";

const RateGigStars = () => {
    const [rating, setRating] = useState(null);
    const [rateColor, setColor] = useState(null);
    return(
        <div>
            {[...Array(5)].map((_, index) => {
                const currentRate = index + 1;
                    return (
                        <label key={index}>
                            <input 
                                type="radio" 
                                name="rate" 
                                value={currentRate}
                                onClick={()=>setRating(currentRate)} 
                            />
                            <FaStar 
                                color={ currentRate <= (rateColor || rating) ? "yellow" : "grey" } 
                                className="star"
                                onMouseEnter={()=>setColor(currentRate)}
                                onMouseLeave={()=>setColor(null)}
                            />
                        </label>
                        )
            })}
    </div>
    )
}

export default RateGigStars;