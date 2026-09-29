import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  X,
  UploadCloud,
  File as FileIcon,
  FileText,
  ShieldCheck,
} from "lucide-react";

interface AddNewDocumentProps {
  onClose: () => void;
  onUpload: (file: File, type: string) => void;
}

const AddNewDocument = ({
  onClose,
  onUpload,
}: AddNewDocumentProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  const handleUpload = () => {
    if (file && type.trim()) {
      onUpload(file, type.trim());
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[999]
        flex items-center justify-center
        bg-black/50 px-3 py-4
        backdrop-blur-sm
        font-plus-jakarta
        sm:px-5
      "
    >
      <div
        className="
          relative flex max-h-[95vh] w-full max-w-[560px]
          flex-col overflow-hidden
          rounded-2xl border border-slate-200
          bg-white shadow-2xl
          animate-[modalIn_.25s_ease-out]
          dark:border-slate-800
          dark:bg-[#0b1120]
        "
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            border-b border-slate-200
            px-5 py-4
            sm:px-6 sm:py-5
            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-xl bg-blue-50
                text-blue-600
                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              <FileText className="h-5 w-5" />
            </div>

            <div>
              <h2
                className="
                  text-[17px] font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                Upload Document
              </h2>

              <p
                className="
                  mt-0.5 text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Add a new document to your records
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-lg
              text-slate-400
              transition-all duration-200
              hover:bg-slate-100
              hover:text-slate-700
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {/* Document Type */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />

              <div>
                <label
                  htmlFor="doc-type"
                  className="
                    block text-sm font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Document Type
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <p
                  className="
                    mt-0.5 text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Specify what type of document you are uploading
                </p>
              </div>
            </div>

            <input
              id="doc-type"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g. Insurance, Registration, Inspection..."
              className="
                w-full rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm text-slate-800
                outline-none
                transition-all duration-200
                placeholder:text-slate-400
                focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/10
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-200
                dark:placeholder:text-slate-600
              "
            />
          </div>

          {/* Upload Area */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <UploadCloud className="h-4 w-4 text-blue-500" />

              <div>
                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Document File
                  <span className="ml-1 text-red-500">*</span>
                </h3>

                <p
                  className="
                    mt-0.5 text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Upload your document securely
                </p>
              </div>
            </div>

            <div
              {...getRootProps()}
              className={`
                group relative cursor-pointer
                overflow-hidden rounded-2xl
                border-2 border-dashed
                p-7 text-center
                transition-all duration-200
                sm:p-10
                ${
                  isDragActive
                    ? `
                      border-blue-500
                      bg-blue-50
                      dark:border-blue-400
                      dark:bg-blue-500/10
                    `
                    : `
                      border-slate-200
                      bg-slate-50/70
                      hover:border-blue-400
                      hover:bg-blue-50/50
                      dark:border-slate-700
                      dark:bg-slate-900/60
                      dark:hover:border-blue-500
                      dark:hover:bg-blue-500/5
                    `
                }
              `}
            >
              <input {...getInputProps()} />

              <div className="flex flex-col items-center justify-center">
                <div
                  className="
                    mb-4 flex h-16 w-16 items-center justify-center
                    rounded-2xl
                    bg-blue-100
                    text-blue-600
                    transition-transform duration-200
                    group-hover:scale-105
                    dark:bg-blue-500/10
                    dark:text-blue-400
                  "
                >
                  <UploadCloud className="h-7 w-7" />
                </div>

                <p
                  className="
                    text-sm font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  {isDragActive
                    ? "Drop your file here"
                    : "Drag & drop your file here"}
                </p>

                <p
                  className="
                    mt-1 text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  or click to browse from your device
                </p>

                <div
                  className="
                    mt-4 rounded-lg
                    bg-white px-3 py-1.5
                    text-[11px] font-medium
                    text-slate-500
                    shadow-sm
                    ring-1 ring-slate-200
                    dark:bg-slate-800
                    dark:text-slate-400
                    dark:ring-slate-700
                  "
                >
                  PDF · JPG · PNG · GIF · DOC · DOCX
                </div>
              </div>
            </div>
          </div>

          {/* Selected File */}
          {file && (
            <div
              className="
                mt-5 flex items-center gap-3
                rounded-xl
                border border-blue-100
                bg-blue-50/70
                p-3.5
                dark:border-blue-500/20
                dark:bg-blue-500/5
              "
            >
              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-white
                  text-blue-600
                  shadow-sm
                  dark:bg-slate-800
                  dark:text-blue-400
                "
              >
                <FileIcon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    truncate text-sm font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  {file.name}
                </p>

                <p
                  className="
                    mt-0.5 text-[11px]
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {(file.size / 1024 / 1024).toFixed(2)} MB · Ready
                  to upload
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                aria-label="Remove selected file"
                className="
                  flex h-8 w-8 shrink-0
                  items-center justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-red-50
                  hover:text-red-500
                  dark:hover:bg-red-500/10
                  dark:hover:text-red-400
                "
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Security Info */}
          <div
            className="
              mt-5 flex items-start gap-3
              rounded-xl
              border border-slate-200
              bg-slate-50/70
              p-3.5
              dark:border-slate-800
              dark:bg-slate-900/60
            "
          >
            <ShieldCheck
              className="
                mt-0.5 h-4 w-4 shrink-0
                text-emerald-500
              "
            />

            <div>
              <p
                className="
                  text-xs font-semibold
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Secure document upload
              </p>

              <p
                className="
                  mt-0.5 text-[11px] leading-5
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Your document will be securely uploaded and stored
                in your cloud storage.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            border-t border-slate-200
            bg-white/95
            px-5 py-4
            backdrop-blur
            sm:px-6 sm:py-5
            dark:border-slate-800
            dark:bg-[#0b1120]/95
          "
        >
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              className="
                w-full rounded-xl
                border border-slate-200
                bg-white
                px-5 py-3
                text-sm font-semibold
                text-slate-700
                transition-all duration-200
                hover:bg-slate-50
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-200
                dark:hover:bg-slate-800
                sm:w-auto
              "
            >
              Cancel
            </button>

            <button
              onClick={handleUpload}
              disabled={!file || !type.trim()}
              className="
                w-full rounded-xl
                bg-blue-600
                px-5 py-3
                text-sm font-semibold text-white
                shadow-lg shadow-blue-600/20
                transition-all duration-200
                hover:bg-blue-700
                hover:shadow-blue-600/30
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:shadow-none
                sm:w-auto
              "
            >
              Upload Document
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default AddNewDocument;