/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Link from "next/link";
import IndexNavbar from "@/src/components/common/Navbars/Navbar";

export default function Home() {
  return (
    <>
      <section className="header max-h-860-px relative flex h-screen items-center pt-16">
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="w-full px-4 md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="pt-32 sm:pt-0">
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
                  className="get-started bg-blueGray-400 active:bg-blueGray-500 mr-1 mb-1 rounded-sm px-6 py-4 text-sm font-bold text-white uppercase shadow-sm transition-all duration-150 ease-linear outline-hiddenhover:shadow-lg focus:outline-none"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index"
                  className="github-star bg-blueGray-700 active:bg-blueGray-600 mr-1 mb-1 ml-1 rounded-sm px-6 py-4 text-sm font-bold text-white uppercase shadow-sm outline-hiddenhover:shadow-lg focus:outline-none"
                  target="_blank"
                >
                  Github Star
                </a>
              </div>
            </div>
          </div>
        </div>
        <img
          className="b-auto max-h-860-px absolute top-0 right-0 -mt-48 w-10/12 pt-16 sm:mt-0 sm:w-6/12"
          src="/img/pattern_nextjs.png"
          alt="..."
        />
      </section>

      <section className="bg-blueGray-100 relative mt-48 pb-40 md:mt-40">
        <div
          className="absolute top-0 right-0 bottom-auto left-0 -mt-20 h-20 w-full"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
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
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="-mt-32 mr-auto ml-auto w-10/12 px-12 md:w-6/12 md:px-4 lg:w-4/12">
              <div className="bg-blueGray-700 relative mb-6 flex w-full min-w-0 flex-col rounded-lg bg-white break-words shadow-lg">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                  className="w-full rounded-t-lg align-middle"
                />
                <blockquote className="relative mb-4 p-8">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="h-95-px -top-94-px absolute left-0 block w-full"
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

            <div className="w-full px-4 md:w-6/12">
              <div className="flex flex-wrap">
                <div className="w-full px-4 md:w-6/12">
                  <div className="relative mt-4 flex flex-col">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
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
                  <div className="relative flex min-w-0 flex-col">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
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
                <div className="w-full px-4 md:w-6/12">
                  <div className="relative mt-4 flex min-w-0 flex-col">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                        <i className="fas fa-newspaper"></i>
                      </div>
                      <h6 className="mb-1 text-xl font-semibold">Pages</h6>
                      <p className="text-blueGray-500 mb-4">
                        This extension also comes with 3 sample pages. They are
                        fully coded so you can start working instantly.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex min-w-0 flex-col">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
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

        <div className="container mx-auto overflow-hidden pb-20">
          <div className="flex flex-wrap items-center">
            <div className="mt-48 mr-auto ml-auto w-full px-12 md:w-4/12 md:px-4">
              <div className="text-blueGray-500 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                <i className="fas fa-sitemap text-xl"></i>
              </div>
              <h3 className="mb-2 text-3xl leading-normal font-semibold">
                CSS Components
              </h3>
              <p className="text-blueGray-600 mt-4 mb-4 text-lg leading-relaxed font-light">
                Every element that you need in a product comes built in as a
                component. All components fit perfectly with each other and can
                have different colours.
              </p>
              <div className="block pb-6">
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Buttons
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Inputs
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Labels
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Menus
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Navbars
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Pagination
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Progressbars
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
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

            <div className="mt-32 mr-auto ml-auto w-full px-4 md:w-5/12">
              <div className="relative mt-48 mb-6 flex w-full min-w-0 flex-col md:mt-0">
                <img
                  alt="..."
                  src="/img/component-btn.png"
                  className="max-w-100-px left-145-px -top-29-px absolute z-3 w-full rounded-sm align-middle shadow-lg"
                />
                <img
                  alt="..."
                  src="/img/component-profile-card.png"
                  className="max-w-210-px left-260-px -top-160-px absolute w-full rounded-lg align-middle shadow-lg"
                />
                <img
                  alt="..."
                  src="/img/component-info-card.png"
                  className="max-w-180-px left-40-px -top-225-px absolute z-2 w-full rounded-lg align-middle shadow-lg"
                />
                <img
                  alt="..."
                  src="/img/component-info-2.png"
                  className="max-w-200-px -left-50-px top-25-px absolute w-full rounded-lg align-middle shadow-2xl"
                />
                <img
                  alt="..."
                  src="/img/component-menu.png"
                  className="max-w-580-px -left-20-px top-210-px absolute w-full rounded-sm align-middle shadow-lg"
                />
                <img
                  alt="..."
                  src="/img/component-btn-pink.png"
                  className="max-w-120-px left-195-px top-95-px absolute w-full rounded-sm align-middle shadow-xl"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center pt-32">
            <div className="mt-32 mr-auto ml-auto w-full px-4 md:w-6/12">
              <div className="relative flex flex-wrap justify-center">
                <div className="my-4 w-full px-4 lg:w-6/12">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="rounded-lg bg-red-600 p-8 text-center shadow-lg">
                      <img
                        alt="..."
                        className="mx-auto w-16 max-w-full rounded-full bg-white p-2 shadow-md"
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
                    <div className="mt-8 rounded-lg bg-sky-500 p-8 text-center shadow-lg">
                      <img
                        alt="..."
                        className="mx-auto w-16 max-w-full rounded-full bg-white p-2 shadow-md"
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
                    <div className="bg-blueGray-700 mt-8 rounded-lg p-8 text-center shadow-lg">
                      <img
                        alt="..."
                        className="mx-auto w-16 max-w-full rounded-full bg-white p-2 shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nextjs.jpg"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        NextJS
                      </p>
                    </div>
                  </a>
                </div>
                <div className="my-4 w-full px-4 lg:mt-16 lg:w-6/12">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="rounded-lg bg-yellow-500 p-8 text-center shadow-lg">
                      <img
                        alt="..."
                        className="mx-auto w-16 max-w-full rounded-full bg-white p-2 shadow-md"
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
                    <div className="mt-8 rounded-lg bg-red-700 p-8 text-center shadow-lg">
                      <img
                        alt="..."
                        className="mx-auto w-16 max-w-full rounded-full bg-white p-2 shadow-md"
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
                    <div className="mt-8 rounded-lg bg-emerald-500 p-8 text-center shadow-lg">
                      <img
                        alt="..."
                        className="mx-auto w-16 max-w-full rounded-full bg-white p-2 shadow-md"
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

            <div className="mt-48 mr-auto ml-auto w-full px-12 md:w-4/12 md:px-4">
              <div className="text-blueGray-500 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                <i className="fas fa-drafting-compass text-xl"></i>
              </div>
              <h3 className="mb-2 text-3xl leading-normal font-semibold">
                Javascript Components
              </h3>
              <p className="text-blueGray-600 mt-4 mb-4 text-lg leading-relaxed font-light">
                In order to create a great User Experience some components
                require JavaScript. In this way you can manipulate the elements
                on the page and give more options to your users.
              </p>
              <p className="text-blueGray-600 mt-4 mb-4 text-lg leading-relaxed font-light">
                We created a set of Components that are dynamic and come to help
                you.
              </p>
              <div className="block pb-6">
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold last:mr-0">
                  Alerts
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Dropdowns
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Menus
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Modals
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Navbars
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Popovers
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
                  Tabs
                </span>
                <span className="text-blueGray-500 mt-2 mr-2 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase last:mr-0">
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

        <div className="container mx-auto px-4 pt-48 pb-32">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto w-full px-12 md:w-5/12 md:px-4">
              <div className="md:pr-12">
                <div className="text-blueGray-500 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
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
                    <div className="flex items-center">
                      <div>
                        <span className="text-blueGray-500 bg-blueGray-50 mr-3 inline-block rounded-full px-2 py-1 text-xs font-semibold uppercase">
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
                    <div className="flex items-center">
                      <div>
                        <span className="text-blueGray-500 bg-blueGray-50 mr-3 inline-block rounded-full px-2 py-1 text-xs font-semibold uppercase">
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
                    <div className="flex items-center">
                      <div>
                        <span className="text-blueGray-500 bg-blueGray-50 mr-3 inline-block rounded-full px-2 py-1 text-xs font-semibold uppercase">
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

            <div className="mr-auto w-full px-4 pt-24 md:w-6/12 md:pt-0">
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

        <div className="mt-24 flex flex-wrap justify-center text-center">
          <div className="w-full px-12 md:w-6/12 md:px-4">
            <h2 className="text-4xl font-semibold">Beautiful Example Pages</h2>
            <p className="text-blueGray-500 mt-4 mb-4 text-lg leading-relaxed">
              Notus NextJS is a completly new product built using our past
              experience in web templates. Take the examples we made for you and
              start playing with them.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blueGray-600 relative z-1 block">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center">
            <div className="-mt-24 w-full px-4 lg:w-12/12">
              <div className="flex flex-wrap">
                <div className="w-full px-4 lg:w-4/12">
                  <h5 className="pb-4 text-center text-xl font-semibold">
                    Login Page
                  </h5>
                  <Link href="/login">
                    <div className="relative mb-6 flex w-full min-w-0 flex-col rounded-lg bg-white break-words shadow-lg transition-all duration-150 ease-linear hover:-mt-4">
                      <img
                        alt="..."
                        className="h-auto max-w-full rounded-lg border-none align-middle"
                        src="/img/login.jpg"
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full px-4 lg:w-4/12">
                  <h5 className="pb-4 text-center text-xl font-semibold">
                    Profile Page
                  </h5>
                  <Link href="/profile">
                    <div className="relative mb-6 flex w-full min-w-0 flex-col rounded-lg bg-white break-words shadow-lg transition-all duration-150 ease-linear hover:-mt-4">
                      <img
                        alt="..."
                        className="h-auto max-w-full rounded-lg border-none align-middle"
                        src="/img/profile.jpg"
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full px-4 lg:w-4/12">
                  <h5 className="pb-4 text-center text-xl font-semibold">
                    Landing Page
                  </h5>
                  <Link href="/landing">
                    <div className="relative mb-6 flex w-full min-w-0 flex-col rounded-lg bg-white break-words shadow-lg transition-all duration-150 ease-linear hover:-mt-4">
                      <img
                        alt="..."
                        className="h-auto max-w-full rounded-lg border-none align-middle"
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

      <section className="bg-blueGray-600 overflow-hidden py-20">
        <div className="container mx-auto pb-64">
          <div className="flex flex-wrap justify-center">
            <div className="mr-auto ml-auto w-full px-12 md:mt-64 md:w-5/12 md:px-4">
              <div className="text-blueGray-500 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                <i className="fas fa-code-branch text-xl"></i>
              </div>
              <h3 className="mb-2 text-3xl leading-normal font-semibold text-white">
                Open Source
              </h3>
              <p className="text-blueGray-400 mt-4 mb-4 text-lg leading-relaxed font-light">
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
              <p className="text-blueGray-400 mt-0 mb-4 text-lg leading-relaxed font-light">
                Get it free on Github and please help us spread the news with a
                Star!
              </p>
              <a
                href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index"
                target="_blank"
                className="github-star bg-blueGray-700 active:bg-blueGray-600 mt-4 mr-1 mb-1 inline-block rounded-sm px-6 py-4 text-sm font-bold text-white uppercase shadow-sm outline-hiddenhover:shadow-lg focus:outline-none"
              >
                Github Star
              </a>
            </div>

            <div className="relative mt-32 mr-auto ml-auto w-full px-4 md:w-4/12">
              <i className="fab fa-github text-blueGray-700 text-55 -top-150-px absolute -right-100 left-auto opacity-80"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blueGray-200 relative pt-32 pb-16">
        <div
          className="absolute top-0 right-0 bottom-auto left-0 -mt-20 h-20 w-full"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
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

        <div className="container mx-auto">
          <div className="relative z-10 -mt-64 flex flex-wrap justify-center rounded-lg bg-white px-12 py-16 shadow-xl">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-center text-4xl">
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
              <div className="mt-10 flex flex-col sm:block">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-index"
                  target="_blank"
                  className="get-started bg-blueGray-400 active:bg-blueGray-500 mr-1 mb-2 rounded-sm px-6 py-4 text-sm font-bold text-white uppercase shadow-sm transition-all duration-150 ease-linear outline-hiddenhover:shadow-lg focus:outline-none"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index"
                  target="_blank"
                  className="github-star bg-blueGray-700 active:bg-blueGray-600 mr-1 mb-1 rounded-sm px-6 py-4 text-sm font-bold text-white uppercase shadow-sm outline-hiddenhover:shadow-lg focus:outline-hiddensm:ml-1"
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
