const LatestBlog = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-20 py-5 mx-auto">
                <div className="flex flex-col w-full my-8">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Latest Blog</h1>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 md:w-1/3">
                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                            <div className="overflow-hidden">
                                <img className=" w-full object-cover object-center aspect-[16/9] hover:scale-110 transition-all transition-[2s]" src="https://www.anandsweets.in/cdn/shop/articles/10_most_popular_indian_sweets_you_must_try.png?v=1725529168&width=533" alt="blog" />
                            </div>
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">September 05, 2024</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Top 10 Most Popular Indian Sweets You Must Try</h1>
                                <div className="flex items-center flex-wrap ">
                                    <a href="/" className="inline-flex items-center md:mb-2 lg:mb-0 border-b-2 border-black text-black ">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/3">
                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                            <div className="overflow-hidden">
                                <img className=" w-full object-cover object-center aspect-[16/9] hover:scale-110 transition-all transition-[2s]" src="https://www.anandsweets.in/cdn/shop/articles/kitchen-fi.png?v=1713352577&width=533" alt="blog" />
                            </div>
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">April 17, 2024</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Preserving Tradition: The Timeless Art of Indian Cooking and Sweets</h1>
                                <div className="flex items-center flex-wrap ">
                                    <a href="/" className="inline-flex items-center md:mb-2 lg:mb-0 border-b-2 border-black text-black ">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/3">
                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                            <div className="overflow-hidden">
                                <img className=" w-full object-cover object-center aspect-[16/9] hover:scale-110 transition-all transition-[2s]" src="https://www.anandsweets.in/cdn/shop/articles/milk-blog-fi.png?v=1712560309&width=533" alt="blog" />
                            </div>
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">September 05, 2024</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Alchemy: A Reflection on the Magic of Milk</h1>
                                <div className="flex items-center flex-wrap ">
                                    <a href="/" className="inline-flex items-center md:mb-2 lg:mb-0 border-b-2 border-black text-black ">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LatestBlog;