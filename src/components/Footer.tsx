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
    <footer aria-labelledby="footer-heading" className="bg-[#651212]">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <p className="mt-8 leading-5 text-gray-400 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Cornerstone Engineering &
            Surveying
          </p>
        </div>
      </div>
    </footer>
  );
}
