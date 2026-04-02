/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

export default function Footer() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-8 flex justify-between">
        <p className="mt-8 text-sm leading-5 text-gray-500 md:order-2 md:mt-0 font-heading">
          Engineering Firm Registration Number: F-24969
        </p>
        <p className="mt-8 text-sm leading-5 text-gray-500 md:order-3 md:mt-0 font-heading">
          Surveying Firm Registration Number: 10194747
        </p>
      </div>
      {/* Heritage maroon accent stripe */}
      <div className="h-1 bg-heritage" />
      <footer aria-labelledby="footer-heading" className="bg-navy">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <p className="mt-8 text-sm leading-5 text-gray-400 md:order-1 md:mt-0 font-heading">
              &copy; {new Date().getFullYear()} Cornerstone Engineering &
              Surveying
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
