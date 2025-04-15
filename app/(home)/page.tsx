/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Link from "next/link";
import IndexNavbar from "@/components/Navbars/IndexNavbar";

export default function Home() {
  return (
    <>
      <section className="header max-h-860-px items-center h-screen pt-16 relative flex">
        <div className="flex-wrap items-center mx-auto container flex">
          <div className="md:w-8/12 lg:w-6/12 w-full px-4 xl:w-6/12 ">
            <div className="sm:pt-0 pt-32">
              <h2 className="text-blueGray-600 text-4xl font-semibold">
                Notus NextJS - A beautiful extension for Tailwind CSS.
              </h2>
              <p className="text-blueGray-500 mt-4 text-lg leading-relaxed">
                Notus NextJS is Free and Open Source. It does not change any of
                the CSS from{" "}
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-blueGray-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>
                . It features multiple HTML elements and it comes with dynamic
                components for ReactJS, Vue and Angular.
              </p>
              <div className="mt-12">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-index"
                  target="_blank"
                  className="get-started focus:outline-none bg-blueGray-400 active:bg-blueGray-500 hover:shadow-lg px-6 py-4 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear outline-none rounded shadow"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index"
                  className="github-star focus:outline-none bg-blueGray-700 active:bg-blueGray-600 hover:shadow-lg px-6 py-4 mb-1 ml-1 mr-1 text-sm font-bold text-white uppercase outline-none rounded shadow"
                  target="_blank"
                >
                  Github Star
                </a>
              </div>
            </div>
          </div>
        </div>
        <img
          className="b-auto sm:w-6/12 sm:mt-0 max-h-860-px top-0 right-0 w-10/12 pt-16 -mt-48 absolute"
          src="/img/pattern_nextjs.png"
          alt="..."
        />
      </section>

      <section className="md:mt-40 bg-blueGray-100 pb-40 mt-48 relative">
        <div
          className="top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 absolute"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="bottom-0 overflow-hidden absolute"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="mx-auto container">
          <div className="flex-wrap items-center flex">
            <div className="md:w-6/12 lg:w-4/12 md:px-4 w-10/12 px-12 ml-auto mr-auto -mt-32">
              <div className="bg-blueGray-700 flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-lg relative flex">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="p-8 mb-4 relative">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="h-95-px -top-94-px left-0 block w-full absolute"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Great for your awesome project
                  </h4>
                  <p className="text-md mt-2 font-light text-white">
                    Putting together a page has never been easier than matching
                    together pre-made components. From landing pages
                    presentation to login areas, you can easily customise and
                    built your pages.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="md:w-6/12 w-full px-4">
              <div className="flex-wrap flex">
                <div className="md:w-6/12 w-full px-4">
                  <div className="flex-col mt-4 relative flex">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center bg-white rounded-full shadow-lg">
                        <i className="fas fa-sitemap"></i>
                      </div>
                      <h6 className="mb-1 text-xl font-semibold">
                        CSS Components
                      </h6>
                      <p className="text-blueGray-500 mb-4">
                        Notus NextJS comes with a huge number of Fully Coded CSS
                        components.
                      </p>
                    </div>
                  </div>
                  <div className="flex-col min-w-0 relative flex">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center bg-white rounded-full shadow-lg">
                        <i className="fas fa-drafting-compass"></i>
                      </div>
                      <h6 className="mb-1 text-xl font-semibold">
                        JavaScript Components
                      </h6>
                      <p className="text-blueGray-500 mb-4">
                        We also feature many dynamic components for React,
                        NextJS, Vue and Angular.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-6/12 w-full px-4">
                  <div className="flex-col min-w-0 mt-4 relative flex">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center bg-white rounded-full shadow-lg">
                        <i className="fas fa-newspaper"></i>
                      </div>
                      <h6 className="mb-1 text-xl font-semibold">Pages</h6>
                      <p className="text-blueGray-500 mb-4">
                        This extension also comes with 3 sample pages. They are
                        fully coded so you can start working instantly.
                      </p>
                    </div>
                  </div>
                  <div className="flex-col min-w-0 relative flex">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center bg-white rounded-full shadow-lg">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <h6 className="mb-1 text-xl font-semibold">
                        Documentation
                      </h6>
                      <p className="text-blueGray-500 mb-4">
                        Built by developers for developers. You will love how
                        easy is to to work with Notus NextJS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-20 mx-auto overflow-hidden container">
          <div className="flex-wrap items-center flex">
            <div className="md:w-4/12 md:px-4 w-full px-12 mt-48 ml-auto mr-auto">
              <div className="text-blueGray-500 inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg">
                <i className="fas fa-sitemap text-xl"></i>
              </div>
              <h3 className="mb-2 text-3xl font-semibold leading-normal">
                CSS Components
              </h3>
              <p className="text-blueGray-600 mt-4 mb-4 text-lg font-light leading-relaxed">
                Every element that you need in a product comes built in as a
                component. All components fit perfectly with each other and can
                have different colours.
              </p>
              <div className="block pb-6">
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Buttons
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Inputs
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Labels
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Menus
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Navbars
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Pagination
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Progressbars
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Typography
                </span>
              </div>
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=nnjs-index"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 font-bold transition-all duration-150 ease-linear"
              >
                View All{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a>
            </div>

            <div className="md:w-5/12 w-full px-4 mt-32 ml-auto mr-auto">
              <div className="md:mt-0 flex-col w-full min-w-0 mt-48 mb-6 relative flex">
                <img
                  alt="..."
                  src="/img/component-btn.png"
                  className="max-w-100-px left-145-px -top-29-px z-3 w-full align-middle shadow-lg absolute rounded"
                />
                <img
                  alt="..."
                  src="/img/component-profile-card.png"
                  className="max-w-210-px left-260-px -top-160-px w-full align-middle rounded-lg shadow-lg absolute"
                />
                <img
                  alt="..."
                  src="/img/component-info-card.png"
                  className="max-w-180-px left-40-px -top-225-px z-2 w-full align-middle rounded-lg shadow-lg absolute"
                />
                <img
                  alt="..."
                  src="/img/component-info-2.png"
                  className="max-w-200-px -left-50-px top-25-px w-full align-middle rounded-lg shadow-2xl absolute"
                />
                <img
                  alt="..."
                  src="/img/component-menu.png"
                  className="max-w-580-px -left-20-px top-210-px w-full align-middle shadow-lg absolute rounded"
                />
                <img
                  alt="..."
                  src="/img/component-btn-pink.png"
                  className="max-w-120-px left-195-px top-95-px w-full align-middle shadow-xl absolute rounded"
                />
              </div>
            </div>
          </div>

          <div className="flex-wrap items-center pt-32 flex">
            <div className="md:w-6/12 w-full px-4 mt-32 ml-auto mr-auto">
              <div className="flex-wrap justify-center relative flex">
                <div className="lg:w-6/12 w-full px-4 my-4">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="p-8 text-center bg-red-600 rounded-lg shadow-lg">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/svelte.jpg"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        Svelte
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-sky-500 p-8 mt-8 text-center rounded-lg shadow-lg">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        ReactJS
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-blueGray-700 p-8 mt-8 text-center rounded-lg shadow-lg">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nextjs.jpg"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        NextJS
                      </p>
                    </div>
                  </a>
                </div>
                <div className="lg:w-6/12 lg:mt-16 w-full px-4 my-4">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="p-8 text-center bg-yellow-500 rounded-lg shadow-lg">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/js.png"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        JavaScript
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/angular/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="p-8 mt-8 text-center bg-red-700 rounded-lg shadow-lg">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular.jpg"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        Angular
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-emerald-500 p-8 mt-8 text-center rounded-lg shadow-lg">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue.jpg"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        Vue.js
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:w-4/12 md:px-4 w-full px-12 mt-48 ml-auto mr-auto">
              <div className="text-blueGray-500 inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg">
                <i className="fas fa-drafting-compass text-xl"></i>
              </div>
              <h3 className="mb-2 text-3xl font-semibold leading-normal">
                Javascript Components
              </h3>
              <p className="text-blueGray-600 mt-4 mb-4 text-lg font-light leading-relaxed">
                In order to create a great User Experience some components
                require JavaScript. In this way you can manipulate the elements
                on the page and give more options to your users.
              </p>
              <p className="text-blueGray-600 mt-4 mb-4 text-lg font-light leading-relaxed">
                We created a set of Components that are dynamic and come to help
                you.
              </p>
              <div className="block pb-6">
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold bg-white rounded-full">
                  Alerts
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Dropdowns
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Menus
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Modals
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Navbars
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Popovers
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Tabs
                </span>
                <span className="text-blueGray-500 last:mr-0 inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full">
                  Tooltips
                </span>
              </div>
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=nnjs-index"
                target="_blank"
                className="text-blueGray-700 hover:text-blueGray-500 font-bold transition-all duration-150 ease-linear"
              >
                View all{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="px-4 pt-48 pb-32 mx-auto container">
          <div className="flex-wrap items-center flex">
            <div className="md:w-5/12 md:px-4 w-full px-12 ml-auto">
              <div className="md:pr-12">
                <div className="text-blueGray-500 inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg">
                  <i className="fas fa-file-alt text-xl"></i>
                </div>
                <h3 className="text-3xl font-semibold">
                  Complex Documentation
                </h3>
                <p className="text-blueGray-500 mt-4 text-lg leading-relaxed">
                  This extension comes a lot of fully coded examples that help
                  you get started faster. You can adjust the colors and also the
                  programming language. You can change the text and images and
                  you're good to go.
                </p>
                <ul className="mt-6 list-none">
                  <li className="py-2">
                    <div className="items-center flex">
                      <div>
                        <span className="text-blueGray-500 bg-blueGray-50 inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full">
                          <i className="fas fa-fingerprint"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Built by Developers for Developers
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="items-center flex">
                      <div>
                        <span className="text-blueGray-500 bg-blueGray-50 inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full">
                          <i className="fab fa-html5"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Carefully crafted code for Components
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="items-center flex">
                      <div>
                        <span className="text-blueGray-500 bg-blueGray-50 inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full">
                          <i className="far fa-paper-plane"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Dynamic Javascript Components
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:w-6/12 md:pt-0 w-full px-4 pt-24 mr-auto">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                }}
                src="/img/documentation.png"
              />
            </div>
          </div>
        </div>

        <div className="flex-wrap justify-center mt-24 text-center flex">
          <div className="md:w-6/12 md:px-4 w-full px-12">
            <h2 className="text-4xl font-semibold">Beautiful Example Pages</h2>
            <p className="text-blueGray-500 mt-4 mb-4 text-lg leading-relaxed">
              Notus NextJS is a completly new product built using our past
              experience in web templates. Take the examples we made for you and
              start playing with them.
            </p>
          </div>
        </div>
      </section>

      <section className="z-1 bg-blueGray-600 block relative">
        <div className="mx-auto container">
          <div className="flex-wrap justify-center flex">
            <div className="lg:w-12/12 w-full px-4 -mt-24">
              <div className="flex-wrap flex">
                <div className="lg:w-4/12 w-full px-4">
                  <h5 className="pb-4 text-xl font-semibold text-center">
                    Login Page
                  </h5>
                  <Link href="/auth/login">
                    <div className="hover:-mt-4 flex-col w-full min-w-0 mb-6 break-words transition-all duration-150 ease-linear bg-white rounded-lg shadow-lg relative flex">
                      <img
                        alt="..."
                        className="h-auto max-w-full align-middle border-none rounded-lg"
                        src="/img/login.jpg"
                      />
                    </div>
                  </Link>
                </div>

                <div className="lg:w-4/12 w-full px-4">
                  <h5 className="pb-4 text-xl font-semibold text-center">
                    Profile Page
                  </h5>
                  <Link href="/profile">
                    <div className="hover:-mt-4 flex-col w-full min-w-0 mb-6 break-words transition-all duration-150 ease-linear bg-white rounded-lg shadow-lg relative flex">
                      <img
                        alt="..."
                        className="h-auto max-w-full align-middle border-none rounded-lg"
                        src="/img/profile.jpg"
                      />
                    </div>
                  </Link>
                </div>

                <div className="lg:w-4/12 w-full px-4">
                  <h5 className="pb-4 text-xl font-semibold text-center">
                    Landing Page
                  </h5>
                  <Link href="/landing">
                    <div className="hover:-mt-4 flex-col w-full min-w-0 mb-6 break-words transition-all duration-150 ease-linear bg-white rounded-lg shadow-lg relative flex">
                      <img
                        alt="..."
                        className="h-auto max-w-full align-middle border-none rounded-lg"
                        src="/img/landing.jpg"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blueGray-600 py-20 overflow-hidden">
        <div className="pb-64 mx-auto container">
          <div className="flex-wrap justify-center flex">
            <div className="md:w-5/12 md:px-4 md:mt-64 w-full px-12 ml-auto mr-auto">
              <div className="text-blueGray-500 inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg">
                <i className="fas fa-code-branch text-xl"></i>
              </div>
              <h3 className="mb-2 text-3xl font-semibold leading-normal text-white">
                Open Source
              </h3>
              <p className="text-blueGray-400 mt-4 mb-4 text-lg font-light leading-relaxed">
                Since{" "}
                <a
                  href="https://tailwindcss.com/?ref=creative"
                  className="text-blueGray-300"
                  target="_blank"
                >
                  Tailwind CSS
                </a>{" "}
                is an open source project we wanted to continue this movement
                too. You can give this version a try to feel the design and also
                test the quality of the code!
              </p>
              <p className="text-blueGray-400 mt-0 mb-4 text-lg font-light leading-relaxed">
                Get it free on Github and please help us spread the news with a
                Star!
              </p>
              <a
                href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index"
                target="_blank"
                className="github-star focus:outline-none bg-blueGray-700 active:bg-blueGray-600 hover:shadow-lg inline-block px-6 py-4 mt-4 mb-1 mr-1 text-sm font-bold text-white uppercase outline-none rounded shadow"
              >
                Github Star
              </a>
            </div>

            <div className="md:w-4/12 w-full px-4 mt-32 ml-auto mr-auto relative">
              <i className="fab fa-github text-blueGray-700 text-55 -top-150-px -right-100 opacity-80 left-auto absolute"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blueGray-200 pt-32 pb-16 relative">
        <div
          className="top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 absolute"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="bottom-0 overflow-hidden absolute"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="mx-auto container">
          <div className="z-10 flex-wrap justify-center px-12 py-16 -mt-64 bg-white rounded-lg shadow-xl relative flex">
            <div className="lg:w-8/12 w-full text-center">
              <p className="text-4xl text-center">
                <span role="img" aria-label="love">
                  😍
                </span>
              </p>
              <h3 className="text-3xl font-semibold">
                Do you love this Starter Kit?
              </h3>
              <p className="text-blueGray-500 mt-4 mb-4 text-lg leading-relaxed">
                Cause if you do, it can be yours now. Hit the buttons below to
                navigate to get the Free version for your next project. Build a
                new web app or give an old project a new look!
              </p>
              <div className="sm:block flex-col mt-10 flex">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-index"
                  target="_blank"
                  className="get-started focus:outline-none bg-blueGray-400 active:bg-blueGray-500 hover:shadow-lg px-6 py-4 mb-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear outline-none rounded shadow"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index"
                  target="_blank"
                  className="github-star sm:ml-1 focus:outline-none bg-blueGray-700 active:bg-blueGray-600 hover:shadow-lg px-6 py-4 mb-1 mr-1 text-sm font-bold text-white uppercase outline-none rounded shadow"
                >
                  <i className="fab fa-github mr-1 text-lg"></i>
                  <span>Help With a Star</span>
                </a>
              </div>
              <div className="mt-16 text-center"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
