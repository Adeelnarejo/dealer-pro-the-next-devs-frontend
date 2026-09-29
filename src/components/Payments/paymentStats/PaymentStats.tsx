import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../../../api/Api";

import {
  PaymentTotalIcon,
  PaymentAverageIcon,
  PaymentStatusIcon,
} from "../../utils/Icons";

interface Payment {
  id: number;
  total_amount: number;
  status?: string;
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  type: "blue" | "green" | "purple";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  type,
}) => {
  const iconBackground = {
    blue: "bg-blue-50 dark:bg-blue-950/40",
    green: "bg-green-50 dark:bg-green-950/40",
    purple: "bg-purple-50 dark:bg-purple-950/40",
  };

  return (
    <div
      className="
        bg-white
        dark:bg-[#0f172a]
        rounded-[20px]
        p-4 sm:p-5
        dashboard-cards
        border
        border-gray-100
        dark:border-slate-800
        transition-colors
        duration-200
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p
            className="
              text-xs sm:text-sm
              font-medium
              text-[#5E636B]
              dark:text-slate-400
              font-plus-jakarta
              mb-2
            "
          >
            {title}
          </p>

          <div className="flex items-end gap-2">
            <p
              className="
                text-2xl
                sm:text-[30px]
                lg:text-[32px]
                font-bold
                font-plus-jakarta
                text-[#000814]
                dark:text-white
                leading-none
              "
            >
              {value}
            </p>

            <p
              className="
                text-[11px]
                sm:text-[12px]
                font-medium
                font-plus-jakarta
                text-[#012F7A]
                dark:text-blue-400
                mb-0.5
              "
            >
              {subtitle}
            </p>
          </div>
        </div>

        <div
          className={`
            shrink-0
            p-3
            rounded-xl
            ${iconBackground[type]}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

const PaymentStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalPayment: {
      count: 0,
      label: "Payments",
    },

    averagePayment: {
      amount: 0,
      label: "kr",
    },

    paymentStatus: {
      successful: 0,
      pending: 0,
      failed: 0,
    },
  });

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentStats =
      async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response =
            await makeGetRequest(
              "payments/getAllPayments"
            );

          if (
            response.data &&
            response.data.success
          ) {
            const payments: Payment[] =
              response.data.data || [];

            const totalCount =
              payments.length;

            const totalAmount =
              payments.reduce(
                (sum, payment) =>
                  sum +
                  Number(
                    payment.total_amount || 0
                  ),
                0
              );

            const averageAmount =
              totalCount > 0
                ? totalAmount / totalCount
                : 0;

            const successfulCount =
              payments.filter(
                (payment) => {
                  const status =
                    payment.status?.toLowerCase();

                  return (
                    !status ||
                    status === "completed" ||
                    status === "successful" ||
                    status === "paid"
                  );
                }
              ).length;

            const pendingCount =
              payments.filter(
                (payment) =>
                  payment.status?.toLowerCase() ===
                  "pending"
              ).length;

            const failedCount =
              payments.filter(
                (payment) => {
                  const status =
                    payment.status?.toLowerCase();

                  return (
                    status === "failed" ||
                    status === "cancelled" ||
                    status === "rejected"
                  );
                }
              ).length;

            setStats({
              totalPayment: {
                count: totalCount,
                label: "Payments",
              },

              averagePayment: {
                amount:
                  Math.round(
                    averageAmount
                  ),
                label: "kr",
              },

              paymentStatus: {
                successful:
                  successfulCount,
                pending:
                  pendingCount,
                failed:
                  failedCount,
              },
            });
          } else {
            setError(
              response.data?.message ||
                "Failed to fetch payment stats."
            );
          }
        } catch (err) {
          console.error(err);

          setError(
            "An error occurred while fetching payment stats."
          );
        } finally {
          setIsLoading(false);
        }
      };

    fetchPaymentStats();
  }, []);

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-4 sm:gap-6
          mb-8
        "
      >
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              bg-white
              dark:bg-[#0f172a]
              rounded-[20px]
              p-5
              border
              border-gray-100
              dark:border-slate-800
              animate-pulse
            "
          >
            <div className="flex justify-between">
              <div className="w-full">
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-28 mb-4" />

                <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-24" />
              </div>

              <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* =========================================================
     CARDS
  ========================================================= */

  const statCards: StatCardProps[] = [
    {
      title: "Total Payment",
      value: error
        ? "00"
        : stats.totalPayment.count
            .toString()
            .padStart(2, "0"),
      subtitle: "Payments",
      type: "blue",
      icon: <PaymentTotalIcon />,
    },

    {
      title: "Average Payment",
      value: error
        ? "00"
        : stats.averagePayment.amount
            .toLocaleString("en-US"),
      subtitle: "kr",
      type: "green",
      icon: <PaymentAverageIcon />,
    },

    {
      title: "Payment Status",
      value: error
        ? "00"
        : stats.paymentStatus.successful
            .toString()
            .padStart(2, "0"),
      subtitle: "Successful",
      type: "purple",
      icon: <PaymentStatusIcon />,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-4 sm:gap-6
        mb-8
      "
    >
      {statCards.map(
        (stat, index) => (
          <StatCard
            key={index}
            {...stat}
          />
        )
      )}
    </div>
  );
};

export default PaymentStats;