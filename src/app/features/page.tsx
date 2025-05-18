import { Header } from "@/components/common/Header";

export default function Feature() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <main className="flex flex-col flex-1 bg-[url('/neuCampusBlurred.png')] overflow-hidden bg-cover bg-center bg-no-repeat ]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl animate-fade-in-down animate-duration-1000 animate-delay-100">
                Vehicle Management System
              </h1>
              <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600 animate-fade-in-up animate-duration-1000 animate-delay-300">
                A comprehensive platform for managing vehicle registrations, violations, and more.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-left animate-duration-700 animate-delay-500">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-labelledby="userProfileIconTitle"
                      role="img"
                    >
                      <title id="userProfileIconTitle">User profile icon</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Admin</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Manage users, View Analytics, and Handle system-wide configurations.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-down animate-duration-700 animate-delay-600">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 text-white mb-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-labelledby="iconTitle"
                      role="img"
                    >
                      <title id="iconTitle">Secure login icon</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Security</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Scan vehicles, Issue violations, and Manage Vehicle applications.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-right animate-duration-700 animate-delay-500">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-labelledby="currencyIconTitle"
                      role="img"
                    >
                      <title id="currencyIconTitle">Currency symbol inside a circle</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Cashier</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Process payments for vehicle applications and violations.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-left animate-duration-700 animate-delay-700">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-labelledby="buildingIconTitle"
                      role="img"
                    >
                      <title id="buildingIconTitle">Office building icon</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Staff/Student</h3>
                  <p className="mt-2 text-base text-gray-500">View violations</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-right animate-duration-700 animate-delay-700">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-500 text-white mb-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-labelledby="usersIconTitle"
                      role="img"
                    >
                      <title id="usersIconTitle">Group of users icon</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Guest</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Submit vehicle information and track application status
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
