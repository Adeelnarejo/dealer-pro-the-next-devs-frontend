import {
  ArrowUpRight,
  CarFront,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#071a33] font-plus-jakarta text-white">

      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl" />

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-12 sm:px-6 lg:px-8 lg:pt-16">

        {/* =================================================
            TOP CTA
        ================================================= */}

        <div className="mb-12 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400">
              <CarFront size={21} />
            </div>

            <div>

              <h2 className="text-base font-bold text-white sm:text-lg">
                Built for modern car dealerships
              </h2>

              <p className="mt-1 max-w-xl text-[10px] leading-5 text-slate-400 sm:text-xs">
                Manage your inventory, customers, sales and dealership
                operations from one powerful platform.
              </p>

            </div>

          </div>

          <button
            type="button"
            className="group flex w-fit shrink-0 items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-[10px] font-bold text-white transition-all duration-300 hover:bg-blue-500"
          >
            Get started

            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

        </div>

        {/* =================================================
            FOOTER GRID
        ================================================= */}

        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="sm:col-span-2 lg:col-span-2">

            {/* Logo */}

            <div className="flex items-center gap-2.5">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-900/30">
                <CarFront size={20} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight">
                  DealerPro
                </h2>

                <p className="text-[7px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Dealership Platform
                </p>
              </div>

            </div>

            {/* Description */}

            <p className="mt-5 max-w-sm text-[11px] leading-5 text-slate-400 sm:text-xs sm:leading-6">
              Everything your dealership needs to manage vehicles,
              customers, sales and daily operations — all in one
              professional platform.
            </p>

            {/* Contact */}

            <div className="mt-5 space-y-3">

              <a
                href="mailto:hello@dealerpro.se"
                className="flex items-center gap-2.5 text-[10px] text-slate-400 transition hover:text-white"
              >
                <Mail size={13} className="text-blue-400" />
                hello@dealerpro.se
              </a>

              <div className="flex items-center gap-2.5 text-[10px] text-slate-400">
                <MapPin size={13} className="text-blue-400" />
                Sweden
              </div>

            </div>

          </div>

          {/* =================================================
              PLATFORM
          ================================================= */}

          <div>

            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              Platform
            </h3>

            <nav className="space-y-3">

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                About DealerPro
              </a>

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Features
              </a>

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Vehicle Inventory
              </a>

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Dealer Tools
              </a>

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Pricing
              </a>

            </nav>

          </div>

          {/* =================================================
              DEALERS
          ================================================= */}

          <div>

            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              For Dealers
            </h3>

            <nav className="space-y-3">

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Manage Inventory
              </a>

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Customer Management
              </a>

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Digital Contracts
              </a>

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Sales Management
              </a>

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Dealer Support
              </a>

            </nav>

          </div>

          {/* =================================================
              COMPANY
          ================================================= */}

          <div>

            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              Company
            </h3>

            <nav className="space-y-3">

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Contact Us
              </a>

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                FAQ
              </a>

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Customer Reviews
              </a>

              <a
                href="#"
                className="block text-[10px] text-slate-400 transition hover:translate-x-0.5 hover:text-white"
              >
                Help Center
              </a>

            </nav>

          </div>

        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="border-t border-white/10 py-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Copyright */}

            <p className="text-[9px] text-slate-500 sm:text-[10px]">
              © {currentYear} DealerPro. All rights reserved.
            </p>

            {/* Legal */}

            <div className="flex flex-wrap items-center gap-4">

              <a
                href="#"
                className="text-[9px] text-slate-500 transition hover:text-white"
              >
                Terms of Service
              </a>

              <a
                href="#"
                className="text-[9px] text-slate-500 transition hover:text-white"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-[9px] text-slate-500 transition hover:text-white"
              >
                Cookie Policy
              </a>

            </div>

            {/* Security */}

            <div className="flex items-center gap-1.5 text-[9px] text-slate-500">

              <ShieldCheck
                size={12}
                className="text-blue-400"
              />

              Secure dealership platform

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;