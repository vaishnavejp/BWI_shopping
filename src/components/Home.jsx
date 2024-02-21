import React, { useEffect, useState } from "react";
import ItemRender from "./ItemRender";
import '../styles/home.css'
import PriceFilter from "./PriceFilter";

export default function Home() {

    const [data, setData] = useState(null);
    const [search, setSearch] = useState('');
    const [url, setUrl] = useState('https://dummyjson.com/products');
    const [open, setOpen] = useState(false);

    const [priceFilter, setPriceFilter] = useState({
      under100: false,
      under500: false,
      under1000: false
    });

    const [filteredProducts, setFilteredProducts] = useState([]);
  
    const handleCheckbox = (event) => {
      const { name, checked } = event.target;
      console.log(name)
      setPriceFilter({
        ...priceFilter,
        [name]: true
      });
    };

    const handleSearch = (e) => {
      setSearch(e.target.value);
    }

    const handleClick = () => {
      setUrl(`https://dummyjson.com/products/search?q=${search}`)
    }

    const handleOpen = () => {
      setOpen(!open);
      setPriceFilter(false);
    }

    useEffect(() => {
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw new Error('Failed to fetch data');
            }
            return res.json();
        })
        .then(data => {
            // console.log(data.products[0])
            setData(data.products);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [url]);


    useEffect(() => {
      let filteredData;
      if (priceFilter.under100) {
        filteredData = (data && data.filter(obj => obj.price <= 100));
      } else if (priceFilter.under500) {
        filteredData = (data && data.filter(obj => obj.price <= 500));
      } else {
        filteredData = (data && data.filter(obj => obj.price <= 1000));
      }
      setFilteredProducts(filteredData);
    }, [priceFilter])

    return(
      <div className="wrapper">
        <div className="filter">
          <div className="overall">
            <div className="dropdown">
              <button className="dropdown" onClick={handleOpen}>Price Filters</button>
            </div>
            {open && (
              <div>
                <PriceFilter 
                  handleCheckbox={handleCheckbox}
                  data={data}
                />
              </div>
            )}
          </div>
        </div>
        <div>
        <div className="searchbar">
          <div className="inner-search">
            <input placeholder="Search Name of Product" className="search" onChange={handleSearch} value={search} id="in-search"/>
            <button className="mag" onClick={handleClick}>🔍</button>
          </div>
        </div>
        <div className="home-authW">
          {open && (
            <div>
                {filteredProducts && filteredProducts.map((obj, index) => (
                          <ItemRender 
                          id={index}
                          name={obj.title}
                          price={obj.price}
                          url={obj.images[0]}
                        />
                ))}
            </div>
          )}
          {!open && data && data.length > 0 ? (
            <div>
              {data.map((obj, index) => (
                <div key={index}>
                  <ItemRender 
                    id={index}
                    name={obj.title}
                    price={obj.price}
                    url={obj.images[0]}
                  />
                </div>
              ))}
            </div>
        ) : (
          <p></p>
        )}
      </div>
        </div>
    </div>
    )
}