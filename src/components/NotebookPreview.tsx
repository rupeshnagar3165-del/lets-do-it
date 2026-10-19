import React, { useState, useEffect } from 'react';
import { PHYSICS_CHAPTERS, CHEMISTRY_CHAPTERS } from '../data/chapters';
import { Chapter, SubjectType } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Highlighter, 
  ZoomIn, 
  ZoomOut, 
  AlertTriangle, 
  Lightbulb, 
  Download, 
  QrCode, 
  Layers, 
  FileCheck2,
  FileText,
  Upload,
  Link as LinkIcon,
  HelpCircle,
  Eye,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { PdfGuideModal } from './PdfGuideModal';
import { saveChapterPdf, getAllCustomPdfs, convertGoogleDriveUrl } from '../utils/pdfStorage';

interface NotebookPreviewProps {
  onOpenPayment: (chapter?: Chapter) => void;
}

export const NotebookPreview: React.FC<NotebookPreviewProps> = ({ onOpenPayment }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('physics');
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [highlighterColor, setHighlighterColor] = useState<'amber' | 'emerald' | 'cyan'>('amber');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'notebook' | 'pdf'>('notebook');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [customPdfMap, setCustomPdfMap] = useState<Record<string, string>>({});
  const [driveUrlInput, setDriveUrlInput] = useState('');
  const [showDriveInput, setShowDriveInput] = useState(false);

  // Restore previously saved PDFs from IndexedDB on startup
  useEffect(() => {
    getAllCustomPdfs().then((saved) => {
      if (saved && Object.keys(saved).length > 0) {
        setCustomPdfMap((prev) => ({ ...prev, ...saved }));
      }
    });
  }, []);

  const currentChapters = selectedSubject === 'physics' ? PHYSICS_CHAPTERS : CHEMISTRY_CHAPTERS;
  const currentChapter: Chapter = currentChapters[activeChapterIndex] || currentChapters[0];

  const currentChapterPdf = customPdfMap[currentChapter.id] || currentChapter.pdfUrl || currentChapter.samplePreview.pdfUrl;
  const isGoogleDriveEmbed = currentChapterPdf?.includes('drive.google.com');

  const handleNext = () => {
    if (activeChapterIndex < currentChapters.length - 1) {
      setActiveChapterIndex(activeChapterIndex + 1);
    } else {
      setActiveChapterIndex(0);
    }
  };

  const handlePrev = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex(activeChapterIndex - 1);
    } else {
      setActiveChapterIndex(currentChapters.length - 1);
    }
  };

  const getHighlighterClass = () => {
    if (highlighterColor === 'amber') return 'highlight-amber';
    if (highlighterColor === 'emerald') return 'highlight-emerald';
    return 'highlight-cyan';
  };

  const handleLocalPdfSelected = async (file: File) => {
    try {
      // Save permanently into IndexedDB so it stays saved across reloads
      const permanentUrl = await saveChapterPdf(currentChapter.id, file);
      setCustomPdfMap((prev) => ({
        ...prev,
        [currentChapter.id]: permanentUrl,
      }));
    } catch {
      const blobUrl = URL.createObjectURL(file);
      setCustomPdfMap((prev) => ({
        ...prev,
        [currentChapter.id]: blobUrl,
      }));
    }
    setViewMode('pdf');
  };

  const handleDriveUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveUrlInput.trim()) return;

    // Automatically convert any Google Drive share link into an embeddable /preview URL
    const processedUrl = convertGoogleDriveUrl(driveUrlInput);

    setCustomPdfMap((prev) => ({
      ...prev,
      [currentChapter.id]: processedUrl,
    }));
    setDriveUrlInput('');
    setShowDriveInput(false);
    setViewMode('pdf');
  };

  return (
    <section id="notebook-preview" className="py-20 bg-[#070b11] border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Notebook Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Peek Inside the Handwritten Topper Notes
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Real handwritten layout, color-coded derivations, exam trap warnings, and neat CBSE board-standard diagrams. Flip through sample pages below!
          </p>

          {/* Subject Switcher Bar */}
          <div className="mt-6 inline-flex p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              onClick={() => {
                setSelectedSubject('physics');
                setActiveChapterIndex(0);
              }}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                selectedSubject === 'physics'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ Class 12 Physics (14 Chapters)
            </button>
            <button
              onClick={() => {
                setSelectedSubject('chemistry');
                setActiveChapterIndex(0);
              }}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                selectedSubject === 'chemistry'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🧪 Class 12 Chemistry (5 Chapters)
            </button>
          </div>
        </div>

        {/* Notebook Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Chapter Quick Index on the Left */}
          <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Chapter to Inspect
              </span>
              <span className="text-xs font-semibold text-amber-400">
                {currentChapters.length} Chapters
              </span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {currentChapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                    activeChapterIndex === idx
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="space-y-0.5 truncate pr-2">
                    <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                      <span>Chapter {ch.number < 10 ? `0${ch.number}` : ch.number} · {ch.weightage}</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded">₹{ch.price}</span>
                    </div>
                    <div className="text-sm font-bold truncate">
                      {ch.title}
                    </div>
                  </div>
                  <span className="text-xs font-code text-slate-400 shrink-0">
                    {ch.pageCount}p
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Purchase Card for Active Chapter */}
            <div className="pt-3 border-t border-slate-800 bg-amber-500/10 -mx-5 -mb-5 p-5 rounded-b-2xl border-t border-amber-500/20 text-center">
              <p className="text-xs text-amber-200 font-medium">
                Download <strong className="text-white">{currentChapter.title}</strong> notes separately:
              </p>
              <button
                onClick={() => onOpenPayment(currentChapter)}
                className="mt-2.5 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Download This Chapter (₹{currentChapter.price} Only)</span>
              </button>
            </div>
          </div>

          {/* Interactive Spiral Notebook Viewer on the Right */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Toolbar above Notebook */}
            <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/90 px-4 py-3 rounded-2xl border border-slate-800 shadow-md">
              
              {/* Pagination controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Previous Chapter"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-slate-300">
                  Chapter {currentChapter.number} of {currentChapters.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Next Chapter"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* View Mode Switcher: Notebook vs Real PDF Reader */}
              <div className="inline-flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setViewMode('notebook')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'notebook'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Notebook View</span>
                </button>

                <button
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'pdf'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Real PDF Reader</span>
                  {currentChapterPdf && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  )}
                </button>
              </div>

              {/* Add / Link My PDF Creator Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 transition cursor-pointer"
                  title="Click to view instructions on how to add your own notes PDF"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Add / Link My PDF</span>
                </button>

                {viewMode === 'notebook' && (
                  <>
                    {/* Highlighter Selector */}
                    <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-800">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Highlighter className="w-3 h-3" />
                      </span>
                      <button
                        onClick={() => setHighlighterColor('amber')}
                        className={`w-4 h-4 rounded-full bg-amber-400 transition-all ${
                          highlighterColor === 'amber' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                        }`}
                        title="Amber Highlighter"
                      />
                      <button
                        onClick={() => setHighlighterColor('emerald')}
                        className={`w-4 h-4 rounded-full bg-emerald-400 transition-all ${
                          highlighterColor === 'emerald' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                        }`}
                        title="Emerald Highlighter"
                      />
                      <button
                        onClick={() => setHighlighterColor('cyan')}
                        className={`w-4 h-4 rounded-full bg-cyan-400 transition-all ${
                          highlighterColor === 'cyan' ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                        }`}
                        title="Cyan Highlighter"
                      />
                    </div>

                    {/* Zoom Controls */}
                    <div className="hidden sm:flex items-center gap-1.5 text-xs pl-2 border-l border-slate-800">
                      <button
                        onClick={() => setZoomLevel((prev) => Math.max(0.9, prev - 0.1))}
                        className="p-1 rounded bg-slate-800 text-slate-300"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-3 h-3" />
                      </button>
                      <span className="font-code text-slate-400 text-[11px]">{Math.round(zoomLevel * 100)}%</span>
                      <button
                        onClick={() => setZoomLevel((prev) => Math.min(1.2, prev + 0.1))}
                        className="p-1 rounded bg-slate-800 text-slate-300"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Quick URL Input Drawer for Google Drive / Web PDF */}
            {showDriveInput && (
              <form onSubmit={handleDriveUrlSubmit} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex gap-2 animate-fadeIn">
                <input
                  type="url"
                  placeholder="Paste Google Drive preview link or PDF URL (e.g. https://drive.google.com/file/d/.../preview)"
                  value={driveUrlInput}
                  onChange={(e) => setDriveUrlInput(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-300 shrink-0 cursor-pointer"
                >
                  Link to Chapter
                </button>
                <button
                  type="button"
                  onClick={() => setShowDriveInput(false)}
                  className="px-2 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </form>
            )}

            {/* View Mode: REAL PDF READER */}
            {viewMode === 'pdf' ? (
              <div className="rounded-2xl bg-slate-900 border-2 border-slate-800 overflow-hidden shadow-2xl">
                
                {/* PDF Reader Header Bar */}
                <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white">
                      {currentChapter.title} - Notes PDF Reader
                    </span>
                    <span className="text-slate-500 hidden sm:inline">·</span>
                    <span className="text-slate-400 hidden sm:inline">
                      {currentChapter.weightage}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Upload button */}
                    <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs cursor-pointer border border-slate-700">
                      <Upload className="w-3 h-3 text-amber-400" />
                      <span>Upload My PDF</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleLocalPdfSelected(file);
                        }}
                        className="hidden"
                      />
                    </label>

                    {/* Google Drive Link button */}
                    <button
                      onClick={() => setShowDriveInput(!showDriveInput)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs cursor-pointer border border-slate-700"
                    >
                      <LinkIcon className="w-3 h-3 text-cyan-400" />
                      <span>Link Drive URL</span>
                    </button>

                    {currentChapterPdf && (
                      <a
                        href={currentChapterPdf}
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Open</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Google Drive Permission Quick Helper Banner */}
                {isGoogleDriveEmbed && (
                  <div className="px-4 py-2 bg-slate-950 border-b border-amber-500/20 flex items-center justify-between text-[11px] text-amber-200 flex-wrap gap-2">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Google Drive Embed Active: If you see "Access Denied", ensure file sharing in Drive is set to <strong>"Anyone with the link can view"</strong>.</span>
                    </span>
                    <button
                      onClick={() => setIsGuideOpen(true)}
                      className="text-amber-400 underline font-bold hover:text-white cursor-pointer"
                    >
                      View 3-Click Fix Guide
                    </button>
                  </div>
                )}

                {/* PDF Viewer Frame or Placeholder */}
                {currentChapterPdf ? (
                  <div className="relative w-full h-[620px] bg-slate-950">
                    <iframe
                      src={currentChapterPdf}
                      title={`${currentChapter.title} Handwritten PDF`}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                    />
                  </div>
                ) : (
                  /* Placeholder when no custom PDF is linked yet */
                  <div className="p-10 text-center space-y-5 bg-dark-grid min-h-[500px] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-dashed border-amber-400/40 flex items-center justify-center text-amber-400">
                      <FileText className="w-8 h-8" />
                    </div>

                    <div className="max-w-md space-y-1.5">
                      <h4 className="text-xl font-bold text-white">
                        Display Your Own Class 12 Notes PDF Here
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        You can load your real handwritten PDF for <strong className="text-amber-300">{currentChapter.title}</strong> right away to see it embedded inside the reader!
                      </p>
                    </div>

                    {/* Action buttons inside empty viewer */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <label className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/20">
                        <Upload className="w-4 h-4" />
                        <span>Select My Notes PDF from Device</span>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleLocalPdfSelected(file);
                          }}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={() => setShowDriveInput(true)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                      >
                        <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Paste Google Drive PDF Link</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setIsGuideOpen(true)}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1 pt-2 cursor-pointer"
                    >
                      <span>Read Full Guide: How to store PDFs in /public/notes/ permanently</span> &rarr;
                    </button>
                  </div>
                )}

                {/* PDF Viewer Footer */}
                <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    Toppers Club Full 220+ Pages Master Vault • ₹49 Complete Pass
                  </span>
                  <button
                    onClick={() => onOpenPayment(currentChapter.status === 'available' ? currentChapter : undefined)}
                    className="text-amber-300 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Download Full Offline PDF</span> &rarr;
                  </button>
                </div>

              </div>
            ) : (
              /* View Mode: SIMULATED HANDWRITTEN SPIRAL NOTEBOOK */
              <div
                className="relative rounded-2xl bg-[#fbfbf8] text-slate-950 shadow-2xl border-4 border-slate-800 overflow-hidden transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
              >
                {/* Spiral Wire Binding Spine */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-slate-200 border-r border-slate-300 flex flex-col justify-around items-center py-6 z-20">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-4 h-2.5 rounded-full bg-slate-800 border border-slate-400 shadow-inner -ml-1" />
                  ))}
                </div>

                {/* Red Notebook Margin line */}
                <div className="absolute left-14 top-0 bottom-0 w-px bg-rose-400/80 z-10" />

                {/* Ruled Paper Workspace */}
                <div className="pl-18 pr-6 sm:pr-8 py-6 bg-notebook-ruled min-h-[580px] flex flex-col justify-between">
                  
                  {/* Header Information */}
                  <div>
                    <div className="flex items-center justify-between border-b-2 border-slate-300 pb-2 mb-4 flex-wrap gap-2">
                      <div>
                        <span className="font-code text-[11px] font-bold text-amber-700 uppercase tracking-widest">
                          {currentChapter.samplePreview.pageTitle}
                        </span>
                        <h3 className="font-serif-topper text-2xl font-bold text-slate-900 mt-0.5">
                          {currentChapter.title}
                        </h3>
                        <p className="text-xs text-slate-600 font-medium">
                          {currentChapter.tagline}
                        </p>
                      </div>

                      <div className="text-right flex items-center gap-2">
                        <button
                          onClick={() => setViewMode('pdf')}
                          className="text-[11px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded border border-emerald-300 transition flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>PDF Mode</span>
                        </button>
                        <span className="inline-block text-xs font-bold font-code bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300">
                          {currentChapter.weightage}
                        </span>
                      </div>
                    </div>

                    {/* Handwritten Content Block */}
                    <div className="space-y-4 my-4 font-handwriting text-xl text-slate-900 leading-relaxed">
                      {currentChapter.samplePreview.handwrittenNotes.map((note, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="font-sans text-xs text-amber-600 font-bold shrink-0 mt-1.5">➔</span>
                          <p className={idx === 1 ? getHighlighterClass() : ''}>
                            {note}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* SVG Hand-Drawn Styled Diagram / Schematic */}
                    <div className="my-5 p-4 rounded-xl bg-white border border-slate-300/80 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-500">
                          Diagram: {currentChapter.samplePreview.diagramLabel}
                        </span>
                        <span className="text-[10px] font-sans text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          CBSE Verified Ray/Circuit Model
                        </span>
                      </div>

                      {/* Dynamic Diagram Renderer */}
                      <div className="h-32 w-full flex items-center justify-center bg-slate-50/70 rounded-lg border border-dashed border-slate-300 p-2">
                        {currentChapter.samplePreview.diagramType === 'dipole' && (
                          <svg className="w-full h-full max-w-md" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="50" y1="70" x2="250" y2="70" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
                            <circle cx="70" cy="70" r="10" fill="#ef4444" />
                            <text x="66" y="74" fill="#ffffff" fontSize="12" fontWeight="bold">-q</text>
                            <circle cx="230" cy="70" r="10" fill="#10b981" />
                            <text x="225" y="74" fill="#ffffff" fontSize="12" fontWeight="bold">+q</text>
                            <circle cx="150" cy="70" r="3" fill="#0f172a" />
                            <text x="147" y="85" fill="#0f172a" fontSize="10" fontWeight="bold">O</text>
                            <line x1="150" y1="70" x2="150" y2="15" stroke="#f59e0b" strokeWidth="2" />
                            <circle cx="150" cy="20" r="4" fill="#f59e0b" />
                            <text x="156" y="24" fill="#d97706" fontSize="11" fontWeight="bold">P (r)</text>
                            <line x1="150" y1="20" x2="190" y2="35" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                            <line x1="150" y1="20" x2="110" y2="35" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                            <line x1="150" y1="20" x2="90" y2="20" stroke="#d97706" strokeWidth="2.5" />
                            <polygon points="90,17 80,20 90,23" fill="#d97706" />
                            <text x="95" y="14" fill="#b45309" fontSize="10" fontWeight="bold">E_net = 2E cos θ</text>
                          </svg>
                        )}

                        {currentChapter.samplePreview.diagramType === 'lcr' && (
                          <svg className="w-full h-full max-w-md" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="40" y1="50" x2="260" y2="50" stroke="#94a3b8" strokeWidth="1.5" />
                            <line x1="150" y1="10" x2="150" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
                            <line x1="150" y1="50" x2="220" y2="50" stroke="#2563eb" strokeWidth="2.5" />
                            <text x="205" y="44" fill="#1e40af" fontSize="11" fontWeight="bold">VR (I)</text>
                            <line x1="150" y1="50" x2="150" y2="15" stroke="#059669" strokeWidth="2.5" />
                            <text x="156" y="22" fill="#065f46" fontSize="11" fontWeight="bold">VL (+90°)</text>
                            <line x1="150" y1="50" x2="150" y2="85" stroke="#dc2626" strokeWidth="2.5" />
                            <text x="156" y="80" fill="#991b1b" fontSize="11" fontWeight="bold">VC (-90°)</text>
                            <line x1="150" y1="50" x2="210" y2="22" stroke="#d97706" strokeWidth="2.5" strokeDasharray="3 3" />
                            <text x="215" y="20" fill="#b45309" fontSize="11" fontWeight="bold">V = √[VR²+(VL-VC)²]</text>
                          </svg>
                        )}

                        {currentChapter.samplePreview.diagramType === 'sn1_sn2' && (
                          <svg className="w-full h-full max-w-md" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <text x="20" y="54" fill="#0284c7" fontSize="12" fontWeight="bold">Nu⁻</text>
                            <line x1="45" y1="50" x2="90" y2="50" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" />
                            <polygon points="90,47 96,50 90,53" fill="#0284c7" />
                            <circle cx="120" cy="50" r="12" fill="#334155" />
                            <text x="116" y="54" fill="#ffffff" fontSize="12" fontWeight="bold">C</text>
                            <line x1="132" y1="50" x2="175" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                            <text x="180" y="54" fill="#dc2626" fontSize="12" fontWeight="bold">X⁻ (departs)</text>
                            <path d="M 220 30 Q 235 50 220 70" stroke="#d97706" strokeWidth="2" fill="none" />
                            <text x="240" y="54" fill="#b45309" fontSize="11" fontWeight="bold">100% Inversion</text>
                          </svg>
                        )}

                        {(!['dipole', 'lcr', 'sn1_sn2'].includes(currentChapter.samplePreview.diagramType || '')) && (
                          <div className="flex items-center gap-3 text-slate-700 font-sans text-xs">
                            <FileCheck2 className="w-5 h-5 text-emerald-600" />
                            <span>Detailed step-by-step vector derivation proof illustrated in full 220+ pages PDF guide</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Two Warning / Secret Tip Sticky Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      
                      {/* Exam Trap Warning Box */}
                      <div className="p-3 rounded-lg bg-rose-50 border border-rose-300">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wide mb-1 font-sans">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          <span>CBSE Exam Trap (-1 Mark Risk)</span>
                        </div>
                        <p className="text-xs text-rose-950 font-sans font-medium leading-relaxed">
                          {currentChapter.samplePreview.examTrapWarning}
                        </p>
                      </div>

                      {/* Topper Secret Tip */}
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-300">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wide mb-1 font-sans">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          <span>Topper 98.6% Scoring Hack</span>
                        </div>
                        <p className="text-xs text-amber-950 font-sans font-medium leading-relaxed">
                          {currentChapter.samplePreview.topperSecretTip}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Footer Callout */}
                  <div className="pt-4 border-t border-slate-300 flex items-center justify-between text-xs text-slate-600 font-sans flex-wrap gap-2">
                    <span>
                      TOPPERS CLUB Handcrafted Vault • {currentChapter.pageCount} Pages in Full Version
                    </span>
                    <button
                      onClick={() => onOpenPayment(currentChapter)}
                      className="font-bold text-amber-900 hover:text-black flex items-center gap-1 bg-amber-200/80 hover:bg-amber-300 px-3 py-1 rounded-md transition cursor-pointer"
                    >
                      <span>Download {currentChapter.title} (₹{currentChapter.price})</span> &rarr;
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* Interactive Creator / Author Guide Modal */}
            <PdfGuideModal
              isOpen={isGuideOpen}
              onClose={() => setIsGuideOpen(false)}
              onSelectLocalPdf={handleLocalPdfSelected}
            />

          </div>

        </div>

      </div>
    </section>
  );
};
