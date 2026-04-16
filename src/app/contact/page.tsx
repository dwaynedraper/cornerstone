import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Cornerstone Engineering and Surveying',
  description: 'Get in touch with Cornerstone Engineering and Surveying. We are here to answer your questions and discuss your project needs.',
};

export default function Contact() {
  return (
    <div className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-200 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <p className="text-sm font-heading font-semibold uppercase tracking-widest text-gold-600">Reach Out</p>
              <h1 className="mt-2 text-3xl font-heading font-bold tracking-tight text-navy">
                Get in touch
              </h1>
              <div className="mt-4 w-16 h-1 bg-gold rounded-full" />
              <p className="mt-6 leading-7 text-gray-600">
                Reach out to a member of our team for information, quotes, or to
                learn more about our services.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-xl bg-white p-10 shadow-sm border border-gray-100">
                <h2 className="text-base font-heading font-semibold leading-7 text-navy">
                  Cornerstone
                </h2>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        href="mailto:info@cesinbox.com"
                        className="font-semibold text-heritage hover:text-heritage-light transition-colors duration-200"
                      >
                        info@cesinbox.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>
                      <a href="tel:+18179406027" className="hover:text-navy transition-colors duration-200">+1 817-940-6027</a>
                    </dd>
                  </div>
                </dl>
              </div>
              {/* <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Press
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        href="mailto:press@example.com"
                        className="font-semibold text-[#651212]"
                      >
                        press@example.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 905-3456</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Join our team
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        href="mailto:careers@example.com"
                        className="font-semibold text-[#651212]"
                      >
                        careers@example.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 905-4567</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Say hello
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        href="mailto:hello@example.com"
                        className="font-semibold text-[#651212]"
                      >
                        hello@example.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 905-5678</dd>
                  </div>
                </dl>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
