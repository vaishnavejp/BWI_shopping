import React from "react";

export default function PriceFilter({handleCheckbox, data}) {
    const prices = [100, 500, 1000];

    // console.log(data);

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            {prices.map((price, id) => (
                <label key={price}>
                    Under ${price}
                    <input
                        type="checkbox"
                        name={`under${price}`}
                        onChange={handleCheckbox}
                    />
                </label>
            ))}
        </div>
    )
}