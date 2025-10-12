import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Stars = ({gigRate = 0, onRateChange = () => {} }) => {
    const [rating, setRating] = useState(gigRate);
    const [rateColor, setColor] = useState(null);
    
    const handleChange = (newRate) => {
        setRating(newRate);
        onRateChange(newRate);
    }

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
                                onClick={() => handleChange(currentRate)} 
                            />
                            <FaStar 
                                color={ currentRate <= (rateColor || rating) ? "yellow" : "grey" } 
                                className="star"
                                onMouseEnter={()=>setColor(currentRate)}
                                onMouseLeave={()=>setColor(null)}
                                onClick={() => handleChange(currentRate)}
                            />
                        </label>
                        )
            })}
    </div>
    )
}

export default Stars;