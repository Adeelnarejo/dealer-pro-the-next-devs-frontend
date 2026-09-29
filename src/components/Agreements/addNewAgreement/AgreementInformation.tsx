import {
  CheckCircle2,
  ChevronDown,
  Mail,
  Phone,
  QrCode,
  Shield,
  User,
  WalletCards,
} from "lucide-react";
import { useUserProfile } from "../../../utils/useUserProfile";

type Props = {
  setSelect1: (value: string) => void;
  select1: string;
  select2: string;
  setSelect2: (value: string) => void;
  user: any;
  agreementData: {
    name: string;
    phone: string;
    socialSecurityNumber: string;
    email: string;
  };
  publicAccess?: any;
  isDisabled?: boolean;
  isSigning?: boolean;
  isPublicAccess?: boolean;
  handleBankSign: (useQrCode?: boolean) => void;
  handleVerifyWithPhone: () => void;
  handleVerifyWithEmail: () => void;
  Signature: React.ComponentType<{ strokeWidth?: string }>;
  Loader2: React.ComponentType<{ className?: string }>;
  Shield: React.ComponentType<{ className?: string }>;
  approved: "pending" | "approved" | "rejected" | undefined | any;
};

export default function AgreementInformation({
  select1,
  select2,
  setSelect2,
  agreementData,
  publicAccess = false,
  isDisabled = false,
  isSigning = false,
  isPublicAccess = false,
  handleBankSign,
  handleVerifyWithPhone,
  handleVerifyWithEmail,
  Loader2,
  Shield,
}: Props) {
  const { user } = useUserProfile();

  const dealerName =
    `${user?.first || ""} ${user?.last || ""}`.trim() || "N/A";

  const customerName =
    (agreementData as any)?.dataValues?.name || "N/A";

  const customerSSN =
    (agreementData as any)?.dataValues?.socialSecurityNumber || "N/A";

  const customerEmail =
    (agreementData as any)?.dataValues?.email || "N/A";

  const customerPhone =
    (agreementData as any)?.dataValues?.phone || "N/A";

  const getSigningLabel = () => {
    if (publicAccess) {
      return "Choose signing method";
    }

    return "Choose verification method";
  };

  const handleSign = () => {
    if (isPublicAccess) {
      handleBankSign(true);
      return;
    }

    if (
      select1 === "denna-enhet" ||
      select2 === "denna-enhet"
    ) {
      handleVerifyWithPhone();
    } else if (
      select1 === "e-postlänk" ||
      select2 === "e-postlänk"
    ) {
      handleVerifyWithEmail();
    } else if (
      select1 === "qr-kod" ||
      select2 === "qr-kod"
    ) {
      handleBankSign(true);
    } else {
      handleBankSign();
    }
  };

  const renderSigningOptions = () => (
    <>
      {publicAccess ? (
        <>
          <option value="denna-enhet">
            Sign via QR code
          </option>
          <option value="e-postlänk">
            Sign on this device
          </option>
          <option value="e-signatur">
            Sign with electronic signature
          </option>
        </>
      ) : (
        <>
          <option value="denna-enhet">
            BankID via SMS link
          </option>
          <option value="e-postlänk">
            BankID via email link
          </option>
        </>
      )}
    </>
  );

  const selectClass =
    "w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 font-plus-jakarta text-xs font-semibold text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#101D31] dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:bg-[#101D31]";

  return (
    <section className="mb-8 w-full font-plus-jakarta">
      {/* Section heading */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
              <WalletCards className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
                Agreement Signing
              </h2>

              <p className="mt-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                Review participant details and choose a signing method
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-fit items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Secure signing
          </span>
        </div>
      </div>

      {/* Participants */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Dealer */}
        <ParticipantCard
          title="Dealer"
          subtitle="Dealer / authorized representative"
          icon={<User className="h-5 w-5" />}
          accent="blue"
          name={dealerName}
          ssn={agreementData?.socialSecurityNumber || "N/A"}
          email={user?.email || "N/A"}
          phone={user?.phone || "N/A"}
          selectValue={select2}
          selectId="dealer-signing-method"
          selectLabel={getSigningLabel()}
          selectClass={selectClass}
          renderOptions={renderSigningOptions}
          onSelect={setSelect2}
          isDisabled={isDisabled}
          isSigning={isSigning}
          onSign={handleSign}
          Loader2={Loader2}
          Shield={Shield}
          publicAccess={publicAccess}
        />

        {/* Customer */}
        <ParticipantCard
          title="Customer"
          subtitle="Customer / agreement recipient"
          icon={<User className="h-5 w-5" />}
          accent="violet"
          name={customerName}
          ssn={customerSSN}
          email={customerEmail}
          phone={customerPhone}
          selectValue={select2}
          selectId="customer-signing-method"
          selectLabel={getSigningLabel()}
          selectClass={selectClass}
          renderOptions={renderSigningOptions}
          onSelect={setSelect2}
          isDisabled={isDisabled}
          isSigning={isSigning}
          onSign={handleSign}
          Loader2={Loader2}
          Shield={Shield}
          publicAccess={publicAccess}
        />
      </div>
    </section>
  );
}

type ParticipantCardProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: "blue" | "violet";
  name: string;
  ssn: string;
  email: string;
  phone: string;
  selectValue: string;
  selectId: string;
  selectLabel: string;
  selectClass: string;
  renderOptions: () => React.ReactNode;
  onSelect: (value: string) => void;
  isDisabled: boolean;
  isSigning: boolean;
  onSign: () => void;
  Loader2: React.ComponentType<{ className?: string }>;
  Shield: React.ComponentType<{ className?: string }>;
  publicAccess?: any;
};

