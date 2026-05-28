'use client'

import { useState, ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { EventPlan, PLAN_PRICES, planSatisfies } from '@/lib/dummy-data'
import Button from './Button'
import Modal from './Modal'
import { toast } from 'sonner'

interface PlanGateProps {
  requiredPlan: EventPlan
  currentPlan: EventPlan
  children: ReactNode
  featureName?: string
}

export default function PlanGate({ requiredPlan, currentPlan, children, featureName }: PlanGateProps) {
  const [upgradeOpen, setUpgradeOpen] = useState(false)

  if (planSatisfies(currentPlan, requiredPlan)) {
    return <>{children}</>
  }

  const planLabel = requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)

  return (
    <>
      <div className="relative">
        <div className="pointer-events-none select-none blur-sm opacity-60">
          {children}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface/80 rounded-xl">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-light">
            <Lock className="w-5 h-5 text-accent" />
          </div>
          <p className="text-sm font-medium text-ink text-center px-4">
            {featureName ? `${featureName} requires` : 'Requires'} the {planLabel} plan
          </p>
          <Button size="sm" onClick={() => setUpgradeOpen(true)}>
            Upgrade Now
          </Button>
        </div>
      </div>

      <Modal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        title="Upgrade Your Plan"
      >
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            {featureName || 'This feature'} is available on the{' '}
            <span className="font-semibold text-ink">{planLabel}</span> plan.
          </p>
          <div className="rounded-xl border border-accent bg-accent-light p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-ink">{planLabel} Plan</p>
              <p className="text-sm text-ink-muted">One-time payment per event</p>
            </div>
            <span className="text-2xl font-bold text-accent font-mono">{PLAN_PRICES[requiredPlan]}</span>
          </div>
          <Button
            className="w-full"
            onClick={() => {
              toast.info('Payment integration coming soon!')
              setUpgradeOpen(false)
            }}
          >
            Upgrade to {planLabel}
          </Button>
        </div>
      </Modal>
    </>
  )
}
