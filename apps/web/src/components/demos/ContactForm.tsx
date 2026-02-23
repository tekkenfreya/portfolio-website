'use client';

import { useState } from 'react';
import type { ContactFormOutput, ApiResponse } from '@gowater-portfolio/types';
import { FaCheck } from 'react-icons/fa6';

type Step = 'form' | 'loading' | 'result';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const URGENCY_CONFIG: Record<
  ContactFormOutput['aiAnalysis']['urgency'],
  { label: string; color: string; bg: string; border: string }
> = {
  high: { label: 'High Priority', color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30' },
  medium: { label: 'Medium Priority', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  low: { label: 'Low Priority', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
};

export default function ContactForm() {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [result, setResult] = useState<ContactFormOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof FormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep('loading');
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || undefined,
          message: formData.message.trim(),
        }),
      });

      const data: ApiResponse<ContactFormOutput> = await res.json();

      if (!data.success || !data.data) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        setStep('form');
        return;
      }

      setResult(data.data);
      setStep('result');
    } catch {
      setError('Network error. Please try again.');
      setStep('form');
    }
  }

  function resetForm() {
    setStep('form');
    setResult(null);
    setError(null);
    setFormData({ name: '', email: '', company: '', message: '' });
  }

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 h-10 w-10 animate-spin rounded-full border-2 border-border border-t-accent" />
        <p className="text-text-secondary">Analyzing your message...</p>
        <p className="mt-1 text-sm text-text-muted">The AI is reading between the lines.</p>
      </div>
    );
  }

  if (step === 'result' && result) {
    const urgency = URGENCY_CONFIG[result.aiAnalysis.urgency];

    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 px-5 py-4">
          <FaCheck className="h-5 w-5 shrink-0 text-success" />
          <div>
            <p className="font-semibold text-success">Message received</p>
            <p className="text-sm text-text-secondary">Here&apos;s what the AI understood about your message:</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg-card p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">AI Analysis</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs text-text-muted">Intent detected</p>
              <p className="text-sm font-medium capitalize text-text-primary">{result.aiAnalysis.intent}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-text-muted">Urgency</p>
              <span
                className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${urgency.color} ${urgency.bg} ${urgency.border}`}
              >
                {urgency.label}
              </span>
            </div>
          </div>

          {result.aiAnalysis.topics.length > 0 && (
            <div>
              <p className="mb-2 text-xs text-text-muted">Topics</p>
              <div className="flex flex-wrap gap-2">
                {result.aiAnalysis.topics.map(topic => (
                  <span
                    key={topic}
                    className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-bg-card p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
            Personalized Response
          </p>
          <p className="text-sm leading-relaxed text-text-secondary">{result.personalizedResponse}</p>
        </div>

        <button
          onClick={resetForm}
          className="w-full rounded-lg border border-border px-6 py-3 font-semibold text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-2 block text-sm font-medium text-text-secondary">
            Name <span className="text-danger">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="Your name"
            required
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="cf-email" className="mb-2 block text-sm font-medium text-text-secondary">
            Email <span className="text-danger">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-company" className="mb-2 block text-sm font-medium text-text-secondary">
          Company <span className="text-text-muted">(optional)</span>
        </label>
        <input
          id="cf-company"
          type="text"
          value={formData.company}
          onChange={e => handleChange('company', e.target.value)}
          placeholder="Your company"
          className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-2 block text-sm font-medium text-text-secondary">
          Message <span className="text-danger">*</span>
        </label>
        <textarea
          id="cf-message"
          value={formData.message}
          onChange={e => handleChange('message', e.target.value)}
          placeholder="Tell me about your project or what you're looking to automate..."
          rows={5}
          required
          minLength={20}
          className="w-full resize-none rounded-lg border border-border bg-bg-card px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={!formData.name.trim() || !formData.email.trim() || formData.message.trim().length < 20}
        className="w-full rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send Message
      </button>

      <p className="text-center text-xs text-text-muted">
        Watch the AI analyze your message and generate a personalized response in real time.
      </p>
    </form>
  );
}
