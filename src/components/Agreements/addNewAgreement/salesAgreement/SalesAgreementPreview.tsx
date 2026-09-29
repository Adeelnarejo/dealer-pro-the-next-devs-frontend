import {
  CalendarDays,
  CarFront,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  FileText,
  Gauge,
  Hash,
  KeyRound,
  Mail,
  MapPin,
  Palette,
  Phone,
  ShieldCheck,
  Truck,
  UserRound,
  Wallet,
  Wrench,
  X,
  Building2,
  CreditCard,
  Clock3,
} from "lucide-react";

import { AgreementPreviewIcon } from "../../../utils/Icons";

type Props = {
  form: any;
  searchResults: {
    vehicle: { data?: any[] } | null;
    person: { data?: any[] } | null;
    org: { data?: any[] } | null;
  };
  searchTradeInVehicle: {
    vehicle: { data?: any[] } | null;
  };
  preview: {
    tradeInVehicle?: string;
  };
  isCreating: boolean;
  handlePrint: () => void;
};

const InfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: any;
  icon?: React.ReactNode;
}) => (
  <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors dark:border-slate-800 dark:bg-[#101D31]/70">
    <div className="flex items-center gap-2">
      {icon && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm dark:bg-slate-800 dark:text-slate-500">
          {icon}
        </span>
      )}

      <p className="truncate font-plus-jakarta text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {label}
      </p>
    </div>

    <p className="mt-2 break-words font-plus-jakarta text-xs font-bold text-slate-800 dark:text-slate-200 sm:text-sm">
      {value || "N/A"}
    </p>
  </div>
);

