import React from "react";
import {
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  Percent,
  WalletCards,
} from "lucide-react";

export default function Pris({ agreementData }: any) {
  const type = agreementData?.type;
  const data = agreementData?.dataValues || {};

  const isSales = type === "Sales Agreement";
  const isPurchase = type === "Purchase Agreement";
  const isAgency = !isSales && !isPurchase;

  const formatValue = (value: any) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }

    return String(value).replace(/_/g, " ");
  };

  const paymentMethod = formatValue(
    isSales
      ? data?.paymentMethod
      : data?.paymentMethod
  );

  return (
    <section className="mt-3 w-full overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#101D31]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-3 py-2 dark:border-slate-700 dark:bg-[#0B1628]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <WalletCards className="h-3.5 w-3.5" />
          </div>

          <div>
            <h3 className="text-[10px] font-extrabold text-slate-800 dark:text-white">
              Price & Payment Information
            </h3>

            <p className="text-[8px] font-medium text-slate-400 dark:text-slate-500">
              Financial and payment details
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />

          <span className="text-[7px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            {isSales
              ? "Sales"
              : isPurchase
              ? "Purchase"
              : "Agency"}
          </span>
        </div>
      </div>

      {/* Sales Agreement */}
      {isSales && (
        <>
          <InfoGrid>
            <InfoCell
              icon={<Building2 className="h-3 w-3" />}
              label="Credit Provider"
              value={formatValue(agreementData?.creditor)}
            />

            <InfoCell
              icon={<Banknote className="h-3 w-3" />}
              label="Credit Amount"
              value={formatValue(agreementData?.creditAmount)}
            />

            <InfoCell
              icon={<Percent className="h-3 w-3" />}
              label="Down Payment"
              value={formatValue(agreementData?.cashStack)}
            />

            <InfoCell
              icon={<CalendarDays className="h-3 w-3" />}
              label="Loan Period"
              value={formatValue(agreementData?.loanPeriod)}
            />
          </InfoGrid>

          <InfoGrid muted>
            <InfoCell
              icon={<Banknote className="h-3 w-3" />}
              label="Trade-In Purchase Price"
              value={formatValue(
                agreementData?.tradeInPurchasePrice
              )}
            />

            <InfoCell
              icon={<CreditCard className="h-3 w-3" />}
              label="Trade-In Credit Provider"
              value="N/A"
            />

            <InfoCell
              icon={<Banknote className="h-3 w-3" />}
              label="Trade-In Remaining Debt"
              value={formatValue(
                agreementData?.tradeInRestAmount
              )}
            />

            <InfoCell
              icon={<WalletCards className="h-3 w-3" />}
              label="Trade-In Deduction"
              value="N/A"
            />
          </InfoGrid>

          <InfoGrid>
            <InfoCell
              icon={<CreditCard className="h-3 w-3" />}
              label="Payment Method"
              value={paymentMethod}
            />

            <InfoCell
              icon={<Percent className="h-3 w-3" />}
              label="VAT"
              value="N/A"
            />

            <InfoCell
              icon={<Banknote className="h-3 w-3" />}
              label="Sales Price"
              value={formatValue(
                agreementData?.salesPriceSEK
              )}
              highlight
            />

            <InfoCell
              icon={<WalletCards className="h-3 w-3" />}
              label="Total Amount"
              value="N/A"
              highlight
            />
          </InfoGrid>
        </>
      )}

      {/* Purchase Agreement */}
      {isPurchase && (
        <>
          <InfoGrid>
            <InfoCell
              icon={<ShieldCheckIcon />}
              label="Credit Marking"
              value={formatValue(
                agreementData?.creditMarking
              )}
            />

            <InfoCell
              icon={<Building2 className="h-3 w-3" />}
              label="Credit Provider"
              value={formatValue(
                agreementData?.creditor
              )}
            />

            <InfoCell
              icon={<Banknote className="h-3 w-3" />}
              label="Credit Debt"
              value={formatValue(
                agreementData?.creditAmount
              )}
            />

            <InfoCell
              icon={<CalendarDays className="h-3 w-3" />}
              label="Settlement Date"
              value={formatValue(
                agreementData?.settlementDate
              )}
            />
          </InfoGrid>

          <InfoGrid muted>
            <InfoCell
              icon={<Percent className="h-3 w-3" />}
              label="VAT"
              value="N/A"
            />

            <InfoCell
              icon={<CalendarDays className="h-3 w-3" />}
              label="Payment Date"
              value={formatValue(
                agreementData?.payoutDate
              )}
            />

            <InfoCell
              icon={<CreditCard className="h-3 w-3" />}
              label="Payment Method"
              value={formatValue(
                data?.paymentMethod
              )}
            />

            <InfoCell
              icon={<Banknote className="h-3 w-3" />}
              label="Purchase Price"
              value={formatValue(
                data?.tradeInPurchasePrice
              )}
            />
          </InfoGrid>

          <InfoGrid>
            <InfoCell
              icon={<WalletCards className="h-3 w-3" />}
              label="Credit Debt Settlement"
              value="N/A"
            />

            <InfoCell
              icon={<Banknote className="h-3 w-3" />}
              label="Amount to Customer"
              value="N/A"
              highlight
            />

            <InfoCell
              icon={<FileText className="h-3 w-3" />}
              label="Payment Information"
              value={formatValue(
                agreementData?.freeTextMessage ||
                  agreementData?.notes
              )}
            />

            <InfoCell
              icon={<CheckCircle2 className="h-3 w-3" />}
              label="Status"
              value="N/A"
            />
          </InfoGrid>
        </>
      )}

      {/* Agency Agreement */}
      {isAgency && (
        <>
          <InfoGrid>
            <InfoCell
              icon={<ShieldCheckIcon />}
              label="Credit Marking"
              value={formatValue(
                data?.creditMarking
              )}
            />

            <InfoCell
              icon={<Building2 className="h-3 w-3" />}
              label="Credit Provider"
              value={formatValue(data?.creditor)}
            />

            <InfoCell
              icon={<Banknote className="h-3 w-3" />}
              label="Credit Debt"
              value={formatValue(
                data?.creditAmount
              )}
            />

            <InfoCell
              icon={<CalendarDays className="h-3 w-3" />}
              label="Settlement Date"
              value={formatValue(
                data?.settlementDate
              )}
            />
          </InfoGrid>

          <InfoGrid muted>
            <InfoCell
              icon={<Banknote className="h-3 w-3" />}
              label="Commission Amount"
              value={formatValue(
                data?.commissionAmount
              )}
              highlight
            />

            <InfoCell
              icon={<WalletCards className="h-3 w-3" />}
              label="Agency Costs"
              value={formatValue(
                data?.agencyFee
              )}
            />

            <InfoCell
              icon={<Percent className="h-3 w-3" />}
              label="VAT"
              value={formatValue(data?.vatType)}
            />

            <InfoCell
              icon={<CreditCard className="h-3 w-3" />}
              label="Payment Method"
              value={formatValue(
                data?.paymentMethod
              )}
            />
          </InfoGrid>

          <InfoGrid>
            <InfoCell
              icon={<WalletCards className="h-3 w-3" />}
              label="Credit Debt Settlement"
              value="N/A"
            />

            <InfoCell
              icon={<Banknote className="h-3 w-3" />}
              label="Commission Settlement"
              value={formatValue(
                data?.commissionAmount
              )}
            />

            <InfoCell
              icon={<Banknote className="h-3 w-3" />}
              label="Amount to Customer"
              value="N/A"
              highlight
            />

            <InfoCell
              icon={<CheckCircle2 className="h-3 w-3" />}
              label="Status"
              value="N/A"
            />
          </InfoGrid>
        </>
      )}
    </section>
  );
}

/* =========================================================
   Grid
========================================================= */

function InfoGrid({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 border-b border-slate-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-700 ${
        muted
          ? "bg-slate-50/60 dark:bg-[#0B1628]/50"
          : "bg-white dark:bg-[#101D31]"
      }`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   Info Cell
========================================================= */

function InfoCell({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="min-w-0 border-b border-slate-200 px-3 py-2.5 dark:border-slate-700">
      <div className="mb-1 flex items-center gap-1.5">
        <span className="text-blue-500 dark:text-blue-400">
          {icon}
        </span>

        <span className="text-[7px] font-extrabold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          {label}
        </span>
      </div>

      <p
        className={`break-words text-[9px] font-semibold ${
          highlight
            ? "text-blue-600 dark:text-blue-400"
            : "text-slate-700 dark:text-slate-200"
        }`}
        title={value}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   Small Shield Icon
========================================================= */

function ShieldCheckIcon() {
  return (
    <CheckCircle2 className="h-3 w-3" />
  );
}