/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

const SubscriptionCards = ({ createSession }) => (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                    The right plan can change your work life
                </h2>
                {/* <p className="mt-6 text-base font-normal text-gray-600 font-pj">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim orci, velit, commodo sed iaculis odio. In congue
                    eget.
                </p> */}
            </div>

            <div className="grid items-center max-w-md grid-cols-1 mx-auto mt-8 md:max-w-5xl gap-y-6 md:mt-16 md:grid-cols-3">
                <div className="bg-white">
                    <div className="p-6 lg:px-10 lg:py-9">
                        <div className="text-center">
                            <p className="text-4xl">🚀</p>
                            <h3 className="mt-6 text-sm font-bold tracking-widest uppercase font-pj">Startup</h3>
                            <p className="mt-1.5 font-pj text-sm text-gray-600">Best for small business owners</p>
                            <div className="flex items-end justify-center mt-6">
                                <p className="text-lg font-bold text-gray-400 font-pj">$</p>
                                <p className="text-4xl ml-0.5 font-bold text-gray-900 font-pj">499</p>
                                <p className="text-lg font-bold text-gray-400 font-pj">/year</p>
                            </div>
                        </div>

                        <ul className="space-y-3 text-base font-medium text-gray-900 mt-9">
                            <li className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                2000 Videos per month
                            </li>

                            <li className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Custom Domain
                            </li>

                            <li className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Export Leads to CSV
                            </li>
                        </ul>

                        <div className="mt-12 text-center" onClick={() => createSession('price_1OayCnCCHyXUnN33ZxTL9HOl')}>
                            <a
                                href="#"
                                title=""
                                className="
                                flex
                                items-center
                                justify-center
                                w-full
                                px-4
                                py-4
                                text-base
                                font-bold
                                text-gray-900
                                transition-all
                                duration-200
                                bg-gray-100
                                border border-transparent
                                lg:px-8
                                hover:bg-gray-900 hover:text-white
                                focus:text-white focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                font-pj
                            "
                                role="button"
                            >
                                Subscribe
                            </a>

                            {/* <p className="mt-4 text-sm text-gray-600 font-pj">No credit card required</p> */}
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-x-2 -inset-y-px">
                        {/* <div
                            className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter"
                            style="background: linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
                        /> */}
                    </div>

                    <div className="relative bg-white shadow-xl">
                        <div className="py-2 text-center bg-gray-700">
                            <p className="text-xs font-bold tracking-widest text-white uppercase font-pj">Most Popular</p>
                        </div>
                        <div className="p-6 lg:px-10 lg:py-9">
                            <div className="text-center">
                                <p className="text-4xl">⚡️</p>
                                <h3 className="mt-6 text-sm font-bold tracking-widest uppercase font-pj">Agency</h3>
                                <p className="mt-1.5 font-pj text-sm text-gray-600">Best for medium agency</p>
                                <div className="flex items-end justify-center mt-6">
                                    <p className="text-lg font-bold text-gray-400 font-pj">$</p>
                                    <p className="text-4xl ml-0.5 font-bold text-gray-900 font-pj">999</p>
                                    <p className="text-lg font-bold text-gray-400 font-pj">/year</p>
                                </div>
                            </div>

                            <ul className="space-y-3 text-base font-medium text-gray-900 mt-9">
                                <li className="flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    5000 Videos per month
                                </li>

                                <li className="flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Custom Domain
                                </li>

                                <li className="flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Export Leads to CSV
                                </li>
                                {/* 
                                <li className="flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    20 Email Account
                                </li> */}

                                {/* <li className="flex items-center text-gray-400">
                                    <svg
                                        className="w-5 h-5 mr-2.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Advanced Reporting
                                </li> */}
                            </ul>

                            <div className="mt-12 text-center" onClick={() => createSession('price_1OayEgCCHyXUnN33HVRKXAgE')}>
                                <a
                                    href="#"
                                    title=""
                                    className="
                                    flex
                                    items-center
                                    justify-center
                                    w-full
                                    px-4
                                    py-4
                                    text-base
                                    font-bold
                                    text-white
                                    transition-all
                                    duration-200
                                    bg-gray-900
                                    border border-transparent
                                    lg:px-8
                                    hover:bg-gray-700
                                    focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                    font-pj
                                "
                                    role="button"
                                >
                                    Subscribe
                                </a>

                                {/* <p className="mt-4 text-sm text-gray-600 font-pj">No credit card required</p> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white">
                    <div className="p-6 lg:px-10 lg:py-9">
                        <div className="text-center">
                            <p className="text-4xl">👓</p>
                            <h3 className="mt-6 text-sm font-bold tracking-widest uppercase font-pj">GROWTH</h3>
                            <p className="mt-1.5 font-pj text-sm text-gray-600">Best for large Enterprise</p>
                            <div className="flex items-end justify-center mt-6">
                                <p className="text-lg font-bold text-gray-400 font-pj">$</p>
                                <p className="text-4xl ml-0.5 font-bold text-gray-900 font-pj">2499</p>
                                <p className="text-lg font-bold text-gray-400 font-pj">/year</p>
                            </div>
                        </div>

                        <ul className="space-y-3 text-base font-medium text-gray-900 mt-9">
                            <li className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                20000 Videos per month
                            </li>

                            <li className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Custom Domain
                            </li>

                            <li className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Export Leads to CSV
                            </li>
                        </ul>

                        <div className="mt-12 text-center" onClick={() => createSession('price_1OayL4CCHyXUnN33BAoY7t7y')}>
                            <a
                                href="#"
                                title=""
                                className="
                                flex
                                items-center
                                justify-center
                                w-full
                                px-4
                                py-4
                                text-base
                                font-bold
                                text-gray-900
                                transition-all
                                duration-200
                                bg-gray-100
                                border border-transparent
                                lg:px-8
                                hover:bg-gray-900 hover:text-white
                                focus:text-white focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                font-pj
                            "
                                role="button"
                            >
                                Subscribe
                            </a>

                            {/* <p className="mt-4 text-sm text-gray-600 font-pj">No credit card required</p> */}
                        </div>
                    </div>
                </div>
            </div>

            <p className="max-w-md mx-auto mt-8 text-base text-center text-gray-500 md:mt-16 font-pj">
                We don’t bill you automatically until your confirmation. We don’t store or sell your data to anyone.
            </p>
        </div>
    </section>
);
export default SubscriptionCards;
