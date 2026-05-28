'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'
import { SubEvent } from '@/lib/dummy-data'
import Button from '@/components/ui/Button'

interface RSVPFormProps {
  subEvents: SubEvent[]
  accentColor?: string
}

export default function RSVPForm({ subEvents, accentColor = '#C9622F' }: RSVPFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    attending: null as boolean | null,
    selectedSubEvents: [] as string[],
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const multiSubEvents = subEvents.length > 1

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
    if (!form.name.trim()) errs.name = 'Please enter your name'
    if (form.attending === null) errs.attending = 'Please select your attendance'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center py-12 gap-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
            className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
          >
            <CheckCircle2 className="w-8 h-8 text-success" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-ink"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {form.attending
              ? `Thank you, ${form.name}! We'll see you there.`
              : `Thank you, ${form.name}. You'll be missed!`}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-sm text-ink-muted"
          >
            Your response has been recorded.
          </motion.p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="rsvp-name" className="text-sm font-medium text-ink">
              Your name <span className="text-danger">*</span>
            </label>
            <input
              id="rsvp-name"
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: '' })) }}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-light focus:outline-none h-11"
              style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
              required
            />
            {errors.name && <p role="alert" className="text-xs text-danger">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="rsvp-phone" className="text-sm font-medium text-ink">Phone (optional)</label>
            <input
              id="rsvp-phone"
              type="tel"
              placeholder="017XX XXXXXX"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-light focus:outline-none h-11"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-ink">
              Will you attend? <span className="text-danger">*</span>
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Yes, I&apos;ll be there!', value: true },
                { label: "Can't make it", value: false },
              ].map(({ label, value }) => (
                <button
                  key={String(value)}
                  type="button"
                  onClick={() => { setForm((f) => ({ ...f, attending: value })); setErrors((er) => ({ ...er, attending: '' })) }}
                  className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                    form.attending === value
                      ? 'border-accent bg-accent text-white'
                      : 'border-border bg-surface text-ink hover:border-ink-muted'
                  }`}
                  dangerouslySetInnerHTML={{ __html: label }}
                />
              ))}
            </div>
            {errors.attending && <p role="alert" className="text-xs text-danger">{errors.attending}</p>}
          </div>

          {multiSubEvents && form.attending && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-ink">Which events will you attend?</p>
              <div className="space-y-2">
                {subEvents.map((se) => (
                  <label
                    key={se.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                      form.selectedSubEvents.includes(se.id)
                        ? 'border-accent bg-accent-light'
                        : 'border-border hover:border-ink-muted'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.selectedSubEvents.includes(se.id)}
                      onChange={() => toggleSubEvent(se.id)}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium text-ink">{se.name}</p>
                      <p className="text-xs text-ink-muted">{se.date} · {se.time} · {se.venue}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="rsvp-msg" className="text-sm font-medium text-ink">Message (optional)</label>
            <textarea
              id="rsvp-msg"
              rows={2}
              placeholder="Leave a warm message..."
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-light focus:outline-none resize-none"
            />
          </div>

          <Button type="submit" className="w-full justify-center" loading={loading} style={{ backgroundColor: accentColor }}>
            Send RSVP
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
