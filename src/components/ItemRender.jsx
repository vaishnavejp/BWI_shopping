import React from "react";
import '../styles/item.css';

export default function ItemRender({key, name, price, url}) {
    return(
        <div className="card">
            <img src={url} alt={name} />
            <p>Name: {name}</p>
            <p>Price: ${price}</p>
        </div>
    )
}