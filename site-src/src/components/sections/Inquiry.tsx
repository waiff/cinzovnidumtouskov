import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowRight, CircleAlert, CircleCheck, Copy, Check, Loader2, Mail, MapPin, Phone, RotateCcw, Send } from 'lucide-react'
import { site } from '../../data/site'
import { useExplorer } from '../../context/VariantContext'
import { buildMailto, inquiryBody, inquirySubject, termOptions, validateInquiry, type InquiryData, type InquiryErrors } from '../../lib/mailto'
import { cn } from '../../lib/format'
import { IS_ARTIFACT } from '../../lib/env'
import { Button } from '../ui/Button'
import { FieldWrap, SelectInput, TextArea, TextInput } from '../ui/Field'
import { Reveal } from '../ui/Reveal'

type Status = 'idle' | 'submitting' | 'success'

const empty: Omit<InquiryData, 'variant'> = { company: '', name: '', email: '', phone: '', start: '', term: '', note: '' }

const steps = [
  { title: 'Poptávka', text: 'Pošlete počet osob a termín.' },
  { title: 'Prohlídka', text: 'Domluvíme návštěvu domu.' },
  { title: 'Nastěhování', text: 'Smlouva, předání klíčů a je hotovo.' },
]

export function Inquiry() {
  const { variant, setVariant } = useExplorer()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const data: InquiryData = { ...form, variant }
  const update = (k: keyof typeof empty) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(t)
  }, [copied])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const v = validateInquiry(data)
    setErrors(v)
    if (Object.keys(v).length) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('submitting')
    setTimeout(() => {
      if (!IS_ARTIFACT) window.location.href = buildMailto(site.email, data)
      setStatus('success')
    }, 650)
  }

  const message = `Předmět: ${inquirySubject(data)}\n\n${inquiryBody(data)}`

  const copy = () => {
    const selectText = () => {
      messageRef.current?.focus()
      messageRef.current?.select()
    }
    try {
      navigator.clipboard.writeText(message).then(
        () => setCopied(true),
        () => selectText(),
      )
    } catch {
      selectText()
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length
  const today = new Date().toISOString().slice(0, 10)

  return (
    <section id="poptavka" className="relative scroll-mt-20 border-t border-stone-300/50 bg-white/55 py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <Reveal className="lg:col-span-5">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-brand-900 p-7 text-white shadow-lift sm:p-9">
            <div aria-hidden className="absolute -right-20 -bottom-28 size-80 rounded-full bg-brand-500/35 blur-3xl" />
            <div aria-hidden className="bg-grid absolute inset-0 opacity-25 invert [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div className="relative">
              <p className="text-[13px] font-semibold tracking-wide text-brand-200 uppercase">Poptávka</p>
              <h2 className="mt-3 text-[34px] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-[40px]">
                Domluvme <em className="font-serif font-normal text-brand-200">prohlídku</em>
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-white/70">
                Napište nám počet zaměstnanců a termín nástupu. Pošleme nabídku a ukážeme vám dům osobně.
              </p>

              <a
                href={site.phone.href}
                className="group mt-8 flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 text-ink shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center gap-3.5">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-600 text-white">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">Zavolejte nám</span>
                    <span className="block text-lg font-semibold tracking-tight tabular-nums">{site.phone.display}</span>
                  </span>
                </span>
                <ArrowRight className="size-5 text-brand-600 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <div className="mt-3 grid gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 transition-all duration-200 hover:scale-[1.01] hover:bg-white/10 active:scale-[0.99]"
                >
                  <Mail className="size-4 shrink-0 text-brand-200" />
                  <span className="min-w-0 truncate text-[14.5px]">{site.email}</span>
                </a>
                <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5">
                  <MapPin className="size-4 shrink-0 text-brand-200" />
                  <span className="text-[14.5px]">
                    {site.address.street}, {site.address.city}
                  </span>
                </div>
              </div>
            </div>

            <ol className="relative mt-10 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-3 lg:mt-auto">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="font-serif text-2xl text-brand-200 italic">0{i + 1}</span>
                  <p className="mt-1 text-sm font-semibold">{s.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/60">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={100}>
          <div className="h-full rounded-[28px] border border-stone-300/60 bg-white p-6 shadow-soft sm:p-9">
            {status === 'success' ? (
              <div className="flex h-full min-h-[520px] animate-[fade-up_450ms_ease-out_both] flex-col items-center justify-center text-center">
                <span className="grid size-16 place-items-center rounded-full bg-brand-100 text-brand-700 ring-8 ring-brand-50">
                  <CircleCheck className="size-8" strokeWidth={1.7} />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">Poptávka je připravená</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">
                  {IS_ARTIFACT ? 'Zkopírujte zprávu a pošlete ji na' : 'Otevírá se e-mailový program s vyplněnou zprávou pro'}{' '}
                  <span className="font-medium text-ink select-all">{site.email}</span>
                  {IS_ARTIFACT ? '.' : '. Pokud se neotevřel, zkopírujte text níže.'}
                </p>
                <div className="mt-6 w-full max-w-md rounded-2xl border border-stone-200 bg-paper p-4 text-left">
                  <label htmlFor="inquiry-message" className="text-xs font-semibold tracking-wide text-muted uppercase">
                    Text zprávy
                  </label>
                  <textarea
                    id="inquiry-message"
                    ref={messageRef}
                    readOnly
                    value={message}
                    rows={7}
                    className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-white p-3 font-sans text-[13px] leading-relaxed text-ink-soft focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none"
                  />
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <Button variant="secondary" size="sm" className="flex-1" onClick={copy} icon={copied ? <Check className="size-4 text-brand-600" /> : <Copy className="size-4" />}>
                      {copied ? 'Zkopírováno' : 'Zkopírovat text'}
                    </Button>
                    <Button href={buildMailto(site.email, data)} variant="secondary" size="sm" className="flex-1" icon={<Mail className="size-4" />}>
                      {IS_ARTIFACT ? 'Otevřít v e-mailu' : 'Otevřít znovu'}
                    </Button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle')
                    setForm(empty)
                  }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  <RotateCcw className="size-4" /> Nová poptávka
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="grid gap-5" aria-describedby={errorCount ? 'form-errors' : undefined}>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink">Nezávazná poptávka</h3>
                  <p className="mt-1 text-sm text-muted">Formulář připraví e-mail s vyplněnými údaji pro {site.email}.</p>
                </div>

                {errorCount > 0 && (
                  <div
                    id="form-errors"
                    ref={summaryRef}
                    tabIndex={-1}
                    role="alert"
                    className="flex animate-[fade-up_300ms_ease-out_both] items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 outline-none"
                  >
                    <CircleAlert className="mt-0.5 size-4 shrink-0" />
                    <p>
                      Zkontrolujte prosím {errorCount === 1 ? 'zvýrazněné pole' : `${errorCount} zvýrazněná pole`}.
                    </p>
                  </div>
                )}

                <fieldset>
                  <legend className="mb-2 text-[13px] font-medium text-ink-soft">Varianta</legend>
                  <div className="grid grid-cols-2 gap-3">
                    {(['A', 'B'] as const).map((v) => (
                      <label
                        key={v}
                        className={cn(
                          'relative flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-500/20',
                          variant === v ? 'border-brand-600 bg-brand-50' : 'border-stone-300/80 bg-white hover:border-stone-400',
                        )}
                      >
                        <input type="radio" name="variant" value={v} checked={variant === v} onChange={() => setVariant(v)} className="sr-only" />
                        <span className={cn('grid size-5 place-items-center rounded-full border-2 transition-colors', variant === v ? 'border-brand-600' : 'border-stone-300')}>
                          <span className={cn('size-2.5 rounded-full bg-brand-600 transition-transform duration-200', variant === v ? 'scale-100' : 'scale-0')} />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-ink">Varianta {v}</span>
                          <span className="block text-xs text-muted">{v === 'A' ? '16 osob' : '24 osob'}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FieldWrap id="company" label="Firma" error={errors.company}>
                    <TextInput id="company" name="company" autoComplete="organization" placeholder="Název firmy" value={form.company} onChange={update('company')} invalid={!!errors.company} aria-describedby={errors.company ? 'company-error' : undefined} />
                  </FieldWrap>
                  <FieldWrap id="name" label="Kontaktní osoba" error={errors.name}>
                    <TextInput id="name" name="name" autoComplete="name" placeholder="Jméno a příjmení" value={form.name} onChange={update('name')} invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                  </FieldWrap>
                  <FieldWrap id="email" label="E-mail" error={errors.email}>
                    <TextInput id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="jmeno@firma.cz" value={form.email} onChange={update('email')} invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                  </FieldWrap>
                  <FieldWrap id="phone" label="Telefon" optional error={errors.phone}>
                    <TextInput id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+420" value={form.phone} onChange={update('phone')} invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                  </FieldWrap>
                  <FieldWrap id="start" label="Nástup od" optional error={errors.start}>
                    <TextInput id="start" name="start" type="date" min={today} value={form.start} onChange={update('start')} invalid={!!errors.start} aria-describedby={errors.start ? 'start-error' : undefined} />
                  </FieldWrap>
                  <FieldWrap id="term" label="Délka pronájmu" optional>
                    <SelectInput id="term" name="term" value={form.term} onChange={update('term')}>
                      <option value="">Vyberte…</option>
                      {termOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </SelectInput>
                  </FieldWrap>
                </div>

                <FieldWrap id="note" label="Poznámka" optional>
                  <TextArea id="note" name="note" placeholder="Např. směnný provoz, parkování, požadavky na vybavení…" value={form.note} onChange={update('note')} />
                </FieldWrap>

                <div className="flex flex-col-reverse items-start gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted">
                    {IS_ARTIFACT ? 'Formulář připraví text e-mailu. Údaje neukládáme.' : 'Odesláním se otevře váš e-mailový program. Údaje neukládáme.'}
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto"
                    icon={status === 'submitting' ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  >
                    {status === 'submitting' ? 'Připravujeme e-mail…' : IS_ARTIFACT ? 'Připravit poptávku' : 'Odeslat poptávku'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
