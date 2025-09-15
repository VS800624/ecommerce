import { Link} from "react-router-dom";
import { navHeading } from "../utils/data";
import { usefulLinks } from "../utils/data";
import logo from "../images/nivzone_transparent.png";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const NivzoneFooter = () => {
   return <section className="max-w-[1450px] mx-auto mt-[40px]">
             <div className="flex md:flex-row flex-col bg-slate-700 md:h-[520px] h-[1300px]  ">
               <div className="md:w-[20%] md:ml-[80px] ml-[20px] lg:ml-[120px] mt-[50px] md:mt-[100px]">
                   <div className="flex flex-col w-[120px]  my-[14px]  ">
                        <img src= {logo} className=" w-full object-cover object-center" alt="" />
                    </div>       
                   <p className="text-white  text-[0.9rem] ">Nivzone, a VS Enterprise, delivers premium products with a focus on , innovation, ensuring excellence and customer satisfaction in every purchase. With a commitment to innovation and reliability, we strive to deliver the best shopping experience.</p>
               </div>
                <div className="text-white lg:w-[20%] md:w-[25%] md:block mt-[60px] md:ml-[70px] md:mt-[100px] ml-[20px]">
                   <h4 className="text-[1.5rem] font-semibold mb-[12px]">QUICKS LINKS <hr className="text-amber-300 w-[30%] border-[1px] ml-[2px]" /></h4>
                   <ul  className="list-disc pl-5 text-[0.95rem]">
                    {
                        navHeading.map((heading , index) => {
                            const updateURL = heading.split(" ").join("")
                            return <Link key = { heading + index} to = {`/${heading == 'Home'?'': updateURL}`}
                            className="relative flex w-fit text-white group"><li  className="mb-[6px] hover:text-red-600 hover:transition-all hover:duration-300 hover:ease-in-out cursor-pointer ">{ heading }
                             <span className="absolute left-0 bottom-0 h-[2px] bg-red-600 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                            </li>
                            </Link>
                        })
                    }
                    </ul> 
                </div>              
                <div className="text-white lg:w-[20%] md:w-[25%] md:block mt-[60px] md:ml-[20px] md:mt-[100px] ml-[20px]">
                       <h4 className="text-[1.5rem] font-semibold mb-[12px]">USEFUL LINKS <hr className="text-amber-300 w-[30%] border-[1px] ml-[2px]" /></h4>
                        <ul  className="list-disc pl-5 text-[0.95rem]">
                         {
                        usefulLinks.map((heading , index) => {
                            const updateURL = heading.split(" ").join("")
                            return <Link  key = { heading + index} to = {`/${updateURL}`} className="relative flex w-fit text-white group"><li className="mb-[6px] hover:text-red-600 hover:transition-all hover:duration-300 hover:ease-in-out cursor-pointer">{heading} 
                            <span className="absolute left-0 bottom-0 h-[2px] bg-red-600 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                            </li>
                            </Link>
                            })
                         }
                        </ul> 
                    </div>             
                                                   
                    <div className="text-white lg:w-[20%] md:w-[25%] ml-[20px] lg:ml-[0px] mt-[60px] md:mt-[100px] lg:mr-[100px]">
                        <h4 className="text-[1.5rem] font-semibold mb-[12px]">CONTACT INFO<hr className="text-amber-300 w-[30%] border-[1px] ml-[2px]" /></h4>
                        <ul>
                            <li className="mb-[12px]"><i className="fa-solid fa-location-dot mr-[6px]"></i> Network Solutions LLC
                            742 Evergreen Ave, Ste 210, Riverton, New Columbia-10567 USA</li>
                            <li className="mb-[12px]"><i className="fa-solid fa-mobile-screen mr-[6px]"></i> <a href="tel:+18048811189" className="hover:text-red-600 active:text-red-600">
                            +1-463-439-489-8594 </a></li>
                            <li className="mb-[12px]"><i className="fa-solid fa-envelope mr-[6px]"></i> <a href="mailto:neikk345@gmail.com" className="hover:text-red-600 active:text-red-600">neikk345@gmail.com</a></li>
                            <li className="mb-[12px]"><i className="fa-solid fa-envelope mr-[6px]"></i> Reg. No:- +91 95576724469728</li>
                            <li className="mb-[12px]"><i className="fa-solid fa-envelope mr-[6px]"></i> E-Commerce Business License No:- 3059827631</li>
                        </ul>
                    </div>
                    </div>
                    <div className="text-white bg-black md:h-[50px] h-[100px] flex md:flex-row flex-col items-center justify-between">
                        <p className="text-[0.9rem] md:ml-[120px] text-center py-[10px]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Copyright© 2025. Nivzone All Rights Reserved. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Made with love&#x2764;&#xfe0f; India.</p>
                        <div className="md:mr-[140px] flex  items-center pb-[10px]">
                            <span className="text-white text-[0.9rem] font-semibold mr-[14px]">Follow Us:</span>
                            <span><a href="https://www.facebook.com">
                            <FaFacebook className="text-2xl hover:text-gray-500 duration-300 mr-[1rem]"/> </a> </span>
                            <span><a href="https://www.linkdin.com">
                            <FaLinkedin className="text-2xl hover:text-gray-500 duration-300 mr-[1rem]"/> </a> </span>
                            <span><a href="https://x.com">
                            <FaSquareXTwitter className="text-2xl hover:text-gray-500 duration-300 mr-[1rem]"/> </a> </span>
                            <span><a href="https://www.instagram.com">
                            <FaInstagramSquare className="text-2xl hover:text-gray-500 duration-300"/> </a> </span>
                        </div>
            </div>
        </section> 
}


export default NivzoneFooter;