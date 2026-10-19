import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Check, 
  Copy, 
  ExternalLink, 
  Cloud, 
  UploadCloud, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  HardDrive
} from 'lucide-react';
import { convertGoogleDriveUrl } from '../utils/pdfStorage';

interface PdfGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocalPdf?: (file: File) => void;
}

export const PdfGuideModal: React.FC<PdfGuideModalProps> = ({ isOpen, onClose, onSelectLocalPdf }) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [testDriveUrl, setTestDriveUrl] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onSelectLocalPdf) {
      onSelectLocalPdf(file);
      onClose();
    }
  };

  const handleTestLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testDriveUrl.trim()) return;

    const converted = convertGoogleDriveUrl(testDriveUrl);
    setTestResult(converted);
  };

  const codeSnippet = `// In src/data/chapters.ts:
export const PHYSICS_CHAPTERS: Chapter[] = [
  {
    id: 'phy-1',
    title: 'Electric Charges & Fields',
    // 1. Either put file in public folder:
    pdfUrl: '/notes/physics-ch1-electric-charges.pdf', 
    // 2. Or paste your public Google Drive link (ending with /preview):
    // pdfUrl: 'https://drive.google.com/file/d/YOUR_FILE_ID/preview',
    ...
  }
];`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Author Notes Upload Guide</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            How to Upload Notes Without Any Google Permission Errors
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Follow these simple steps to ensure your notes PDF opens instantly in the app reader with <strong>zero Google Drive permission blocks</strong> or <strong>"Refused to Connect"</strong> errors.
          </p>
        </div>

        {/* Option A: Direct Device Upload (Easiest - 100% No Google Errors) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-slate-950 to-slate-950 border border-emerald-500/30 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Option 1 (Easiest &amp; Instant): Upload from Your Device</span>
              </span>
              <p className="text-xs text-slate-300">
                Directly select your notes PDF from your phone or laptop. It saves permanently in your browser (IndexedDB) with <strong>no Google login</strong>, <strong>no server</strong>, and <strong>no permission errors</strong>!
              </p>
            </div>
            <label className="shrink-0 px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer transition shadow-md flex items-center gap-2">
              <UploadCloud className="w-4 h-4" />
              <span>Select My Notes PDF</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Option B: Google Drive 3-Step Simple Fix */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
              2
            </div>
            <div>
              <h4 className="font-bold text-white text-base">
                Option 2: Using Google Drive (Fixing Permission in 3 Clicks)
              </h4>
              <p className="text-[11px] text-amber-300">
                Why does Google block it? Because files are private by default, and Google blocks regular links inside web pages.
              </p>
            </div>
          </div>

          {/* Step by Step Visual Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="font-bold text-white flex items-center gap-1 text-xs">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-code">1</span>
                <span>Open Google Drive</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Right-click your PDF file in Google Drive &rarr; click <strong className="text-slate-200">Share</strong>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/25 space-y-1.5">
              <div className="font-bold text-amber-300 flex items-center gap-1 text-xs">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-code font-bold">2</span>
                <span>Set to Anyone with Link</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Under <em>General Access</em>, change <strong>"Restricted"</strong> to <strong>"Anyone with the link"</strong> (Viewer).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="font-bold text-white flex items-center gap-1 text-xs">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-code">3</span>
                <span>Paste Link Here</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Copy the link. Our app automatically converts <code className="text-rose-400">/view</code> to <code className="text-emerald-400">/preview</code>!
              </p>
            </div>
          </div>

          {/* Interactive Link Converter & Tester */}
          <form onSubmit={handleTestLink} className="pt-2 space-y-2">
            <label className="text-[11px] font-bold text-slate-300 block">
              Test &amp; Auto-Fix Your Google Drive Link Right Now:
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Paste your Google Drive link (e.g. https://drive.google.com/file/d/...)"
                value={testDriveUrl}
                onChange={(e) => setTestDriveUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-300 shrink-0 cursor-pointer"
              >
                Auto-Fix Link
              </button>
            </div>

            {testResult && (
              <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/30 text-xs space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Embed Link Generated Successfully!</span>
                </div>
                <div className="font-code text-[11px] text-slate-300 break-all bg-slate-950 p-2 rounded border border-slate-800">
                  {testResult}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(testResult, 'tested-link')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSnippet === 'tested-link' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSnippet === 'tested-link' ? 'Copied' : 'Copy Fixed Link'}</span>
                  </button>
                  <a
                    href={testResult}
                    rel="noreferrer"
                    className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>Test Open in Tab</span> &rarr;
                  </a>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Option C: Put in public/notes/ */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center">
              3
            </div>
            <div>
              <h4 className="font-bold text-white text-base">
                Option 3: Store Inside Project Folder <code className="text-amber-300 text-sm">/public/notes/</code>
              </h4>
              <p className="text-[11px] text-slate-400">
                Permanent web hosting built into the app codebase itself.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Put your PDF files into <code className="text-slate-200">public/notes/</code> (e.g. <strong className="text-white">public/notes/physics-ch1.pdf</strong>).
            Then in <code className="text-amber-300 font-code">src/data/chapters.ts</code>, add <code className="text-emerald-400 font-code">pdfUrl: '/notes/physics-ch1.pdf'</code>. It works 100% offline!
          </p>
          <div className="relative mt-2">
            <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-code text-slate-300 overflow-x-auto">
              {codeSnippet}
            </pre>
            <button
              onClick={() => copyToClipboard(codeSnippet, 'snippet')}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
            >
              {copiedSnippet === 'snippet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet === 'snippet' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold cursor-pointer shadow-md"
          >
            Got it, Let's Read Notes!
          </button>
        </div>

      </div>
    </div>
  );
};
