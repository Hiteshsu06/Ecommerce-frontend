import { footerContent } from '../../constants/footerContent.js'


const Footer = () => {
    return (
        <footer className="w-full py-2">
            <div className="w-full p-20 bg-[#fffbf5]">
                <div
                    className="flex items-center justify-center lg:justify-between flex-col lg:flex-row gap-7 lg:gap-0 border-b border-[#b69754]">
                    <a href={footerContent.website} className="flex justify-center lg:justify-start">
                        <img src={footerContent.logo} className="w-[154px]" alt={footerContent.title} />
                    </a>
                    <div
                        className="flex items-center gap-2 px-7 ">
                        <img src={footerContent.logo2} alt='' className="w-[154px]" />
                    </div>
                </div>
                <div className="flex justify-between flex-col py-8 min-[500px]:py-14 gap-8 min-[500px]:gap-16 lg:gap-0 lg:flex-row">
                    <div
                        className="flex flex-col items-center max-lg:justify-center min-[500px]:items-start min-[500px]:flex-row gap-8 sm:gap-12 xl:gap-24">
                        {footerContent.category.map((item, index) => {
                            return (
                                <div key={index} className="block">
                                    <h4
                                        className="text-lg text-gray-900 font-bold mb-4 min-[500px]:mb-7 text-center min-[500px]:text-left">
                                        {item.name}</h4>
                                    <ul className="grid gap-2 min-[500px]:gap-3 text-center min-[500px]:text-left">
                                        {item.list.map((list, i) => {
                                            return (
                                                <li key={i}><a href={list.url}
                                                    className="text-gray-600 font-medium hover:text-gray-900">{list.name}</a></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                    <div className="block  md:w-[50%]">
                        <h3
                            className="font-manrope font-semibold text-[30px] text-[#b69754] leading-9 mb-6 text-center lg:text-left font-['M-HEADING-FONT']">We’d Be Happy To Assist You!</h3>
                        <div
                            className="lg:bg-gray-100 lg:rounded-lg lg:h-16 lg:p-1.5 lg:flex-row gap-6 lg:gap-0 flex-col flex items-center justify-between">
                            <input type="text" name="email"
                                className="py-3 px-6 bg-gray-100 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none flex-1 w-full max-w-xl mx-auto lg:w-auto lg:py-5 lg:px-7 lg:bg-transparent"
                                placeholder="Your email here..." />
                            <button type="submit"
                                className="py-3.5 px-7 bg-[#b69754] shadow-md rounded-lg text-white font-semibold hover:bg-[#9a8048]">Subscribe</button>
                        </div>
                        <div className='shop-detail w-full flex gap-28 mt-8'>
                            <div className="timing">
                                <p className='font-semibold pb-4'>Timing:</p>
                                <div className=" text-gray-600 font-medium hover:text-gray-900">{footerContent.timing.days}</div>
                                <div className=" text-gray-600 font-medium hover:text-gray-900">{footerContent.timing.time}</div>
                            </div>
                            <div className="email">
                                <p className='font-semibold pb-4'>Email:</p>
                                <a href={`mailto:${footerContent.email}`} className="no-underline text-gray-600 font-medium hover:text-gray-900">{footerContent.email}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-9 px-20 border-t border-gray-200">
                <div className="flex items-center justify-center flex-col gap-8 lg:gap-0 lg:flex-row lg:justify-between">
                    <span className="text-sm text-gray-500 ">© {new Date().getFullYear()} Copyright. <a href={footerContent.website}>{footerContent.title}</a>, All rights reserved.</span>
                    <div className="flex mt-4 space-x-4 sm:justify-center sm:mt-0 ">
                        {
                            footerContent.social.map((item, index) => {
                                return (
                                    <a
                                        href={item.url}
                                        key={index}
                                        className="w-9 h-9 rounded-full text-white bg-[#b69754] flex justify-center items-center hover:#9a8048">
                                        <i className={item.icon}></i>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer