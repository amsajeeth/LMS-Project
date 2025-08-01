import React from "react";

export const FooterPage = () => {
  return (
    <div>
      <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <a
              href=""
              class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sf-cw-87713.appspot.com/o/logo4.png?alt=media&token=b2a9be4a-4e6f-478f-a603-86cef0af0be0"
                class="h-8"
                alt="Logo"
              />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                EduRise
              </span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="/aboutUs" class="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>

              <li>
                <a href="/contactUs" class="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 EduRise™. All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};
