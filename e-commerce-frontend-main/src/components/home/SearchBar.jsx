import { useState } from "react";

// Import all product arrays
import {
  electronicsPage,
  fashionPage,
  bestDealsPage,
  bestSellersPage,
} from "../../utils/data"; 
import { Link} from "react-router-dom";

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Combine all product arrays into one
  const allProducts = [
    ...electronicsPage,
    ...fashionPage,
    ...bestDealsPage,
    ...bestSellersPage,
  ];


  // Handle search input change
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    // Filter products based on productName or productFeature
    const filtered = allProducts.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchTerm) ||
        product.productFeature.toLowerCase().includes(searchTerm)
    );

    setSearchResults(filtered);
    if (onSearchResults) {
      onSearchResults(filtered, searchTerm)  // Pass results and query to parent
    }
  };

  return (   
            <section className="max-w-[1400px] mx-auto">
            <div className="group overflow-hidden ">
                <div className="bg-gray-200 flex g items-center px-[20px] py-[4px] h-[40px] w-[350px] rounded-[8px] md:mx-[40px] mx-auto md:mt-[80px] mt-[50px] transition-transform duration-300 ease-in-out active:scale-[1.2] md:group-hover:scale-[1.1]">
                  <i className="fa-solid fa-magnifying-glass md:mr-[10px]"></i>
                  <input
                      className="w-[100%] outline-none "
                      type="text"
                      placeholder="Search for Products, Brands and More"
                      value={query}
                      onChange={handleSearch}
                  />
                </div>
                <img 
                loading="lazy"
                className="mt-[30px] w-full"
                src="https://rukminim2.flixcart.com/fk-p-flap/2700/233/image/764fb9b9dd00ade5.jpg?q=60"
                alt="Banner"/>
                {/* Search Results Section */}
                {query && (
                <div className="mt-[30px] px-[20px]">
                    <h2 className="text-xl font-semibold mb-[20px]">
                    {searchResults.length > 0
                        ? `Search Results (${searchResults.length})`
                        : "No Results Found"}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
                    {searchResults.map((product) => (
                        <div
                        key={product.id}
                        className=" rounded-[8px] p-[15px] bg-white border-gray-200 border-[1px] shadow-md hover:shadow-lg transition-shadow">
                        <img
                            src={product.img}
                            alt={product.productName}
                            className="w-full h-[200px] object-contain mb-[10px]"
                            loading="lazy"/>
                        <h3 className="text-lg font-semibold truncate">{product.productName}</h3>
                        <p className="text-sm text-gray-600 truncate">{product.productFeature} </p>
                        <div className="flex items-center mt-[10px]">
                            <span className="text-lg text-red-600 font-semibold"> ₹{product.discountPrice.toLocaleString('en-IN')}</span>
                            <span className="text-sm text-gray-500 line-through ml-[10px]">₹{product.price.toLocaleString('en-IN')}</span>
                            <span className="text-sm text-green-600 ml-[10px]">{product.specialDiscount || "0"}% off</span>
                        </div>
                        <div className="flex items-center  text-sm my-[6px]"> 
                          <span className="bg-green-600 text-white  px-2 py-[2px] rounded">{product.ratings}</span>
                          <p className=" text-gray-700 mt-[5px] ml-[12px] "> {product.reviews} </p>
                        </div>
                        <div className="flex items-center justify-between mt-[8px]">
                        <p className="text-sm text-gray-700 "> Delivery in {product.delivery} days</p>
                        <Link to={`/BuyNow/${product.id}`}>
                          <span className=" ml-[30px] text-[0.8rem] text-gray-500 cursor-pointer hover:text-red-600 hover:transition-all hover:duration-300 hover:ease-in-out active:text-red-600">Buy Now <i className="fa-solid fa-angles-right text-[0.8rem"></i></span>
                        </Link>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}
            </div>
            </section>
       
  );
};

export default SearchBar;