import React, { useEffect, useState } from "react";
import {
  FileText,
  Clock3,
  CheckCircle2,
  AlertCircle,
  CircleDollarSign,
  TrendingUp,
} from "lucide-react";

import { makeGetRequest } from "../../../api/Api";

import {
  InvoiceTotalIcon,
  InvoiceOutstandingIcon,
  InvoicePaidIcon,
} from "../../utils/Icons";

interface Invoice {
  id: number;
  amount: number;
  status: string;
  net?: number;
  moms?: number;
  currency?: string;
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  type: "total" | "outstanding" | "paid";
  description: string;
}

interface InvoiceStatsState {
  totalInvoiced: {
    count: number;
    amount: number;
    label: string;
  };

  outstandingPayments: {
    amount: number;
    count: number;
    label: string;
  };

  paidInvoices: {
    amount: number;
    count: number;
    label: string;
  };
}

/* =========================================================
   STAT CARD
========================================================= */

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  type,
  description,
}) => {
  const styles = {
    total: {
      iconWrapper:
        "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      accent:
        "from-blue-500/10 via-transparent to-transparent",
      badge:
        "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },

    outstanding: {
      iconWrapper:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
      accent:
        "from-amber-500/10 via-transparent to-transparent",
      badge:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },

    paid: {
      iconWrapper:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      accent:
        "from-emerald-500/10 via-transparent to-transparent",
      badge:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
  };

  const currentStyle = styles[type];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      {/* Background Accent */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${currentStyle.accent} opacity-80`}
      />

      <div className="relative">
        {/* Top */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {title}
            </p>

            <div className="mt-3 flex items-end gap-2">
              <h3
                className="truncate text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white"
                title={value}
              >
                {value}
              </h3>

              <span
                className={`mb-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${currentStyle.badge}`}
              >
                Invoices
              </span>
            </div>
          </div>

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${currentStyle.iconWrapper} transition-transform duration-300 group-hover:scale-105`}
          >
            {icon}
          </div>
        </div>

        {/* Amount */}
        <div className="mt-5 flex items-center gap-2">
          <CircleDollarSign className="h-4 w-4 text-slate-400" />

          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
            {subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
          {type === "total" && (
            <FileText className="h-3.5 w-3.5 text-blue-500" />
          )}

          {type === "outstanding" && (
            <Clock3 className="h-3.5 w-3.5 text-amber-500" />
          )}

          {type === "paid" && (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          )}

          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   LOADING CARD
========================================================= */

const LoadingCard: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div className="w-full">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

          <div className="mt-4 h-9 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

          <div className="mt-5 h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="h-12 w-12 shrink-0 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
        <div className="h-3 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const InvoiceStats: React.FC = () => {
  const [stats, setStats] = useState<InvoiceStatsState>({
    totalInvoiced: {
      count: 0,
      amount: 0,
      label: "Total Invoices",
    },

    outstandingPayments: {
      amount: 0,
      count: 0,
      label: "Outstanding",
    },

    paidInvoices: {
      amount: 0,
      count: 0,
      label: "Paid Invoices",
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =======================================================
     FETCH
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchInvoiceStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await makeGetRequest(
          "invoices/getAllInvoices"
        );

        if (!isMounted) return;

        if (response.data && response.data.success) {
          const invoices: Invoice[] =
            response.data.invoices || [];

          const totalCount = invoices.length;

          const totalAmount = invoices.reduce(
            (sum, invoice) =>
              sum +
              (typeof invoice.amount === "number"
                ? invoice.amount
                : 0),
            0
          );

          const paidInvoices = invoices.filter(
            (invoice) =>
              invoice.status?.toLowerCase() === "paid"
          );

          const outstandingInvoices = invoices.filter(
            (invoice) => {
              const status = invoice.status?.toLowerCase();

              return (
                status === "pending" ||
                status === "overdue"
              );
            }
          );

          const paidAmount = paidInvoices.reduce(
            (sum, invoice) =>
              sum +
              (typeof invoice.amount === "number"
                ? invoice.amount
                : 0),
            0
          );

          const outstandingAmount =
            outstandingInvoices.reduce(
              (sum, invoice) =>
                sum +
                (typeof invoice.amount === "number"
                  ? invoice.amount
                  : 0),
              0
            );

          setStats({
            totalInvoiced: {
              count: totalCount,
              amount: totalAmount,
              label: "Total Invoices",
            },

            outstandingPayments: {
              amount: outstandingAmount,
              count: outstandingInvoices.length,
              label: "Outstanding",
            },

            paidInvoices: {
              amount: paidAmount,
              count: paidInvoices.length,
              label: "Paid Invoices",
            },
          });
        } else {
          setError(
            response.data?.message ||
              "Failed to fetch invoice statistics."
          );
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          setError(
            "An error occurred while fetching invoice statistics."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchInvoiceStats();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =======================================================
     FORMAT
  ======================================================= */

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })} kr`;
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (isLoading) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <div className="mb-8 rounded-2xl border border-red-200 bg-white p-5 shadow-sm dark:border-red-500/20 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <AlertCircle className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Invoice statistics unavailable
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     CARDS
  ======================================================= */

  const cards: StatCardProps[] = [
    {
      title: "Total Invoices",
      value: stats.totalInvoiced.count
        .toString()
        .padStart(2, "0"),
      subtitle: formatCurrency(
        stats.totalInvoiced.amount
      ),
      type: "total",
      description: `${stats.totalInvoiced.count} invoice${
        stats.totalInvoiced.count === 1 ? "" : "s"
      } recorded in the system.`,
      icon: (
        <InvoiceTotalIcon />
      ),
    },

    {
      title: "Outstanding",
      value: stats.outstandingPayments.count
        .toString()
        .padStart(2, "0"),
      subtitle: formatCurrency(
        stats.outstandingPayments.amount
      ),
      type: "outstanding",
      description: `${stats.outstandingPayments.count} payment${
        stats.outstandingPayments.count === 1
          ? ""
          : "s"
      } currently outstanding.`,
      icon: (
        <InvoiceOutstandingIcon />
      ),
    },

    {
      title: "Paid Invoices",
      value: stats.paidInvoices.count
        .toString()
        .padStart(2, "0"),
      subtitle: formatCurrency(
        stats.paidInvoices.amount
      ),
      type: "paid",
      description: `${stats.paidInvoices.count} invoice${
        stats.paidInvoices.count === 1 ? "" : "s"
      } successfully paid.`,
      icon: (
        <InvoicePaidIcon />
      ),
    },
  ];

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="mb-8">
      {/* Section Heading */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <TrendingUp className="h-4 w-4" />
            </div>

            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Invoice Overview
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track invoice activity, payments and outstanding balances.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => (
          <StatCard
            key={`${card.title}-${index}`}
            {...card}
          />
        ))}
      </div>
    </div>
  );
};

export default InvoiceStats;