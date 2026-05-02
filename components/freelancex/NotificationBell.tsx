'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  X,
  CheckCheck,
  Loader2,
  FileText,
  Star,
  Rocket,
  XCircle,
  Package,
  CheckCircle,
  Wallet,
  Flag,
} from 'lucide-react';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://clc-products-real-backend.vercel.app';

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  metadata: any;
  isRead: boolean;
  createdAt: string;
}

/* ✅ Clean semantic icon system */
const typeConfig: Record<string, { icon: any; color: string }> = {
  PROPOSAL_SUBMITTED: { icon: FileText, color: 'text-blue-400' },
  PROPOSAL_SHORTLISTED: { icon: Star, color: 'text-amber-400' },
  PROPOSAL_HIRED: { icon: Rocket, color: 'text-emerald-400' },
  PROPOSAL_REJECTED: { icon: XCircle, color: 'text-red-400' },
  WORK_SUBMITTED: { icon: Package, color: 'text-indigo-400' },
  WORK_APPROVED: { icon: CheckCircle, color: 'text-green-400' },
  PAYMENT_RELEASED: { icon: Wallet, color: 'text-emerald-400' },
  GIG_COMPLETED: { icon: Flag, color: 'text-slate-400' },
  REVIEW_RECEIVED: { icon: Star, color: 'text-yellow-400' },
};

const metaLink = (notif: Notification): string | null => {
  const m = notif.metadata || {};
  if (m.gigId && notif.type === 'PROPOSAL_HIRED') return '/freelancex/dashboard/freelancer';
  if (m.gigId && notif.type === 'PAYMENT_RELEASED') return '/freelancex/dashboard/freelancer';
  if (m.gigId && notif.type === 'WORK_SUBMITTED') return '/freelancex/dashboard/client';
  return null;
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const esRef = useRef<EventSource | null>(null);

  /* ── Fetch ── */
  const fetchNotifs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/freelancex/notifications?limit=25`, { credentials: 'include' });
      if (res.ok) {
        const d = await res.json();
        setNotifications(d.notifications);
        setUnread(d.unreadCount);
      }
    } catch {}
    finally { setLoading(false); }
  };

  /* ── SSE ── */
  useEffect(() => {
    esRef.current = new EventSource(`${API_BASE}/api/freelancex/notifications/live`, { withCredentials: true });

    esRef.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'unread_count') {
          setUnread(data.count);
        } else if (data.type === 'notification') {
          setNotifications(prev => [data.notification, ...prev]);
          setUnread(prev => prev + 1);
        }
      } catch {}
    };

    esRef.current.onerror = () => esRef.current?.close();

    return () => esRef.current?.close();
  }, []);

  useEffect(() => {
    if (open) fetchNotifs();
  }, [open]);

  /* ── Outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const markRead = async (id: string) => {
    await fetch(`${API_BASE}/api/freelancex/notifications/${id}/read`, { method: 'PATCH', credentials: 'include' });
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    setUnread(prev => Math.max(0, prev - 1));
  };

  const markAllRead = async () => {
    setMarkingAll(true);
    await fetch(`${API_BASE}/api/freelancex/notifications/read-all`, { method: 'PATCH', credentials: 'include' });
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnread(0);
    setMarkingAll(false);
  };

  const timeAgo = (d: string) => {
    const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
    if (s < 60) return 'now';
    if (s < 3600) return `${Math.floor(s/60)}m`;
    if (s < 86400) return `${Math.floor(s/3600)}h`;
    return `${Math.floor(s/86400)}d`;
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
      >
        <Bell className="w-4 h-4 text-slate-300 stroke-[1.8]" />

        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center"
          >
            {unread > 9 ? '9+' : unread}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-[#0c1120] border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-400 stroke-[1.8]" />
                <span className="text-sm font-semibold text-white">Notifications</span>
                {unread > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[9px] font-medium">
                    {unread} new
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <motion.button
                    onClick={markAllRead}
                    disabled={markingAll}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300 transition font-medium"
                  >
                    {markingAll ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <CheckCheck className="w-3 h-3" />
                    )}
                    All read
                  </motion.button>
                )}
                <button onClick={() => setOpen(false)}>
                  <X className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto">
              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-10">
                  <Bell className="w-6 h-6 text-slate-700 mx-auto mb-2" />
                  <p className="text-xs text-slate-600">No notifications yet.</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const link = metaLink(n);
                  const cfg = typeConfig[n.type] || { icon: Bell, color: 'text-slate-400' };
                  const Icon = cfg.icon;

                  const content = (
                    <div
                      onClick={() => { if (!n.isRead) markRead(n.id); }}
                      className={`flex items-start gap-3 px-4 py-3 border-b border-white/[0.04] cursor-pointer transition
                      hover:bg-white/[0.02]
                      ${!n.isRead ? 'border-l-2 border-indigo-400 bg-white/[0.02]' : ''}`}
                    >
                      <div className={`${cfg.color} mt-0.5`}>
                        <Icon className="w-4 h-4 stroke-[1.8]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <p className={`text-xs font-semibold ${!n.isRead ? 'text-white' : 'text-slate-400'}`}>
                            {n.title}
                          </p>
                          <span className="text-[10px] text-slate-600">
                            {timeAgo(n.createdAt)}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                          {n.body}
                        </p>
                      </div>

                      {!n.isRead && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
                      )}
                    </div>
                  );

                  return link ? (
                    <Link href={'#'} key={n.id}>{content}</Link>
                  ) : (
                    <div key={n.id}>{content}</div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}