const SectionHeader = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-4 flex items-center gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
      {icon}
    </div>

    <div className="min-w-0">
      <h3 className="font-plus-jakarta text-sm font-extrabold text-slate-900 dark:text-white">
        {title}
      </h3>

      {subtitle && (
        <p className="mt-0.5 font-plus-jakarta text-[9px] font-medium text-slate-400 dark:text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

export default function SalesAgreementPreview({
  form,
  searchResults,
  searchTradeInVehicle,
  preview,
  isCreating,
  handlePrint,
}: Props) {
  const vehicle = searchResults.vehicle?.data?.[0];
  const person = searchResults.person?.data?.[0];
  const organization = searchResults.org?.data?.[0];
  const tradeInVehicle = searchTradeInVehicle.vehicle?.data?.[0];

  const isCompany = form.customerType === "company";
  const isPrivateIndividual =
    form.customerType === "private individual";

  const hasTradeIn = preview.tradeInVehicle === "yes";

  const showFinancing =
    form.paymentMethod === "financing_down" ||
    form.paymentMethod === "leasing" ||
    form.paymentMethod === "financing_no_down";

  const vehicleBrand =
    vehicle?.detail?.vehicleBrand || "N/A";

  const vehicleModel =
    vehicle?.detail?.vehicleModel ||
    vehicle?.detail?.vehicleModelRaw ||
    "N/A";

  const fuelType =
    vehicle?.technicalData?.fuelCodes?.join(", ") || "N/A";

  const companyAddress =
    organization?.addresses?.[0]?.street &&
    organization?.addresses?.[0]?.number
      ? `${organization.addresses[0].street} ${organization.addresses[0].number}`
      : "N/A";

  const personAddress =
    person?.addresses?.[0]?.street &&
    person?.addresses?.[0]?.number
      ? `${person.addresses[0].street} ${person.addresses[0].number}`
      : "N/A";

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-[#0B1628]">
      {/* Top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500" />

      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
            <FileCheck2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-plus-jakarta text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
                Sales Agreement Preview
              </h2>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 font-plus-jakarta text-[9px] font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Live Preview
              </span>
            </div>

            <p className="mt-0.5 font-plus-jakarta text-[10px] font-medium text-slate-400 dark:text-slate-500">
              Real-time preview of your sales agreement
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          disabled={isCreating}
          title="Preview / Print Agreement"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition-all hover:border-blue-200 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
        >
          <AgreementPreviewIcon />
        </button>
      </div>

      {/* Preview content */}
      <div className="space-y-5 p-5 sm:p-6">
        {/* Vehicle Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0D192B] sm:p-5">
          <SectionHeader
            icon={
              <CarFront className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            }
            title="Vehicle Information"
            subtitle="Vehicle details associated with this agreement"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              label="Registration Number"
              value={
                vehicle?.registrationData?.registrationNumber
              }
              icon={<Hash className="h-3 w-3" />}
            />

            <InfoItem
              label="Vehicle Brand"
              value={vehicleBrand}
              icon={<CarFront className="h-3 w-3" />}
            />

            <InfoItem
              label="Vehicle Model"
              value={vehicleModel}
              icon={<CarFront className="h-3 w-3" />}
            />

            <InfoItem
              label="Color"
              value={vehicle?.detail?.color}
              icon={<Palette className="h-3 w-3" />}
            />

            <InfoItem
              label="Chassis Number"
              value={vehicle?.detail?.chassisNumber}
              icon={<Hash className="h-3 w-3" />}
            />

            <InfoItem
              label="Vehicle Year"
              value={vehicle?.detail?.vehicleYear}
              icon={<CalendarDays className="h-3 w-3" />}
            />

            <InfoItem
              label="Gearbox"
              value={vehicle?.technicalData?.gearbox}
              icon={<Wrench className="h-3 w-3" />}
            />

            <InfoItem
              label="Fuel Type"
              value={fuelType}
              icon={<Gauge className="h-3 w-3" />}
            />

            <InfoItem
              label="Sales Date"
              value={form.salesDate}
              icon={<CalendarDays className="h-3 w-3" />}
            />
          </div>
        </section>

        {/* Customer Information */}
        {(isCompany || isPrivateIndividual) && (
          <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0D192B] sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <SectionHeader
                icon={
                  isCompany ? (
                    <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <UserRound className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  )
                }
                title="Customer Information"
                subtitle="Customer details for this agreement"
              />

              <span
                className={`mb-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-plus-jakarta text-[9px] font-bold ${
                  isCompany
                    ? "border-blue-100 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400"
                    : "border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isCompany
                      ? "bg-blue-500"
                      : "bg-emerald-500"
                  }`}
                />
                {isCompany
                  ? "Company"
                  : "Private Individual"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {isCompany ? (
                <>
                  <InfoItem
                    label="Customer Type"
                    value={form.customerType}
                    icon={<Building2 className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Organization Number"
                    value={organization?.legalId}
                    icon={<Hash className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Company Name"
                    value={organization?.orgName?.name}
                    icon={<Building2 className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Address"
                    value={companyAddress}
                    icon={<MapPin className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Postal Code"
                    value={organization?.addresses?.[0]?.zip}
                    icon={<MapPin className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="City"
                    value={
                      organization?.addresses?.[0]?.city
                        ? `${organization.addresses[0].zip || ""} ${
                            organization.addresses[0].city
                          }`
                        : "N/A"
                    }
                    icon={<MapPin className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Phone"
                    value={form.phone}
                    icon={<Phone className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Email Address"
                    value={form.email}
                    icon={<Mail className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Verification"
                    value={form.verification}
                    icon={<ShieldCheck className="h-3 w-3" />}
                  />
                </>
              ) : (
                <>
                  <InfoItem
                    label="Customer Type"
                    value={form.customerType}
                    icon={<UserRound className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Name"
                    value={person?.name?.givenName}
                    icon={<UserRound className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Personal Number"
                    value={person?.legalId}
                    icon={<Hash className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Address"
                    value={personAddress}
                    icon={<MapPin className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Email"
                    value={form.email}
                    icon={<Mail className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Phone"
                    value={form.phone}
                    icon={<Phone className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Postal Code"
                    value={person?.addresses?.[0]?.zip}
                    icon={<MapPin className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="City"
                    value={person?.addresses?.[0]?.city}
                    icon={<MapPin className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="PEP"
                    value={form.pep}
                    icon={<ShieldCheck className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Verification"
                    value={form.verification}
                    icon={<ShieldCheck className="h-3 w-3" />}
                  />
                </>
              )}
            </div>
          </section>
        )}

        {/* Trade-in */}
        {preview.tradeInVehicle && (
          <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0D192B] sm:p-5">
            <SectionHeader
              icon={
                <Truck className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              }
              title="Trade-in Vehicle"
              subtitle="Information about the customer's trade-in vehicle"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                label="Trade-in Vehicle"
                value={hasTradeIn ? "Yes" : "No"}
                icon={
                  hasTradeIn ? (
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <X className="h-3 w-3" />
                  )
                }
              />

              {hasTradeIn && (
                <>
                  <InfoItem
                    label="Registration Number"
                    value={
                      tradeInVehicle?.registrationData
                        ?.registrationNumber
                    }
                    icon={<Hash className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Vehicle Brand"
                    value={
                      tradeInVehicle?.detail?.vehicleBrand
                    }
                    icon={<CarFront className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Vehicle Model"
                    value={
                      tradeInVehicle?.detail?.vehicleModel
                    }
                    icon={<CarFront className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Purchase Date"
                    value={form.tradeInPurchaseDate}
                    icon={<CalendarDays className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Purchase Price"
                    value={form.tradeInPurchasePrice}
                    icon={
                      <CircleDollarSign className="h-3 w-3" />
                    }
                  />

                  <InfoItem
                    label="Mileage"
                    value={form.tradeInMileage}
                    icon={<Gauge className="h-3 w-3" />}
                  />

                  <InfoItem
                    label="Credit Marking"
                    value={form.tradeInCreditMaking}
                    icon={<CreditCard className="h-3 w-3" />}
                  />

                  {form.tradeInRestAmount && (
                    <InfoItem
                      label="Remaining Amount"
                      value={form.tradeInRestAmount}
                      icon={
                        <Wallet className="h-3 w-3" />
                      }
                    />
                  )}
                </>
              )}
            </div>
          </section>
        )}

        {/* Sales Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0D192B] sm:p-5">
          <SectionHeader
            icon={
              <CircleDollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            }
            title="Sales Information"
            subtitle="Pricing and payment details"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              label="Sales Price (SEK)"
              value={form.salesPriceSEK}
              icon={<CircleDollarSign className="h-3 w-3" />}
            />

            <InfoItem
              label="Payment Method"
              value={form.paymentMethod}
              icon={<CreditCard className="h-3 w-3" />}
            />

            {showFinancing && (
              <>
                <InfoItem
                  label="Financial Company"
                  value={form.financialCompany}
                  icon={<Building2 className="h-3 w-3" />}
                />

                <InfoItem
                  label="Sales Credit Amount"
                  value={form.creditAmountSales}
                  icon={
                    <CircleDollarSign className="h-3 w-3" />
                  }
                />

                <InfoItem
                  label="Cash Stack"
                  value={form.cashStack}
                  icon={<Wallet className="h-3 w-3" />}
                />

                <InfoItem
                  label="Loan Period"
                  value={form.loanPeriod}
                  icon={<Clock3 className="h-3 w-3" />}
                />
              </>
            )}

            <InfoItem
              label="Payment Date"
              value={form.paymentDate}
              icon={<CalendarDays className="h-3 w-3" />}
            />
          </div>
        </section>

        {/* Vehicle Specifications */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0D192B] sm:p-5">
          <SectionHeader
            icon={
              <Wrench className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            }
            title="Vehicle Specifications"
            subtitle="Additional vehicle and warranty details"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              label="VAT Type"
              value={form.vatType}
              icon={<FileText className="h-3 w-3" />}
            />

            <InfoItem
              label="Mileage (km)"
              value={form.mileage}
              icon={<Gauge className="h-3 w-3" />}
            />

            <InfoItem
              label="Number of Keys"
              value={form.numberOfKeys}
              icon={<KeyRound className="h-3 w-3" />}
            />

            <InfoItem
              label="Tires"
              value={form.deck}
              icon={<CarFront className="h-3 w-3" />}
            />

            <InfoItem
              label="Insurance Provider"
              value={form.insurer}
              icon={<ShieldCheck className="h-3 w-3" />}
            />

            <InfoItem
              label="Insurance Type"
              value={form.insuranceType}
              icon={<ShieldCheck className="h-3 w-3" />}
            />

            <InfoItem
              label="Warranty Provider"
              value={form.warrantyProvider}
              icon={<ShieldCheck className="h-3 w-3" />}
            />

            <InfoItem
              label="Warranty Product"
              value={form.warrantyProduct}
              icon={<FileText className="h-3 w-3" />}
            />

            <InfoItem
              label="Latest Service"
              value={form.latestServiceDate}
              icon={<Wrench className="h-3 w-3" />}
            />
          </div>
        </section>

        {/* Delivery Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0D192B] sm:p-5">
          <SectionHeader
            icon={
              <Truck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            }
            title="Delivery Information"
            subtitle="Delivery date, location and terms"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              label="Delivery Date"
              value={form.deliveryDate}
              icon={<CalendarDays className="h-3 w-3" />}
            />

            <InfoItem
              label="Delivery Location"
              value={form.deliveryLocation}
              icon={<MapPin className="h-3 w-3" />}
            />

            <InfoItem
              label="Delivery Terms"
              value={form.deliveryTerms}
              icon={<Truck className="h-3 w-3" />}
            />
          </div>
        </section>

        {/* Payment Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0D192B] sm:p-5">
          <SectionHeader
            icon={
              <Wallet className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            }
            title="Payment Information"
            subtitle="Additional payment notes"
          />

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-[#101D31]/70">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-slate-800">
                <FileText className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
              </div>

              <div className="min-w-0">
                <p className="font-plus-jakarta text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Payment Notes
                </p>

                <p className="mt-1 break-words font-plus-jakarta text-xs font-bold text-slate-800 dark:text-slate-200 sm:text-sm">
                  {form.freeTextMessage || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Preview status */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-500/20 dark:bg-blue-500/10">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/10">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <p className="font-plus-jakarta text-xs font-bold text-blue-800 dark:text-blue-300">
              Agreement Preview
            </p>

            <p className="mt-0.5 font-plus-jakarta text-[10px] font-medium leading-5 text-blue-600 dark:text-blue-400">
              This preview updates automatically as you complete the
              agreement form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}