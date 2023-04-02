import React,{useState} from 'react'

const Filter = ({ onFilterChange, onSortChange }) => {
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [location, setLocation] = useState('');
  
    const handleFilterChange = () => {
      onFilterChange({ price, rating, location });
    };
  
    const handleSortChange = (e) => {
      onSortChange(e.target.value);
    };
  
    return (
      <div>
        <label>
          Price:
          <select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option value="">All</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
          </select>
        </label>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">All</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </label>
        <label>
          Location:
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">All</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="Houston">Houston</option>
          </select>
        </label>
        <label>
          Sort by price:
          <select onChange={handleSortChange}>
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </label>
        <button onClick={handleFilterChange}>Filter</button>
      </div>
    );
  };
export default Filter
