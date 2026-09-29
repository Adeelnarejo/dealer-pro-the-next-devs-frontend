import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import {
  Download,
  Shield,
  CheckCircle,
  Loader2,
  Signature,
  Link,
  Clock3,
  FileCheck2,
  LockKeyhole,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import { makeGetRequest, makePostRequest } from "../../api/Api";
import {
  BACKEND_API_ENDPOINT,
  xApiKey,
} from "../../api/config";

import AgreementPDF from "../../components/SignAgreement/AgreementPDF";
import VerifikatPDF from "../../components/SignAgreement/VerifatPDF";

import { useUserProfile } from "../../utils/useUserProfile";
import { pdfLogo } from "../../assets";
import { formatRemainingTime } from "../../utils/publicSigningUtils";

import AgreementInformation from "../../components/Agreements/addNewAgreement/AgreementInformation";

import Fordon from "../../components/Agreements/agreementInfo/Fordon";
import Leveransvilkor from "../../components/Agreements/agreementInfo/Leveransvilkor";
import Pris from "../../components/Agreements/agreementInfo/Pris";
import AuthUserInfo from "../../components/Agreements/agreementInfo/AuthUserInfo";
import CustomerInfo from "../../components/Agreements/agreementInfo/CustomerInfo";

import axios from "axios";

const AgreementSign = () => {
  const { agreementID } = useParams();
  const navigate = useNavigate();

  const pdfRef = useRef<HTMLDivElement>(null);

  // ============================================================
  // PUBLIC ACCESS
  // ============================================================
  const urlParams = new URLSearchParams(window.location.search);

  const accessToken = urlParams.get("token");
  const expiryTime = urlParams.get("expires");

  const isPublicAccess = Boolean(accessToken && expiryTime);

  // ============================================================
  // STATE
  // ============================================================
  const [agreementData, setAgreementData] = useState<any>(null);

  const [termsChecked, setTermsChecked] = useState(true);
  const [gdprChecked, setGdprChecked] = useState(true);

  const [isSigning, setIsSigning] = useState(false);

  const [showQR, setShowQR] = useState("");

  const [orderRef, setOrderRef] = useState("");

  const [signingStatus, setSigningStatus] = useState<
    "pending" | "approved" | null
  >(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [showVerificationOptions, setShowVerificationOptions] =
    useState(false);

  const [bankIdUrl, setBankIdUrl] = useState("");

  const [isLinkExpired, setIsLinkExpired] = useState(false);

  const [remainingTimeText, setRemainingTimeText] = useState("");

  const [isGeneratingPublicLink, setIsGeneratingPublicLink] =
    useState(false);

  const pollingIntervalRef = useRef<number | null>(null);
  const pollingTimeoutRef = useRef<number | null>(null);

  const { user } = useUserProfile();

  const [select1, setSelect1] = useState("Signeringsalternativ");
  const [select2, setSelect2] = useState("Signeringsalternativ");

  const storedToken =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  // ============================================================
  // LINK EXPIRY
  // ============================================================
  const checkLinkExpiry = useCallback(() => {
    if (isPublicAccess && expiryTime) {
      const expiryTimestamp = parseInt(expiryTime);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp > expiryTimestamp) {
        setIsLinkExpired(true);
        setError(
          "This signing link has expired. Please request a new one."
        );
        return true;
      }
    }

    return false;
  }, [isPublicAccess, expiryTime]);

  // ============================================================
  // CLEAR POLLING
  // ============================================================
  const clearPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
  };

  // ============================================================
  // CANCEL SIGNING
  // ============================================================
  const cancelSigning = () => {
    clearPolling();

    setSigningStatus(null);
    setIsSigning(false);

    toast("Signing process cancelled");
  };

  // ============================================================
  // CLEANUP
  // ============================================================
  useEffect(() => {
    return () => {
      clearPolling();
    };
  }, []);

  // ============================================================
  // LIVE EXPIRY COUNTDOWN
  // ============================================================
  useEffect(() => {
    if (isPublicAccess && expiryTime) {
      const updateRemainingTime = () => {
        const timeText = formatRemainingTime(expiryTime);

        setRemainingTimeText(timeText);

        if (checkLinkExpiry()) {
          return;
        }
      };

      updateRemainingTime();

      const interval = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(interval);
    }
  }, [
    isPublicAccess,
    expiryTime,
    checkLinkExpiry,
  ]);

  // ============================================================
  // TRANSACTION DATA
  // ============================================================
  const transactionData = {
    transactionNumber: "12345",
    regNumber: "ABC123",
    contractType: "Köpeavtal",
    createdTimestamp: "2025-07-06 14:30",
    dealerUsername: "dealername",
    dealerEmail: "dealer@example.com",
    dealerPhone: "+46 123 456 789",
    dealerName: "Dealer AB",
    dealerOrgNr: "556677-8899",
    successTimestamp: "2025-07-06 14:35",
    customerName: "Kund Namn",
    customerEmail: "kund@example.com",
    customerPhone: "+46 987 654 321",
    customerPersonnr: "19800101-1234",
  };

  // ============================================================
  // FETCH AGREEMENT
  // ============================================================
  useEffect(() => {
    const fetchAgreementData = async () => {
      if (!agreementID) {
        setError("No agreement ID provided");
        setIsLoading(false);
        return;
      }

      if (isPublicAccess && checkLinkExpiry()) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const endpoint = isPublicAccess
          ? `publicsigning/getAgreement/${agreementID}?token=${accessToken}`
          : `agreements/getAgreementById/${agreementID}`;

        let response;

        if (isPublicAccess) {
          const fullUrl = `${BACKEND_API_ENDPOINT}${endpoint}`;

          const fetchResponse = await fetch(fullUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": xApiKey,
            },
          });

          const data = await fetchResponse.json();

          response = { data };
        } else {
          response = await makeGetRequest(endpoint);
        }

        if (response.data.success) {
          setAgreementData(response.data.data);
        } else {
          setError(
            isPublicAccess
              ? "Invalid or expired signing link"
              : "Failed to fetch agreement data"
          );
        }
      } catch (err) {
        console.error("Error fetching agreement:", err);

        setError(
          isPublicAccess
            ? "Invalid or expired signing link"
            : "Error fetching agreement data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgreementData();
  }, [
    agreementID,
    isPublicAccess,
    accessToken,
    checkLinkExpiry,
  ]);

  // ============================================================
  // DOWNLOAD AGREEMENT PDF
  // ============================================================
  const handleDownload = async () => {
    if (!agreementData) {
      toast.error("Agreement data not available");
      return;
    }

    try {
      toast.loading("Generating PDF...", {
        id: "pdf-generation",
      });

      const blob = await pdf(
        <AgreementPDF
          agreementData={agreementData}
          agreementID={agreementID || "N/A"}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");

      link.download = `Agreement-${agreementID}-${timestamp}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!", {
        id: "pdf-generation",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);

      toast.error(
        "Failed to generate PDF. Please try again.",
        {
          id: "pdf-generation",
        }
      );
    }
  };

  // ============================================================
  // GENERATE PUBLIC LINK
  // ============================================================
  const handleGeneratePublicLink = async () => {
    if (!agreementID) {
      toast.error("Agreement ID not available");
      return;
    }

    setIsGeneratingPublicLink(true);

    try {
      const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

      if (!token) {
        toast.error("Authentication required. Please log in.");
        return;
      }

      const response = await fetch(
        `${BACKEND_API_ENDPOINT}publicsigning/generate-token/${agreementID}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "x-api-key": xApiKey,
            token: `${token}`,
          },

          body: JSON.stringify({
            expiryHours: 1,
            emailSent: null,
            smsSent: null,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        const publicUrl = data.data.publicLink;

        await navigator.clipboard.writeText(publicUrl);

        toast.success(
          "Public signing link copied to clipboard!"
        );

        console.log("Generated public URL:", publicUrl);

        return publicUrl;
      }

      throw new Error(
        data.message || "Failed to generate public link"
      );
    } catch (error) {
      console.error(
        "Error generating public link:",
        error
      );

      toast.error(
        "Failed to generate public link. Please try again."
      );
    } finally {
      setIsGeneratingPublicLink(false);
    }
  };

  // ============================================================
  // DOWNLOAD VERIFIKAT
  // ============================================================
  const handleDownloadVerifikat = async () => {
    if (!transactionData) {
      toast.error("Transaction data not available");
      return;
    }

    try {
      toast.loading("Generating Verifikat PDF...", {
        id: "verifikat-generation",
      });

      const blob = await pdf(
        <VerifikatPDF transactionData={transactionData} />
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `verifikat-${transactionData.transactionNumber}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      toast.success("Verifikat downloaded successfully!", {
        id: "verifikat-generation",
      });
    } catch (error) {
      console.error(
        "Error generating Verifikat PDF:",
        error
      );

      toast.error(
        "Failed to generate Verifikat. Please try again.",
        {
          id: "verifikat-generation",
        }
      );
    }
  };

  // ============================================================
  // BANKID HELPER
  // ============================================================
  const handleBankHelper = async (
    agreementID: string | undefined,
    showQr: boolean = false
  ) => {
    const payload = {
      agreementID: parseInt(agreementID ?? ""),
      endUserIp: "13.60.79.146",
      userVisibleData: "Signing agreement for BankID",
      userNonVisibleData: "Agreement signing",
      getQr: true,
    };

    let response;

    if (isPublicAccess) {
      const fetchResponse = await fetch(
        `${BACKEND_API_ENDPOINT}banksign/start`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            token: `${accessToken}`,
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await fetchResponse.json();

      response = { data };
    } else {
      response = await makePostRequest(
        "banksign/start",
        payload
      );
    }

    if (response.data.success) {
      if (
        response.data.bankIdResponse?.qrImage &&
        showQr
      ) {
        setShowQR(
          response.data.bankIdResponse.qrImage
        );
      }

      if (
        response.data.bankIdResponse?.bankidUrl
      ) {
        setBankIdUrl(
          response.data.bankIdResponse.bankidUrl
        );

        setShowVerificationOptions(true);
      }

      if (
        response.data.bankIdResponse?.orderRef
      ) {
        setOrderRef(
          response.data.bankIdResponse.orderRef
        );

        const pollStatus = async () => {
          try {
            const statusResponse =
              await makePostRequest(
                "banksign/status",
                {
                  orderRef:
                    response.data.bankIdResponse.orderRef,
                }
              );

            if (
              statusResponse.data.success &&
              statusResponse.data.bankIdStatus?.Response
                ?.Status === "complete"
            ) {
              setSigningStatus("approved");

              toast.success(
                "Signing approved successfully!"
              );

              clearPolling();

              handleDownloadVerifikat();
            } else if (
              statusResponse.data.bankIdStatus?.Response
                ?.Status === "failed" ||
              statusResponse.data.bankIdStatus?.Response
                ?.Status === "cancelled"
            ) {
              setSigningStatus(null);

              toast.error(
                "Signing failed or was cancelled. Please try again."
              );

              clearPolling();
            } else {
              setSigningStatus("pending");
            }
          } catch (statusError) {
            console.error(
              "Error checking signing status:",
              statusError
            );

            setSigningStatus("pending");
          }
        };

        setSigningStatus("pending");

        clearPolling();

        pollingIntervalRef.current =
          setInterval(
            pollStatus,
            3000
          ) as unknown as number;

        pollingTimeoutRef.current =
          setTimeout(() => {
            clearPolling();

            setSigningStatus(null);

            toast.error(
              "Signing timeout. Please try again."
            );
          }, 300000) as unknown as number;
      }
    } else {
      toast.error(
        "Failed to initiate BankID signing"
      );
    }
  };

  // ============================================================
  // BANKID SIGN
  // ============================================================
  const handleBankSign = async (
    showQr: boolean = false
  ) => {
    if (!termsChecked || !gdprChecked) {
      toast.error(
        "Please accept all terms and conditions"
      );

      return;
    }

    if (!agreementID) {
      toast.error("No agreement ID found");

      return;
    }

    setIsSigning(true);
    setSigningStatus(null);

    try {
      await handleBankHelper(
        agreementID,
        showQr
      );
    } catch (error: any) {
      console.error(
        "Error initiating BankID signing:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "An error occurred during signing"
      );
    } finally {
      setIsSigning(false);
    }
  };

  // ============================================================
  // PHONE VERIFICATION
  // ============================================================
  const handleVerifyWithPhone = async () => {
    const publicLink =
      await handleGeneratePublicLink();

    const phoneNumber =
      select1 === "denna-enhet"
        ? user?.phone
        : select2 === "denna-enhet"
        ? agreementData?.dataValues.phone
        : null;

    const targetPhone = isPublicAccess
      ? agreementData?.dataValues.phone
      : phoneNumber;

    if (!targetPhone) {
      toast.error("No phone number found");
      return;
    }

    try {
      setIsSigning(true);

      await handleBankHelper(agreementID);

      if (storedToken !== null) {
        const response = await axios.post(
          `${BACKEND_API_ENDPOINT}banksign/sendBankIdLinkSMS`,
          {
            phone: targetPhone,

            sender:
              agreementData?.dataValues.name,

            message: `Hej!
Ditt avtal är nu klart att läsas och signeras. Klicka på länken nedan:
${publicLink}
Har du några frågor är du varmt välkommen att höra av dig.
/ DealerPro`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (response.data.success) {
          toast.success(
            "BankID link sent to your phone!"
          );

          setShowVerificationOptions(false);

          if (orderRef) {
            const pollStatus = async () => {
              try {
                const statusResponse =
                  await makePostRequest(
                    "banksign/status",
                    {
                      orderRef,
                    }
                  );

                if (
                  statusResponse.data.success &&
                  statusResponse.data.bankIdStatus
                    ?.Response?.Status ===
                    "complete"
                ) {
                  setSigningStatus("approved");

                  toast.success(
                    "Signing approved successfully!"
                  );

                  clearPolling();

                  handleDownloadVerifikat();
                } else if (
                  statusResponse.data.bankIdStatus
                    ?.Response?.Status ===
                    "failed" ||
                  statusResponse.data.bankIdStatus
                    ?.Response?.Status ===
                    "cancelled"
                ) {
                  setSigningStatus(null);

                  toast.error(
                    "Signing failed or was cancelled. Please try again."
                  );

                  clearPolling();
                } else {
                  setSigningStatus("pending");
                }
              } catch (statusError) {
                console.error(
                  "Error checking signing status:",
                  statusError
                );

                setSigningStatus("pending");
              }
            };

            setSigningStatus("pending");

            clearPolling();

            pollingIntervalRef.current =
              setInterval(
                pollStatus,
                3000
              ) as unknown as number;
          }
        } else {
          toast.error(
            response.data.message ||
              "Failed to send SMS"
          );
        }
      }
    } catch (error) {
      console.error(
        "Error sending SMS:",
        error
      );

      toast.error(
        "Failed to send SMS. Please try again."
      );
    } finally {
      setIsSigning(false);
    }
  };

  // ============================================================
  // EMAIL VERIFICATION
  // ============================================================
  const handleVerifyWithEmail = async () => {
    const targetEmail = isPublicAccess
      ? agreementData?.dataValues.email
      : user?.email;

    const targetEmail2 = isPublicAccess
      ? agreementData?.dataValues.email
      : agreementData?.dataValues.email;

    if (!targetEmail) {
      toast.error("No email found");
      return;
    }

    try {
      setIsSigning(true);

      const response = await makePostRequest(
        "email/send-bankid-link",
        {
          email: targetEmail2,

          link: bankIdUrl,

          ...(isPublicAccess && {
            accessToken,
            publicAccess: true,
          }),
        }
      );

      if (response.data.success) {
        toast.success(
          "BankID link sent to your email!"
        );

        setShowVerificationOptions(false);

        if (orderRef) {
          const pollStatus = async () => {
            try {
              const statusResponse =
                await makePostRequest(
                  "banksign/status",
                  {
                    orderRef,
                  }
                );

              if (
                statusResponse.data.success &&
                statusResponse.data.bankIdStatus
                  ?.Response?.Status ===
                  "complete"
              ) {
                setSigningStatus("approved");

                toast.success(
                  "Signing approved successfully!"
                );

                clearPolling();

                handleDownloadVerifikat();
              } else if (
                statusResponse.data.bankIdStatus
                  ?.Response?.Status ===
                  "failed" ||
                statusResponse.data.bankIdStatus
                  ?.Response?.Status ===
                  "cancelled"
              ) {
                setSigningStatus(null);

                toast.error(
                  "Signing failed or was cancelled. Please try again."
                );

                clearPolling();
              } else {
                setSigningStatus("pending");
              }
            } catch (statusError) {
              console.error(
                "Error checking signing status:",
                statusError
              );

              setSigningStatus("pending");
            }
          };

          setSigningStatus("pending");

          clearPolling();

          pollingIntervalRef.current =
            setInterval(
              pollStatus,
              3000
            ) as unknown as number;
        }
      } else {
        toast.error(
          response.data.message ||
            "Failed to send email"
        );
      }
    } catch (error) {
      console.error(
        "Error sending email:",
        error
      );

      toast.error(
        "Failed to send email. Please try again."
      );
    } finally {
      setIsSigning(false);
    }
  };

  // ============================================================
  // LOADING SCREEN
  // ============================================================
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 font-plus-jakarta dark:bg-[#070d19]">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-[#0b1120]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>

          <h2 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
            Loading Agreement
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Please wait while we securely load your agreement.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR SCREEN
  // ============================================================
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 font-plus-jakarta dark:bg-[#070d19]">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8 dark:border-slate-800 dark:bg-[#0b1120]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            Unable to Load Agreement
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {error}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition-all hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // EMPTY STATE
  // ============================================================
  if (!agreementData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 font-plus-jakarta dark:bg-[#070d19]">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8 dark:border-slate-800 dark:bg-[#0b1120]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <FileCheck2 className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            No Agreement Found
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            The requested agreement could not be loaded.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition-all hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isDisabled =
    !(termsChecked && gdprChecked);

  const vehicleNumber =
    agreementData?.dataValues?.registrationNumber ||
    agreementData?.registrationNumber ||
    "N/A";

  const agreementType =
    agreementData?.dataValues?.type ||
    agreementData?.type ||
    "Agreement";

  return (
    <div className="min-h-screen bg-slate-50 font-plus-jakarta text-slate-900 dark:bg-[#070d19] dark:text-white">
      {/* ========================================================
          TOP HEADER
      ======================================================== */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-[#0b1120]/95">
        <div className="mx-auto flex min-h-[72px] w-full max-w-[1600px] items-center justify-between gap-3 px-3 sm:px-5 lg:px-8">
          {/* Brand */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-sm shadow-blue-600/20">
              <Shield className="h-5 w-5 text-white" />
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                DealerPro
              </p>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Secure Agreement Signing
              </p>
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>

            {!isPublicAccess && (
              <button
                type="button"
                onClick={handleGeneratePublicLink}
                disabled={isGeneratingPublicLink}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 text-xs font-semibold text-blue-700 transition-all hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
              >
                {isGeneratingPublicLink ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Link className="h-4 w-4" />
                )}

                {isGeneratingPublicLink
                  ? "Generating..."
                  : "Copy Public Link"}
              </button>
            )}
          </div>

          {/* Vehicle + secure status */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 sm:block dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Vehicle
              </p>

              <p className="mt-0.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                {vehicleNumber}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />

              <span className="hidden text-[11px] font-bold text-emerald-700 sm:inline dark:text-emerald-400">
                Secure
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          PAGE
      ======================================================== */}
      <main className="mx-auto w-full max-w-[1600px] px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
        {/* Mobile actions */}
        <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:hidden">
          <button
            type="button"
            onClick={handleDownload}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-[#0b1120] dark:text-slate-300"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>

          {!isPublicAccess && (
            <button
              type="button"
              onClick={handleGeneratePublicLink}
              disabled={isGeneratingPublicLink}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400"
            >
              {isGeneratingPublicLink ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Link className="h-4 w-4" />
              )}

              {isGeneratingPublicLink
                ? "Generating..."
                : "Copy Public Link"}
            </button>
          )}
        </div>

        {/* ======================================================
            PUBLIC LINK EXPIRY
        ====================================================== */}
        {isPublicAccess &&
          expiryTime &&
          !isLinkExpired && (
            <div className="mb-5 overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 dark:border-amber-500/20 dark:from-amber-500/10 dark:to-yellow-500/5">
              <div className="flex items-start gap-3 p-4 sm:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                  <Clock3 className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300">
                      Temporary Signing Link
                    </h3>

                    <span className="w-fit rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                      Expires soon
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-amber-800/80 dark:text-amber-300/70">
                    This secure signing link expires on{" "}
                    {new Date(
                      parseInt(expiryTime) * 1000
                    ).toLocaleString()}.
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-xs font-bold text-amber-800 dark:bg-slate-900/50 dark:text-amber-300">
                    <Clock3 className="h-3.5 w-3.5" />
                    {remainingTimeText ||
                      formatRemainingTime(expiryTime)}
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* ======================================================
            AGREEMENT CARD
        ====================================================== */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1120]">
          {/* Section heading */}
          <div className="border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5 dark:border-slate-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <FileCheck2 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                    Agreement Preview
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {agreementType} · Contract #{agreementData.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
                <LockKeyhole className="h-4 w-4 text-slate-500 dark:text-slate-400" />

                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  Secure Document
                </span>
              </div>
            </div>
          </div>

          {/* ====================================================
              PDF / AGREEMENT PREVIEW
          ==================================================== */}
          <div className="bg-slate-100/70 p-2 sm:p-4 lg:p-6 dark:bg-[#070d19]">
            <div
              ref={pdfRef}
              className="mx-auto w-full max-w-[800px] overflow-hidden bg-white p-4 shadow-sm sm:p-6 md:p-8"
            >
              {/* PDF Header */}
              <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
                <div className="max-w-[180px]">
                  <img
                    src={pdfLogo}
                    alt="DealerPro"
                    className="max-h-14 w-auto object-contain"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:items-end">
                  <p className="text-sm font-semibold text-slate-900">
                    {agreementType}
                  </p>

                  <p className="text-xs text-slate-500">
                    Contract No. {agreementData.id}
                  </p>

                  <p className="text-xs text-slate-500">
                    Vehicle: {vehicleNumber}
                  </p>
                </div>
              </div>

              {/* ==================================================
                  CUSTOMER / SELLER
              ================================================== */}
              {(agreementData?.dataValues?.type ||
                agreementData?.type) ===
              "Sales Agreement" ? (
                <>
                  <div className="mt-5 overflow-x-auto">
                    <p className="mb-2 text-sm font-semibold text-slate-800">
                      Seller
                    </p>

                    <AuthUserInfo
                      agreementData={agreementData}
                      user={user}
                    />
                  </div>

                  <div className="mt-5 overflow-x-auto">
                    <p className="mb-2 text-sm font-semibold text-slate-800">
                      Buyer
                    </p>

                    <CustomerInfo
                      agreementData={agreementData}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-5 overflow-x-auto">
                    <p className="mb-2 text-sm font-semibold text-slate-800">
                      Buyer
                    </p>

                    <AuthUserInfo
                      agreementData={agreementData}
                      user={user}
                    />
                  </div>

                  <div className="mt-5 overflow-x-auto">
                    <p className="mb-2 text-sm font-semibold text-slate-800">
                      Seller
                    </p>

                    <CustomerInfo
                      agreementData={agreementData}
                    />
                  </div>
                </>
              )}

              {/* Vehicle */}
              <div className="mt-5 overflow-x-auto">
                <Fordon
                  agreementData={agreementData}
                />
              </div>

              {/* Delivery */}
              {(agreementData?.dataValues?.type ||
                agreementData?.type) ===
                "Sales Agreement" && (
                <div className="mt-5 overflow-x-auto">
                  <Leveransvilkor
                    agreementData={agreementData}
                  />
                </div>
              )}

              {/* Price */}
              <div className="mt-5 overflow-x-auto">
                <Pris
                  agreementData={agreementData}
                />
              </div>

              {/* Signatures */}
              <div className="mt-7">
                <p className="text-sm font-semibold text-slate-900">
                  Signatures
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Place and time
                </p>
              </div>

              <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
                <div className="border-t border-slate-300 pt-2">
                  <p className="text-xs text-slate-600">
                    Seller's signature and name
                  </p>
                </div>

                <div className="border-t border-slate-300 pt-2">
                  <p className="text-xs text-slate-600">
                    Buyer's signature
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================
              QR CODE
          ==================================================== */}
          {showQR && (
            <div className="border-t border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-slate-700 dark:bg-[#0b1120]">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Signature className="h-5 w-5" />
                </div>

                <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                  Scan with BankID
                </h3>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Scan this QR code with your BankID app to continue.
                </p>

                <div className="mt-4 flex justify-center">
                  <img
                    src={showQR}
                    alt="BankID QR Code"
                    className="h-52 w-52 rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              SIGNING AREA
          ==================================================== */}
          <div className="border-t border-slate-200 p-4 sm:p-6 dark:border-slate-800">
            <AgreementInformation
              setSelect1={setSelect1}
              setSelect2={setSelect2}
              agreementData={{
                ...agreementData,

                type:
                  agreementData?.dataValues?.type ||
                  agreementData?.type ||
                  "N/A",

                dataValues: {
                  ...agreementData?.dataValues,

                  type:
                    agreementData?.dataValues?.type ||
                    agreementData?.type ||
                    "N/A",
                },
              }}
              user={user}
              publicAccess={isPublicAccess}
              Loader2={Loader2}
              Shield={Shield}
              Signature={Signature}
              approved={signingStatus}
              handleBankSign={handleBankSign}
              handleVerifyWithEmail={
                handleVerifyWithEmail
              }
              handleVerifyWithPhone={
                handleVerifyWithPhone
              }
              select1={select1}
              select2={select2}
              isSigning={isSigning}
            />

            {/* ==================================================
                TERMS
            ================================================== */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Shield className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Terms & Conditions
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Please confirm both items before signing.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:bg-white dark:hover:bg-slate-800">
                  <input
                    type="checkbox"
                    checked={termsChecked}
                    onChange={(e) =>
                      setTermsChecked(
                        e.target.checked
                      )
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900"
                  />

                  <span className="text-xs leading-5 text-slate-600 sm:text-sm dark:text-slate-300">
                    I have read and accept the{" "}
                    <a
                      href="#"
                      className="font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400"
                    >
                      general terms and conditions
                    </a>{" "}
                    for digital signing.
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:bg-white dark:hover:bg-slate-800">
                  <input
                    type="checkbox"
                    checked={gdprChecked}
                    onChange={(e) =>
                      setGdprChecked(
                        e.target.checked
                      )
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-900"
                  />

                  <span className="text-xs leading-5 text-slate-600 sm:text-sm dark:text-slate-300">
                    I consent to the{" "}
                    <a
                      href="#"
                      className="font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400"
                    >
                      processing of personal data
                    </a>{" "}
                    according to GDPR.
                  </span>
                </label>
              </div>
            </div>

            {/* ==================================================
                SIGNING STATUS
            ================================================== */}
            {signingStatus && (
              <div
                className={`mt-5 overflow-hidden rounded-2xl border ${
                  signingStatus === "approved"
                    ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                    : "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10"
                }`}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        signingStatus === "approved"
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                      }`}
                    >
                      {signingStatus ===
                      "approved" ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )}
                    </div>

                    <div>
                      <h4
                        className={`text-sm font-bold ${
                          signingStatus ===
                          "approved"
                            ? "text-emerald-800 dark:text-emerald-300"
                            : "text-amber-800 dark:text-amber-300"
                        }`}
                      >
                        {signingStatus ===
                        "approved"
                          ? "Signing Approved"
                          : "Waiting for Signature"}
                      </h4>

                      <p
                        className={`mt-0.5 text-xs ${
                          signingStatus ===
                          "approved"
                            ? "text-emerald-700/80 dark:text-emerald-300/70"
                            : "text-amber-700/80 dark:text-amber-300/70"
                        }`}
                      >
                        {signingStatus ===
                        "approved"
                          ? "The agreement has been successfully signed."
                          : "Complete the signing process in your BankID app."}
                      </p>
                    </div>
                  </div>

                  {signingStatus ===
                    "pending" && (
                    <div className="mt-4 border-t border-amber-200 pt-4 dark:border-amber-500/20">
                      <p className="text-xs text-amber-700 dark:text-amber-300">
                        Automatically checking signing status every 3 seconds...
                      </p>

                      <button
                        type="button"
                        onClick={cancelSigning}
                        className="mt-3 inline-flex min-h-[38px] items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                      >
                        Cancel Signing
                      </button>
                    </div>
                  )}

                  {signingStatus ===
                    "approved" && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/agreements")
                      }
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 underline underline-offset-2 hover:text-emerald-800 dark:text-emerald-400"
                    >
                      View signed agreement
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ==================================================
                FOOTER ACTIONS
            ================================================== */}
            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={
                  isDisabled || isSigning
                }
                onClick={() => navigate(-1)}
                className={`flex min-h-[46px] items-center justify-center rounded-xl border px-6 text-sm font-semibold transition-all ${
                  isDisabled || isSigning
                    ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                Close
              </button>

              {/* Existing signing controls are intentionally handled
                  by AgreementInformation above. */}
            </div>

            {/* ==================================================
                SECURITY INFO
            ================================================== */}
            <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-500/20 dark:bg-blue-500/10 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <LockKeyhole className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300">
                    {isPublicAccess
                      ? "Secure Public Signing"
                      : "Secure BankID & E-Signature"}
                  </h4>

                  <p className="mt-1 text-xs leading-5 text-blue-800/80 dark:text-blue-300/70">
                    {isPublicAccess
                      ? "Your signature is handled securely. After signing, you will receive a verification certificate that can be downloaded."
                      : "Your signature is handled securely and complies with applicable Swedish digital-signing standards."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgreementSign;