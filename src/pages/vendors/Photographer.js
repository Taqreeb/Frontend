import React,{useState} from "react";
import Filter from "../../components/Filter";


const Photographer = () => {
  const photographerCards = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
      title: "Eyewood Films",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4.4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1616940844649-535215ae4eb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      title: "Ideal Photography",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 4,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
      title: "King Deluxe Room",
      location: "Ancholi,karachi",
      reviews: 44,
      star: 3.8,
      price: "15000",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      title: "Royal Suite",
      location: "Ancholi",
      reviews: 44,
      star: 3.5,
      price: "15000",
    },
  ];
  const [vendors, setVendors] = useState(photographerCards);
  const [filteredVendors, setFilteredVendors] = useState(vendors);
  const [sortBy, setSortBy] = useState('');

  const handleFilterChange = ({ price, rating, location }) => {
    let filteredData = photographerCards;
    if (price) {
      filteredData = filteredData.filter((restaurant) => restaurant.price === parseInt(price));
    }
    if (rating) {
      filteredData = filteredData.filter((restaurant) => restaurant.rating === parseInt(rating));
    }
    if (location) {
      filteredData = filteredData.filter((restaurant) => restaurant.location === location);
    }
    setFilteredVendors(filteredData);
  };

  const handleSortChange = (sortOrder) => {
    setSortBy(sortOrder);
    let sortedData = [...filteredVendors];
    if (sortOrder === 'asc') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      sortedData.sort((a, b) => b.price - a.price);
    }
    setFilteredVendors(sortedData);
  };
   
  
 
  return (
  //  <VendorLayout title={Photographer} recordsPerPage={12} vendorCards={photographerCards} vendorType="Photographer"/>    
<div>
<Filter onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
<ul>
{filteredVendors.map((vendor,index) => (
<li key={index}>
{vendor.title} - {vendor.price} - {vendor.rating} stars - {vendor.location}

</li>
))}
</ul>

</div>
  );
};

export default Photographer;
