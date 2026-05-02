'use client';
// NOTE: Export this as: components/freelancex/WorkReviewPanel.tsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, CheckCircle, RefreshCw, Star, DollarSign,
  ExternalLink, Loader2, AlertCircle, Github, Mail,
  Info, Clock, User, ExternalLink as Link2,
} from 'lucide-react';

const API_BASE3 = process.env.NEXT_PUBLIC_API_URL || 'https://clc-products-real-backend.vercel.app';

interface WorkReviewPanelProps {
  gigId: string;
  gigTitle: string;
  gigStatus: string;
  budgetAmount: number | null;
  hiredFreelancerName: string;
  clientEmail?: string;
  onRefresh: () => void;
}

function StarRating({ value, hover, onHover, onClick }: { value: number; hover: number; onHover: (v: number) => void; onClick: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <motion.button key={i}
          onMouseEnter={() => onHover(i)}
          onMouseLeave={() => onHover(0)}
          onClick={() => onClick(i)}
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
          className="focus:outline-none">
          <Star className={`w-7 h-7 transition-all ${i <= (hover || value) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
        </motion.button>
      ))}
      {value > 0 && <span className="text-xs text-amber-400 font-semibold ml-1">{value}/5</span>}
    </div>
  );
}

export function WorkReviewPanel({ gigId, gigTitle, gigStatus, budgetAmount, hiredFreelancerName, clientEmail, onRefresh }: WorkReviewPanelProps) {
  const [submission, setSubmission] = useState<any>(null);
  const [payment, setPayment] = useState<any>(null);
  const [review, setReview] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);

  const [revisionNote, setRevisionNote] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const [reviewAction, setReviewAction] = useState<'approve' | 'revision' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (gigStatus !== 'IN_PROGRESS' && gigStatus !== 'COMPLETED') { setLoadingData(false); return; }
    const load = async () => {
      setLoadingData(true);
      try {
        const [subRes, payRes, revRes] = await Promise.all([
          fetch(`${API_BASE3}/api/freelancex/gigs/${gigId}/work-submission`, { credentials: 'include' }),
          fetch(`${API_BASE3}/api/freelancex/gigs/${gigId}/payment`, { credentials: 'include' }),
          fetch(`${API_BASE3}/api/freelancex/gigs/${gigId}/review`),
        ]);
        if (subRes.ok) setSubmission(await subRes.json());
        if (payRes.ok) { const d = await payRes.json(); if (d) setPayment(d); }
        if (revRes.ok) { const d = await revRes.json(); if (d) setReview(d); }
      } catch {}
      finally { setLoadingData(false); }
    };
    load();
  }, [gigId, gigStatus]);

  const handleWorkReview = async (action: 'approve' | 'request_revision') => {
    if (action === 'request_revision' && !revisionNote.trim()) {
      setError('Please describe what needs to change before sending the revision request.');
      return;
    }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE3}/api/freelancex/gigs/${gigId}/work-submission/review`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action, revisionNote: revisionNote || undefined }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Action failed');
      const d = await res.json();
      setSuccess(d.action === 'approved'
        ? '🎉 Work approved! Please proceed with payment as instructed below.'
        : '🔄 Revision request sent to the freelancer.');
      setReviewAction(null);
      setRevisionNote('');
      onRefresh();
      // Reload data
      setTimeout(() => {
        Promise.all([
          fetch(`${API_BASE3}/api/freelancex/gigs/${gigId}/payment`, { credentials: 'include' }).then(r => r.ok ? r.json() : null).then(d => { if (d) setPayment(d); }),
          fetch(`${API_BASE3}/api/freelancex/gigs/${gigId}/work-submission`, { credentials: 'include' }).then(r => r.ok ? r.json() : null).then(d => { if (d) setSubmission(d); }),
        ]);
      }, 500);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleReview = async () => {
    if (!rating) { setError('Please select a rating before submitting.'); return; }
    if (!comment.trim()) { setError('Please write a comment about your experience.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE3}/api/freelancex/gigs/${gigId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ rating, comment: comment || null }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Review failed');
      setReview(await res.json());
      setSuccess('⭐ Review submitted successfully!');
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  if (loadingData) return (
    <div className="flex items-center gap-2 text-xs text-slate-600 py-3">
      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading work details…
    </div>
  );
  if (gigStatus !== 'IN_PROGRESS' && gigStatus !== 'COMPLETED') return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Package className="w-4 h-4 text-slate-500" />
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Work & Payment</p>
      </div>

      {/* Freelancer identity — prominently shown */}
      {hiredFreelancerName && (
        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-indigo-500/[0.07] border border-indigo-500/20 rounded-xl">
          <User className="w-4 h-4 text-indigo-400 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-white">{hiredFreelancerName}</p>
            <p className="text-[10px] text-indigo-400/70">Hired Freelancer</p>
          </div>
          {budgetAmount && (
            <div className="ml-auto text-right">
              <p className="text-xs font-bold text-emerald-400">${budgetAmount}</p>
              <p className="text-[10px] text-slate-600">Project Budget</p>
            </div>
          )}
        </div>
      )}


      {/* Work submission */}
      {!submission ? (
        <div className="text-center py-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
          <Clock className="w-6 h-6 text-slate-700 mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-medium">Awaiting work submission</p>
          <p className="text-[11px] text-slate-700 mt-0.5">
            {hiredFreelancerName || 'The freelancer'} will submit their work here.
          </p>
        </div>
      ) : (
        <div className="bg-white/[0.02] border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.05] flex items-center justify-between">
            <p className="text-xs font-semibold text-white">Submitted Work</p>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              submission.status === 'APPROVED'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : submission.status === 'REVISION_REQUESTED'
                ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                : 'bg-sky-500/10 border-sky-500/20 text-sky-400'
            }`}>{submission.status.replace('_', ' ')}</span>
          </div>

          <div className="p-4 space-y-3">
            {submission.message && (
              <p className="text-xs text-slate-400 leading-relaxed bg-white/[0.02] rounded-lg px-3 py-2.5 border border-white/[0.05]">
                {submission.message}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {submission.liveUrl && (
                <a href={submission.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-all">
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}
              {submission.repoUrl && (
                <a href={submission.repoUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-slate-400 hover:text-white font-medium transition-all">
                  <Github className="w-3.5 h-3.5" /> Repository
                </a>
              )}
            </div>

            {/* Actions — only if not yet approved */}
            {submission.status !== 'APPROVED' && gigStatus === 'IN_PROGRESS' && (
              <div className="pt-3 border-t border-white/[0.05] space-y-3">
                {error && (
                  <div className="flex items-start gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{error}
                  </div>
                )}
                {success && (
                  <div className="flex items-start gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{success}
                  </div>
                )}

                {reviewAction === 'revision' ? (
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Revision Note *</label>
                    <textarea rows={3} placeholder="Describe specifically what needs to change, e.g., 'The login page needs dark mode support and the API response time must be under 300ms'..."
                      value={revisionNote} onChange={e => { setRevisionNote(e.target.value); setError(''); }}
                      className="w-full bg-[#111827] border border-amber-500/25 rounded-xl px-3 py-2.5 text-xs text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-slate-700 resize-none" />
                    <div className="flex gap-2">
                      <button onClick={() => { setReviewAction(null); setRevisionNote(''); setError(''); }}
                        className="flex-1 py-2 rounded-lg border border-white/[0.08] text-xs text-slate-500 hover:text-slate-300 transition-all font-semibold">
                        Cancel
                      </button>
                      <motion.button onClick={() => handleWorkReview('request_revision')} disabled={loading}
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                        className="flex-1 py-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs text-amber-400 font-semibold hover:bg-amber-500/25 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50">
                        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><RefreshCw className="w-3.5 h-3.5" />Send Revision Request</>}
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <motion.button onClick={() => { setReviewAction('revision'); setError(''); setSuccess(''); }}
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      className="flex-1 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-semibold hover:bg-amber-500/20 transition-all flex items-center justify-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5" /> Request Revision
                    </motion.button>
                    <motion.button onClick={() => handleWorkReview('approve')} disabled={loading}
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-xs text-emerald-400 font-semibold hover:bg-emerald-500/25 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50">
                      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><CheckCircle className="w-3.5 h-3.5" />Approve Work</>}
                    </motion.button>
                  </div>
                )}
              </div>
            )}

            {/* Payment instruction after approval */}
            {submission.status === 'APPROVED' && (
              <div className="pt-3 border-t border-white/[0.05]">
                <div className="bg-emerald-500/[0.07] border border-emerald-500/20 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <p className="text-xs font-bold text-emerald-400">Work Approved Successfully!</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3 border border-white/[0.05]">
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      To complete the payment and final delivery, please contact <span className="font-bold text-white">{hiredFreelancerName}</span> directly via email to arrange the transfer of{budgetAmount ? <span className="font-bold text-emerald-400"> ${budgetAmount}</span> : ' the agreed amount'}.
                    </p>
                    {budgetAmount && (
                      <div className="flex items-center gap-2 mt-3 p-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                        <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-500">Send payment confirmation to</p>
                          <a href={`mailto:${hiredFreelancerName}?subject=Payment for ${gigTitle}&body=Hi ${hiredFreelancerName},%0A%0AYour work on "${gigTitle}" has been approved. I will be sending $${budgetAmount} as agreed.%0A%0AThank you!`}
                            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-semibold flex items-center gap-1">
                            Contact Freelancer <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review section */}
      {gigStatus === 'COMPLETED' && !review && (
        <div className="bg-[#0f1629] border border-amber-500/20 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-amber-500/[0.07] border-b border-amber-500/15 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <p className="text-xs font-bold text-amber-300">Leave a Review for {hiredFreelancerName}</p>
          </div>
          <div className="p-4 space-y-3">
            {error && (
              <div className="flex items-start gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{error}
              </div>
            )}
            {success && (
              <div className="flex items-start gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{success}
              </div>
            )}

            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">Rating *</label>
              <StarRating value={rating} hover={hoverRating} onHover={setHoverRating} onClick={v => { setRating(v); setError(''); }} />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Review Comment *</label>
              <textarea rows={3} placeholder="Share your experience. What did they do well? Would you hire them again?"
                value={comment} onChange={e => { setComment(e.target.value); setError(''); }}
                className="w-full bg-[#111827] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 outline-none transition-all placeholder:text-slate-700 resize-none" />
            </div>

            <motion.button onClick={handleReview} disabled={loading || !rating}
              whileHover={!loading && !!rating ? { scale: 1.01 } : {}} whileTap={!loading && !!rating ? { scale: 0.99 } : {}}
              className="w-full py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/25 text-xs text-amber-400 font-semibold hover:bg-amber-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-40">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Star className="w-4 h-4" />Submit Review</>}
            </motion.button>
          </div>
        </div>
      )}

      {review && (
        <div className="bg-amber-500/[0.06] border border-amber-500/20 rounded-xl p-3 flex items-start gap-2.5">
          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-400">Review Submitted</p>
            <div className="flex items-center gap-1.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
              ))}
              <span className="text-[10px] text-slate-500">{review.rating}/5</span>
            </div>
            {review.comment && <p className="text-[11px] text-slate-500 mt-1 italic">"{review.comment}"</p>}
          </div>
        </div>
      )}
    </div>
  );
}