import React, { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Handshake,
  Loader2,
  RefreshCw,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import { makeGetRequest } from "../../../api/Api";

import {
  PurchasingAgreementIcon,
  SalesAgreementIcon,
  BrokerageAgreementIcon,
} from "../../utils/Icons";

interface Agreement {
  id: number;
  type: string;
  purchasePrice?: number;
  salesPrice?: number;
  status: string;
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconWrapper: string;
  accent: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconWrapper,
  accent,
  description,
}) => {
  return (
    <div className="group relative min-w-0 overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_6px_30px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-[#0B1728] dark:shadow-none dark:hover:border-slate-700 sm:p-6">
      {/* Accent line */}
      <div
        className={`absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r ${accent}`}
      />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-blue-500/[0.035] blur-3xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-blue-500/[0.07]" />

      <div className="relative">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <p className="truncate text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 sm:text-[11px]">
                {title}
              </p>

              <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 sm:block" />
            </div>

            <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
              <p className="text-[32px] font-extrabold leading-none tracking-tight text-slate-950 dark:text-white sm:text-[36px]">
                {value}
              </p>

              <span className="mb-0.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                {subtitle}
              </span>
            </div>
          </div>

          {/* Icon */}
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${iconWrapper}`}
          >
            {icon}
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />

        {/* Bottom */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <CircleDollarSign size={14} />
            </div>

            <p className="truncate text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>

          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-slate-800/70 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-400">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AgreementStats = () => {
  const [stats, setStats] = useState({
    totalPurchasingAgreement: {
      count: 0,
      amount: 0,
      label: "Purchased Vehicles",
    },
    totalSalesAgreement: {
      count: 0,
      amount: 0,
      label: "Sold Vehicles",
    },
    totalBrokerageAgreement: {
      count: 0,
      amount: 0,
      label: "Brokered Vehicles",
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgreementStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await makeGetRequest("agreements/getAllAgreements");

      if (response.data && response.data.success) {
        const agreements: Agreement[] = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        const purchasingAgreements = agreements.filter(
          (agreement) => agreement.type === "Purchase Agreement"
        );

        const salesAgreements = agreements.filter(
          (agreement) => agreement.type === "Sales Agreement"
        );

        const brokerageAgreements = agreements.filter(
          (agreement) => agreement.type === "Agency Agreement"
        );

        const purchasingAmount = purchasingAgreements.reduce(
          (sum, agreement) => sum + Number(agreement.purchasePrice || 0),
          0
        );

        const salesAmount = salesAgreements.reduce(
          (sum, agreement) => sum + Number(agreement.salesPrice || 0),
          0
        );

        const brokerageAmount = brokerageAgreements.reduce(
          (sum, agreement) => sum + Number(agreement.salesPrice || 0),
          0
        );

        setStats({
          totalPurchasingAgreement: {
            count: purchasingAgreements.length,
            amount: purchasingAmount,
            label: "Purchased Vehicles",
          },

          totalSalesAgreement: {
            count: salesAgreements.length,
            amount: salesAmount,
            label: "Sold Vehicles",
          },

          totalBrokerageAgreement: {
            count: brokerageAgreements.length,
            amount: brokerageAmount,
            label: "Brokered Vehicles",
          },
        });
      } else {
        setError(
          response.data?.message ||
            "Failed to retrieve agreement statistics."
        );
      }
    } catch (err) {
      console.error("Agreement statistics error:", err);
      setError("Unable to retrieve agreement statistics.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgreementStats();
  }, []);

  const formatAmount = (amount: number) => {
    return `${amount.toLocaleString("en-US")} SEK`;
  };

  const getStatCards = (): StatCardProps[] => {
    if (error) {
      return [
        {
          title: "Purchase Agreements",
          value: "--",
          subtitle: "Unavailable",
          description: "Unable to load statistics",
          icon: <ShoppingCart size={21} />,
          iconWrapper:
            "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
          accent: "from-emerald-500 to-teal-400",
        },
        {
          title: "Sales Agreements",
          value: "--",
          subtitle: "Unavailable",
          description: "Unable to load statistics",
          icon: <FileText size={21} />,
          iconWrapper:
            "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
          accent: "from-blue-600 to-cyan-400",
        },
        {
          title: "Agency Agreements",
          value: "--",
          subtitle: "Unavailable",
          description: "Unable to load statistics",
          icon: <Handshake size={21} />,
          iconWrapper:
            "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
          accent: "from-violet-600 to-fuchsia-400",
        },
      ];
    }

    return [
      {
        title: "Purchase Agreements",
        value: stats.totalPurchasingAgreement.count
          .toString()
          .padStart(2, "0"),
        subtitle: formatAmount(stats.totalPurchasingAgreement.amount),
        description: "Purchased vehicles",
        icon: <PurchasingAgreementIcon />,
        iconWrapper:
          "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
        accent: "from-emerald-500 to-teal-400",
      },

      {
        title: "Sales Agreements",
        value: stats.totalSalesAgreement.count.toString().padStart(2, "0"),
        subtitle: formatAmount(stats.totalSalesAgreement.amount),
        description: "Sold vehicles",
        icon: <SalesAgreementIcon />,
        iconWrapper:
          "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
        accent: "from-blue-600 to-cyan-400",
      },

      {
        title: "Agency Agreements",
        value: stats.totalBrokerageAgreement.count
          .toString()
          .padStart(2, "0"),
        subtitle: formatAmount(stats.totalBrokerageAgreement.amount),
        description: "Brokered vehicles",
        icon: <BrokerageAgreementIcon />,
        iconWrapper:
          "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
        accent: "from-violet-600 to-fuchsia-400",
      },
    ];
  };

  /* ============================================================
     LOADING
  ============================================================ */

  if (isLoading) {
    return (
      <section className="mb-8">
        {/* Section heading skeleton */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="mt-2 h-3 w-52 animate-pulse rounded-md bg-slate-100 dark:bg-slate-800/70" />
          </div>

          <div className="hidden h-8 w-24 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800 sm:block" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B1728] sm:p-6"
            >
              <div className="flex items-start justify-between">
                <div className="w-full">
                  <div className="h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

                  <div className="mt-4 h-9 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
              </div>

              <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />

              <div className="h-3 w-32 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ============================================================
     CONTENT
  ============================================================ */

  return (
    <section className="mb-8">
      {/* Section header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <BriefcaseBusiness size={14} />
            </div>

            <h2 className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-base">
              Agreement Overview
            </h2>

            <span className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
              <Sparkles size={9} />
              Live
            </span>
          </div>

          <p className="mt-1 pl-9 text-[10px] font-medium text-slate-400 dark:text-slate-500 sm:text-xs">
            Current agreement volume and transaction values
          </p>
        </div>

        <button
          type="button"
          onClick={fetchAgreementStats}
          disabled={isLoading}
          className="flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-[#0B1728] dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 sm:text-xs"
        >
          <RefreshCw
            size={13}
            className={isLoading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50/70 p-4 dark:border-rose-500/15 dark:bg-rose-500/[0.06] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              <CircleDollarSign size={16} />
            </div>

            <div>
              <p className="text-xs font-extrabold text-rose-800 dark:text-rose-300">
                Agreement statistics unavailable
              </p>

              <p className="mt-0.5 text-[10px] text-rose-600/80 dark:text-rose-400/70">
                {error}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchAgreementStats}
            className="flex w-fit items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-rose-600 shadow-sm transition hover:bg-rose-100 dark:bg-[#101F33] dark:hover:bg-rose-500/10"
          >
            <RefreshCw size={12} />
            Try again
          </button>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {getStatCards().map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Bottom summary */}
      {!error && (
        <div className="mt-4 flex flex-col gap-2 rounded-xl border border-slate-200/70 bg-white/70 px-4 py-3 dark:border-slate-800 dark:bg-[#0B1728]/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={14}
              className="text-emerald-500"
            />

            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 sm:text-xs">
              Agreement statistics are synced with your dealership data.
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
            <ArrowDownToLine size={12} />
            Updated automatically
          </div>
        </div>
      )}
    </section>
  );
};

export default AgreementStats;