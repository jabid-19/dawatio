'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'
import type { RSVPFormData, SubEvent } from '@/lib/templates-data'

interface RSVPFormProps {
  subEvents: SubEvent[]
  onSubmit: (data: RSVPFormData) => void
  colors?: {
    input?: string
    inputFocus?: string
    button?: string
    buttonText?: string
    label?: string
    checkboxAccent?: string
    successBg?: string
    successText?: string
  }
  inputStyle?: 'bordered' | 'underline' | 'filled'
  successMessage?: string
}

export default function RSVPForm({
  subEvents,
  onSubmit,
  colors = {},
  inputStyle = 'bordered',
  successMessage = 'Thank you! We look forward to celebrating with you.',
}: RSVPFormProps) {
  const [form, setForm] = useState<RSVPFormData>({
    name: '',
    phone: '',
    attending: true,
    selectedSubEvents: [],
    message: '',
  })
  const [attendingSet, setAttendingSet] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function toggleSubEvent(id: string) {
    setForm((f) => ({
      ...f,
      selectedSubEvents: f.selectedSubEvents.includes(id)
        ? f.selectedSubEvents.filter((s) => s !== id)
        : [...f.selectedSubEvents, id],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!attendingSet) errs.attending = 'Please select your attendance'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    onSubmit(form)
    setSubmitted(true)
    setLoading(false)
  }

  const inputBase =
    inputStyle === 'underline'
      ? 'w-full bg-transparent border-0 border-b-2 border-current/20 focus:border-current/60 outline-none py-2 text-base transition-colors'
      : inputStyle === 'filled'
      ? 'w-full rounded-lg px-4 py-3 text-base outline-none transition-colors'
      : 'w-full rounded-lg border px-4 py-3 text-base outline-none transition-colors'

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-8 text-center"
        style={{ color: colors.successText }}
      >
        <CheckCircle2 className="w-12 h-12" style={{ color: colors.checkboxAccent || colors.button }} />
        <p className="text-lg font-medium">{successMessage}</p>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.form
        key="rsvp-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-5"
      >
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wide opacity-60" style={{ color: colors.label }}>
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: '' })) }}
            className={inputBase}
            style={{ color: colors.label, borderColor: errors.name ? '#ef4444' : undefined }}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wide opacity-60" style={{ color: colors.label }}>
            Phone (optional)
          </label>
          <input
            type="tel"
            placeholder="Your phone number"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputBase}
            style={{ color: colors.label }}
          />
        </div>

        {/* Attending */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wide opacity-60" style={{ color: colors.label }}>
            Will you attend? *
          </label>
          <div className="flex gap-3">
            {[{ val: true, label: 'Yes, I\'ll be there' }, { val: false, label: 'Sorry, can\'t make it' }].map(({ val, label }) => (
              <button
                key={String(val)}
                type="button"
                onClick={() => { setForm((f) => ({ ...f, attending: val })); setAttendingSet(true); setErrors((er) => ({ ...er, attending: '' })) }}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all min-h-[44px]"
                style={{
                  background: attendingSet && form.attending === val ? colors.button : 'transparent',
                  color: attendingSet && form.attending === val ? colors.buttonText : colors.label,
                  borderColor: attendingSet && form.attending === val ? colors.button : 'currentColor',
                  opacity: attendingSet && form.attending !== val ? 0.4 : 1,
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {errors.attending && <p className="text-xs text-red-500">{errors.attending}</p>}
        </div>

        {/* Sub-events (only when attending & multiple sub-events) */}
        {attendingSet && form.attending && subEvents.length > 1 && (
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide opacity-60" style={{ color: colors.label }}>
              Which events will you attend?
            </label>
            <div className="flex flex-col gap-2">
              {subEvents.map((se) => (
                <label key={se.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.selectedSubEvents.includes(se.id)}
                    onChange={() => toggleSubEvent(se.id)}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: colors.checkboxAccent || colors.button }}
                  />
                  <span className="text-sm" style={{ color: colors.label }}>
                    {se.name} — {se.date}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-wide opacity-60" style={{ color: colors.label }}>
            Message (optional)
          </label>
          <textarea
            rows={3}
            placeholder="Leave a kind message…"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className={`${inputBase} resize-none`}
            style={{ color: colors.label }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-base transition-all min-h-[48px] disabled:opacity-60"
          style={{ background: colors.button, color: colors.buttonText }}
        >
          {loading ? 'Sending…' : 'Send RSVP'}
        </button>
      </motion.form>
    </AnimatePresence>
  )
}
