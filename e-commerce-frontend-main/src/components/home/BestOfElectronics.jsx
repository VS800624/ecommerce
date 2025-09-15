import { bestOfElectronicsHome } from "../../utils/data";
import { Link } from "react-router-dom";


const BestOfElectronics = () => {
    
    return  <section className="max-w-[1400px] mx-auto">
                
                <div className="md:flex justify-between  my-[30px] items-center  md:mt-[50px]">
                    <h2 className="md:text-[2rem] text-[1.6rem] font-bold md:ml-[120px] pl-[36px] md:pl-[0px] ">BEST OF ELECTRONICS </h2>
                    <Link to= '/Electronics'>
                    <span className="md:block hidden md:mr-[120px] text-[1.2rem] cursor-pointer font-bold text-blue-400 hover:text-blue-500 hover:transition-all hover:duration-300 hover:ease-in-out">View All <i className="fa-solid fa-chevron-right"></i></span>
                    </Link>
                </div>
                <div className="grid sm:grid-cols-2  lg:grid-cols-3 md:mx-[120px] gap-[30px] ">
                    {bestOfElectronicsHome.map((data) => {
                    const {productName,  discount, price, img, id} = data
                    return (
                    <div key={id} className="pb-[18px] rounded-[8px] group overflow-hidden hover:shadow-md  bg-white w-[340px] md:w-[368px] border-[1px] border-gray-200 mb-[40px] mx-auto md:mx-[0px]">
                        <div className="h-[242px] md:w-[368px] w-[340px]  overflow-hidden">
                            <img loading="lazy" className=" object-contain object-center cursor-pointer h-full w-full transition-transform duration-300 ease-in-out active:scale-[1.2] md:group-hover:scale-[1.1]" src = {img} alt="" />
                        </div>
                        <Link to={`/BuyNow/${id}`}>
                        <p className=" my-[14px] ml-[30px] items-center font-semibold cursor-pointer hover:text-blue-400 hover:transition-all hover:duration-300 hover:ease-in-out"> {productName}</p>
                        <div className="flex items-center justify-between mr-[30px]">
                            <p className="ml-[30px] text-[0.92rem] md:text-[0.95rem] text-green-500 mt-[2px] ">Save {discount}%*</p>
                            <button className="ml-[30px] px-[18px] bg-gray-200 py-[4px] rounded-[6px] text-[0.92rem] md:text-[0.95rem] text-black font-semibold mt-[4px] hover:text-white hover:bg-blue-400 hover:transition-all hover:duration-300 hover:ease-in-out cursor-pointer mb-[4px]">FROM &#8377;
                            {price.toLocaleString('en-IN')}</button>
                        </div>
                        </Link>
                    </div>
               )
            })}
                </div>
        </section>

}


export default BestOfElectronics;
