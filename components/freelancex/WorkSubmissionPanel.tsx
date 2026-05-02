'use client';
// NOTE: Export this as a separate file: components/freelancex/WorkSubmissionPanel.tsx
 
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Link as LinkIcon, FileText, Send, Loader2,
  CheckCircle, AlertCircle, X, RefreshCw,
} from 'lucide-react';
 
const API_BASE2 = process.env.NEXT_PUBLIC_API_URL || 'https://clc-products-real-backend.vercel.app';
 
interface WorkSubmissionPanelProps {
  gigId: string;
  gigTitle: string;
  existingSubmission?: {
    id: string;
    message: string | null;
    liveUrl: string | null;
    repoUrl: string | null;
    status: 'SUBMITTED' | 'REVISION_REQUESTED' | 'APPROVED';
    revisionNote: string | null;
    submittedAt: string;
  } | null;
  onSuccess: () => void;
}
 
export function WorkSubmissionPanel({ gigId, gigTitle, existingSubmission, onSuccess }: WorkSubmissionPanelProps) {
  const [form, setForm] = useState({
    message: existingSubmission?.message || '',
    liveUrl: existingSubmission?.liveUrl || '',
    repoUrl: existingSubmission?.repoUrl || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 
  const statusConfig = {
    SUBMITTED: { label: 'Submitted – Awaiting Review', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    REVISION_REQUESTED: { label: 'Revision Requested', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    APPROVED: { label: 'Work Approved! 🎉', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  };
 
  const handleSubmit = async () => {
    if (!form.message && !form.liveUrl && !form.repoUrl) {
      setError('Provide at least a message, live URL, or repository link.');
      return;
    }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE2}/api/freelancex/gigs/${gigId}/submit-work`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message: form.message || null,
          liveUrl: form.liveUrl || null,
          repoUrl: form.repoUrl || null,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Submission failed');
      onSuccess();
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };
 
  const isApproved = existingSubmission?.status === 'APPROVED';
 
  return (
    <div className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
 
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <Upload className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <p className="text-xs font-black text-white">Submit Your Work</p>
            <p className="text-[10px] text-slate-500 truncate">{gigTitle}</p>
          </div>
        </div>
 
        {/* Status badge */}
        {existingSubmission && (
          <div className={`flex items-start gap-2 p-3 rounded-xl border mb-4 ${statusConfig[existingSubmission.status].bg} ${statusConfig[existingSubmission.status].border}`}>
            {existingSubmission.status === 'APPROVED'
              ? <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${statusConfig[existingSubmission.status].color}`} />
              : <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${statusConfig[existingSubmission.status].color}`} />
            }
            <div>
              <p className={`text-xs font-black ${statusConfig[existingSubmission.status].color}`}>
                {statusConfig[existingSubmission.status].label}
              </p>
              {existingSubmission.status === 'REVISION_REQUESTED' && existingSubmission.revisionNote && (
                <p className="text-[11px] text-amber-300/70 mt-1 italic">"{existingSubmission.revisionNote}"</p>
              )}
              {existingSubmission.status !== 'APPROVED' && (
                <p className="text-[10px] text-slate-600 mt-0.5">
                  Last submitted: {new Date(existingSubmission.submittedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        )}
 
        {!isApproved && (
          <>
            {error && (
              <div className="mb-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />{error}
              </div>
            )}
 
            <div className="space-y-3">
              <div className="space-y-1.5 group">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">
                  Delivery Message
                </label>
                <textarea rows={3} placeholder="Describe what you've built, key decisions, how to run it..."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5 group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Live URL</label>
                  <input type="url" placeholder="https://yourapp.com" value={form.liveUrl}
                    onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700" />
                </div>
                <div className="space-y-1.5 group">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Repo URL</label>
                  <input type="url" placeholder="https://github.com/..." value={form.repoUrl}
                    onChange={e => setForm(f => ({ ...f, repoUrl: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700" />
                </div>
              </div>
            </div>
 
            <motion.button onClick={handleSubmit} disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}} whileTap={!loading ? { scale: 0.99 } : {}}
              className="w-full mt-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-3.5 h-3.5" />{existingSubmission ? 'Resubmit Work' : 'Submit Deliverables'}</>}
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}