import React, { useState, useEffect } from "react";
import { makeGetRequest } from "../../../api/Api";
import {
  PurchasingAgreementIcon,
  SalesAgreementIcon,
  BrokerageAgreementIcon,
} from "../../utils/Icons";

interface Customer {
  id: number;
  type: string;
  status: string;
  totalSpent: number;
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  iconBg,
}) => (
  <div
    className="
      group
      relative overflow-hidden
      rounded-2xl
      border border-slate-200
      bg-white
      p-5
      shadow-sm
      transition-all duration-300
      hover:-translate-y-0.5
      hover:shadow-md

      dark:border-slate-800
      dark:bg-slate-900
      dark:shadow-black/20
    "
  >
    {/* Decorative circle */}
    <div
      className="
        pointer-events-none
        absolute -right-8 -top-8
        h-28 w-28
        rounded-full
        bg-slate-50
        transition-transform duration-500
        group-hover:scale-125
        dark:bg-slate-800/40
      "
    />

    <div className="relative flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p
          className="
            mb-2
            text-xs sm:text-sm
            font-medium
            text-slate-500
            dark:text-slate-400
          "
        >
          {title}
        </p>

        <div className="flex items-end gap-2">
          <p
            className="
              truncate
              text-2xl sm:text-[30px]
              font-bold
              tracking-tight
              text-slate-900
              dark:text-white
            "
            title={value}
          >
            {value.length > 8 ? `${value.slice(0, 8)}...` : value}
          </p>

          <p
            className={`
              mb-1
              truncate
              text-[11px] sm:text-xs
              font-semibold
              ${color}
            `}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <div
        className={`
          flex h-12 w-12 shrink-0
          items-center justify-center
          rounded-xl
          ${iconBg}
        `}
      >
        {icon}
      </div>
    </div>
  </div>
);

const CustomerStats = () => {
  const [stats, setStats] = useState({
    totalPurchasingCustomers: 0,
    totalSalesCustomers: 0,
    totalBrokerageClients: 0,
    totalSpentPurchasing: 0,
    totalSpentSales: 0,
    totalSpentBrokerage: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await makeGetRequest(
          "customer/getAllCustomers"
        );

        if (response.data && response.data.success) {
          const { data } = response.data;
          const customers: Customer[] = data || [];

          const purchasingCustomers = customers;

          const salesCustomers = customers.filter(
            (c) => c.type === "Client"
          );

          const brokerageClients = customers.filter(
            (c) => c.type === "Agency"
          );

          setStats({
            totalPurchasingCustomers:
              purchasingCustomers.length,

            totalSalesCustomers:
              salesCustomers.length,

            totalBrokerageClients:
              brokerageClients.length,

            totalSpentPurchasing:
              purchasingCustomers.reduce(
                (sum, c) => sum + (Number(c.totalSpent) || 0),
                0
              ),

            totalSpentSales:
              salesCustomers.reduce(
                (sum, c) => sum + (Number(c.totalSpent) || 0),
                0
              ),

            totalSpentBrokerage:
              brokerageClients.reduce(
                (sum, c) => sum + (Number(c.totalSpent) || 0),
                0
              ),
          });
        } else {
          setError(
            response.data?.message ||
              "Failed to fetch customer stats."
          );
        }
      } catch (err) {
        setError(
          "An error occurred while fetching customer stats."
        );

        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerStats();
  }, []);

  const getStatCards = () => {
    if (error) {
      return [
        {
          title: "Total Purchasing Customers",
          value: "00",
          subtitle: "0 kr spent",
          color: "text-emerald-600 dark:text-emerald-400",
          iconBg:
            "bg-emerald-50 dark:bg-emerald-950/30",
          icon: <PurchasingAgreementIcon />,
        },
        {
          title: "Total Sales Customers",
          value: "00",
          subtitle: "0 kr spent",
          color: "text-blue-600 dark:text-blue-400",
          iconBg:
            "bg-blue-50 dark:bg-blue-950/30",
          icon: <SalesAgreementIcon />,
        },
        {
          title: "Total Brokerage Clients",
          value: "00",
          subtitle: "0 kr spent",
          color: "text-purple-600 dark:text-purple-400",
          iconBg:
            "bg-purple-50 dark:bg-purple-950/30",
          icon: <BrokerageAgreementIcon />,
        },
      ];
    }

    return [
      {
        title: "Total Purchasing Customers",
        value: stats.totalPurchasingCustomers
          .toString()
          .padStart(2, "0"),
        subtitle: `${stats.totalSpentPurchasing.toLocaleString()} kr spent`,
        color: "text-emerald-600 dark:text-emerald-400",
        iconBg:
          "bg-emerald-50 dark:bg-emerald-950/30",
        icon: <PurchasingAgreementIcon />,
      },
      {
        title: "Total Sales Customers",
        value: stats.totalSalesCustomers
          .toString()
          .padStart(2, "0"),
        subtitle: `${stats.totalSpentSales.toLocaleString()} kr spent`,
        color: "text-blue-600 dark:text-blue-400",
        iconBg:
          "bg-blue-50 dark:bg-blue-950/30",
        icon: <SalesAgreementIcon />,
      },
      {
        title: "Total Brokerage Clients",
        value: stats.totalBrokerageClients
          .toString()
          .padStart(2, "0"),
        subtitle: `${stats.totalSpentBrokerage.toLocaleString()} kr spent`,
        color: "text-purple-600 dark:text-purple-400",
        iconBg:
          "bg-purple-50 dark:bg-purple-950/30",
        icon: <BrokerageAgreementIcon />,
      },
    ];
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-5
              shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="flex items-center justify-between">
              <div className="w-full">
                <div className="mb-3 h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-8 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              </div>

              <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* =====================================================
     STATS
  ===================================================== */

  return (
    <div className="mb-8 w-full">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {getStatCards().map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default CustomerStats;