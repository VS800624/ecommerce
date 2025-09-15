import { Link } from "react-router-dom";
import { bestSellersPage } from "../utils/data";


const BestSellers = () => {
    return  <section className="max-w-[1400px] mx-auto">
            <div className="md:flex justify-between  my-[30px] items-center  mt-[50px]">
                <h2 className="md:text-[2rem] text-[1.6rem] font-bold md:ml-[120px] pl-[36px] md:pl-[0px] ">BEST SELLERS </h2>
               
            </div>
            <div className="grid sm:grid-cols-2  lg:grid-cols-3 md:mx-[120px] gap-[30px] ">
                {bestSellersPage.map((data) => {
                   const {productName, discount, price, img, id} = data
                   return (
                <div key={id} className="pb-[18px] rounded-[8px] group overflow-hidden hover:shadow-md  bg-white w-[340px] md:w-[368px] border-[1px] border-gray-200 mb-[40px] mx-auto md:mx-[0px]">
                    <div className="h-[242px] md:w-[368px] w-[340px]  overflow-hidden">
                       <img loading="lazy" className="  object-cover cursor-pointer h-full w-full transition-transform duration-300 ease-in-out active:scale-[1.2] md:group-hover:scale-[1.1]" src = {img} alt="" />
                    </div>
                    <p className="  my-[14px] ml-[30px] items-center font-semibold cursor-pointer hover:text-blue-400 hover:transition-all hover:duration-300 hover:ease-in-out"> {productName}</p>
                    <div className="flex items-center justify-between mr-[30px]">
                       <p className="ml-[30px] text-[0.92rem] md:text-[0.95rem] text-green-500 mt-[2px] ">Save {discount}%*</p>
                       <Link to={`/BuyNow/${id}`}>
                            <button className="ml-[30px] px-[18px] bg-gray-200 py-[4px] rounded-[6px] text-[0.92rem] md:text-[0.95rem] text-black font-semibold mt-[4px] active:text-white active:bg-blue-400 hover:text-white hover:bg-blue-400 hover:transition-all hover:duration-300 hover:ease-in-out cursor-pointer mb-[4px]">FROM &#8377;{price.toLocaleString('en-IN')}</button>
                       </Link>
                </div>
            </div>
                   )
                })}
            </div>
            </section>
}


export default BestSellers;