function ParticipantCard({
  title,
  subtitle,
  icon,
  accent,
  name,
  ssn,
  email,
  phone,
  selectValue,
  selectId,
  selectLabel,
  selectClass,
  renderOptions,
  onSelect,
  isDisabled,
  isSigning,
  onSign,
  Loader2,
  Shield,
}: ParticipantCardProps) {
  const isBlue = accent === "blue";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-[#0B1628]">
      {/* Accent */}
      <div
        className={`h-[2px] w-full ${
          isBlue
            ? "bg-gradient-to-r from-blue-500 to-cyan-400"
            : "bg-gradient-to-r from-violet-500 to-fuchsia-400"
        }`}
      />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                isBlue
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                  : "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
              }`}
            >
              {icon}
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                {title}
              </h3>

              <p className="mt-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />

            <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400">
              Verified
            </span>
          </div>
        </div>

        {/* Person information */}
        <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-[#101D31]">
          <div className="mb-4">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Name
            </p>

            <p className="mt-1 text-sm font-extrabold text-slate-800 dark:text-white">
              {name}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              icon={<Shield className="h-3.5 w-3.5" />}
              label="SSN"
              value={ssn}
            />

            <InfoItem
              icon={<Mail className="h-3.5 w-3.5" />}
              label="Email"
              value={email}
            />

            <InfoItem
              icon={<Phone className="h-3.5 w-3.5" />}
              label="Mobile"
              value={phone}
            />
          </div>
        </div>

        {/* Signing method */}
        <div className="mt-5">
          <label
            htmlFor={selectId}
            className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
          >
            {selectLabel}
          </label>

          <div className="relative">
            <select
              id={selectId}
              value={selectValue}
              onChange={(e) => onSelect(e.target.value)}
              disabled={isDisabled || isSigning}
              className={`${selectClass} ${
                isDisabled || isSigning
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer"
              }`}
            >
              <option value="Signeringsalternativ">
                Select signing method
              </option>

              {renderOptions()}
            </select>

            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          </div>
        </div>

        {/* Secure action */}
        <button
          type="button"
          disabled={isDisabled || isSigning}
          onClick={onSign}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-xs font-extrabold transition-all duration-200 ${
            isDisabled || isSigning
              ? "cursor-not-allowed bg-blue-300 text-white dark:bg-blue-900/60 dark:text-slate-400"
              : "bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25"
          }`}
        >
          {isSigning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Shield className="h-4 w-4" />
              Send for Signature
            </>
          )}
        </button>

        {/* Security note */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <QrCode className="h-3 w-3 text-slate-400 dark:text-slate-500" />

          <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
            Secure digital signing
          </span>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
        {icon}

        <span className="text-[9px] font-bold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-1 truncate text-[11px] font-semibold text-slate-700 dark:text-slate-300">
        {value || "N/A"}
      </p>
    </div>
  );
}