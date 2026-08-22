import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Anna De Feo",
  description: "Privacy notice for Anna De Feo's portfolio website.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page min-h-screen px-6! pb-16! pt-8! text-[#8338EC] md:px-12!">
      <div className="mx-auto max-w-3xl pb-20! md:pt-24!">
        <article className="text-[#8338EC]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#8338EC] transition-opacity hover:opacity-70"
          >
            <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />
            Back to portfolio
          </Link>

          <div className="divider" />

          <div className="mb-10!">
            <p className="mb-5! text-sm font-medium uppercase tracking-[0.25em] text-[#8338EC]">
              Privacy notice
            </p>
            <h1 className="mb-7! font-extrabold uppercase leading-[0.85] text-[#8338EC] text-5xl md:text-8xl">
              Privacy Policy
            </h1>
            <p className="text-sm leading-6 opacity-70">
              Last updated: August 22, 2026
            </p>
          </div>

          <div className="divider" />

          <div className="space-y-16 text-[0.98rem] leading-8 md:text-base">
            <section id="controller" className="mt-8!">
              <h2 className="mb-4! font-bold uppercase leading-tight text-[#8338EC] text-xl md:text-2xl">
                01 / Data controller
              </h2>
              <p>
                The data controller is Anna De Feo. For questions about this
                notice or the processing of personal data, you can email{" "}
                <a
                  className="text-[#8338EC] underline"
                  href="mailto:annadefeo91@outlook.it"
                >
                  annadefeo91@outlook.it
                </a>
                .
              </p>
            </section>

            <section id="dati" className="mt-8!">
              <h2 className="mb-4! font-bold uppercase leading-tight text-[#8338EC] text-xl md:text-2xl">
                02 / Data we process
              </h2>
              <p>
                Browsing this website may involve processing technical data such
                as your IP address, the date and time of the request, browser,
                device, and information needed to provide and protect the
                website. This data is processed only as necessary to operate,
                secure, and maintain the service.
              </p>
              <p className="mt-5!">
                The website does not offer contact forms, accounts, newsletters,
                or purchases. When you choose to use the email link, your
                message is handled by your email application and its provider.
              </p>
            </section>

            <section id="analytics" className="mt-8!">
              <h2 className="mb-4! font-bold uppercase leading-tight text-[#8338EC] text-xl md:text-2xl">
                03 / Analytics
              </h2>
              <p>
                The website uses Vercel Analytics to obtain aggregated
                statistics about page usage and improve the service. The service
                may process browsing data according to its own practices and
                policies. This data is not used to send personalised advertising
                or create an account on the website.
              </p>
            </section>

            <section id="services" className="mt-8!">
              <h2 className="mb-4! font-bold uppercase leading-tight text-[#8338EC] text-xl md:text-2xl">
                04 / External services
              </h2>
              <p>
                Some features load content from third-party providers: the music
                widget uses Spotify and the 3D scene uses Spline. When this
                content is loaded, these providers may receive technical data
                and process it according to their own notices and settings. For
                more information, see the policies of{" "}
                <a
                  className="text-[#8338EC] underline"
                  href="https://www.spotify.com/legal/privacy-policy/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Spotify
                </a>{" "}
                e{" "}
                <a
                  className="text-[#8338EC] underline"
                  href="https://spline.design/terms-of-use"
                  target="_blank"
                  rel="noreferrer"
                >
                  Spline
                </a>
                .
              </p>
            </section>

            <section id="cookie" className="mt-8!">
              <h2 className="mb-4! font-bold uppercase leading-tight text-[#8338EC] text-xl md:text-2xl">
                05 / Cookies and similar technologies
              </h2>
              <p>
                The website does not use its own cookies for profiling or
                advertising. Embedded third-party services may use cookies,
                similar technologies, or make requests to their own domains.
                Their management depends on the service and your browser
                settings.
              </p>
            </section>

            <section id="rights" className="mt-8!">
              <h2 className="mb-4! font-bold uppercase leading-tight text-[#8338EC] text-xl md:text-2xl">
                06 / Retention and your rights
              </h2>
              <p>
                Technical data is retained for as long as necessary for the
                purposes for which it was collected and for any legal
                obligations. Where provided by applicable law, you may request
                access, rectification, erasure, restriction, or objection to
                processing by contacting the controller. You also have the right
                to lodge a complaint with the competent data protection
                authority.
              </p>
            </section>

            <section id="updates" className="mt-8!">
              <h2 className="mb-4! font-bold uppercase leading-tight text-[#8338EC] text-xl md:text-2xl">
                07 / Updates
              </h2>
              <p>
                This notice may be updated when the website, the services used,
                or applicable law changes. The version published on this page is
                the current version.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
