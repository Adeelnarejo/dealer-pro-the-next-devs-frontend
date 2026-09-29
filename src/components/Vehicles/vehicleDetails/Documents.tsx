import { useState } from "react";
import {
  Eye,
  Download,
  Upload,
  FileText,
  File,
  ExternalLink,
} from "lucide-react";

import type { Vehicle } from "./types";
import AddNewDocument from "../../models/AddNewDocument";

interface Props {
  vehicle: Vehicle;
  onUploadDocument: (file: File, type: string) => void;
}

const Documents = ({ vehicle, onUploadDocument }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const documents = vehicle.documents ?? [];

  const handleUpload = (file: File, type: string) => {
    onUploadDocument(file, type);
    setIsModalOpen(false);
  };

  const getDocumentType = (type?: string) => {
    if (!type) return "FILE";

    return type.length > 6
      ? type.substring(0, 6).toUpperCase()
      : type.toUpperCase();
  };

  return (
    <>
      <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-4 py-4 sm:px-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Title */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <FileText className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
                  Documents
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                  Vehicle documents and uploaded files
                </p>
              </div>
            </div>

            {/* Upload */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] sm:w-auto"
            >
              <Upload className="h-4 w-4" />
              Upload Document
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {documents.length > 0 ? (
            <div className="space-y-3">
              {documents.map((doc) => {
                const documentType = getDocumentType(doc.type);

                return (
                  <div
                    key={doc.id}
                    className="group rounded-xl border border-slate-200 bg-slate-50/60 p-3 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-sm sm:p-4 dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      {/* Document information */}
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          <File className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                            {doc.name || "Untitled Document"}
                          </p>

                          <div className="mt-1 flex items-center gap-2">
                            <span className="inline-flex max-w-[120px] items-center rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              {documentType}
                            </span>

                            <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                              {doc.type || "Unknown type"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 border-t border-slate-200 pt-3 sm:border-0 sm:pt-0 dark:border-slate-800">
                        <button
                          type="button"
                          title="View document"
                          aria-label={`View ${doc.name || "document"}`}
                          className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:flex-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sm:hidden">View</span>
                        </button>

                        <button
                          type="button"
                          title="Download document"
                          aria-label={`Download ${doc.name || "document"}`}
                          className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:flex-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                        >
                          <Download className="h-4 w-4" />
                          <span className="sm:hidden">Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-5 py-10 text-center dark:border-slate-700 dark:bg-slate-950/30">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm dark:bg-slate-900 dark:text-slate-500">
                <FileText className="h-6 w-6" />
              </div>

              <h3 className="text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
                No documents yet
              </h3>

              <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
                Upload registration papers, inspection reports, invoices, or
                other vehicle-related documents.
              </p>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
              >
                <Upload className="h-4 w-4" />
                Upload your first document
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {documents.length > 0 && (
          <div className="border-t border-slate-200 bg-slate-50/70 px-4 py-3 sm:px-6 dark:border-slate-800 dark:bg-slate-950/30">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-blue-500" />

              <span>
                {documents.length}{" "}
                {documents.length === 1 ? "document" : "documents"} available
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Upload Modal */}
      {isModalOpen && (
        <AddNewDocument
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUpload}
        />
      )}
    </>
  );
};

export default Documents;