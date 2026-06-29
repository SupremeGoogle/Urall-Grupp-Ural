import { useState } from 'react'
import type { SiteContent } from '../data/content'

interface Props { content: SiteContent }

const buildingTypes = ['Жилой дом', 'Баня', 'Дачный дом', 'Забор', 'Терраса/Веранда', 'Другое']
const pileTypes = ['Свая 57 мм (лёгкие постройки)', 'Свая 76 мм (дачи, бани)', 'Свая 89 мм (дома)', 'Свая 108 мм (тяжёлые дома)', 'Свая 133 мм (коммерция)']
const pileCountOptions = ['До 10 свай', '10–20 свай', '20–30 свай', '30–50 свай', 'Более 50 свай']
const soilTypes = ['Обычный грунт', 'Торф/болото', 'Склон/перепад высот', 'Песок', 'Глина']
const bindingTypes = ['Оцинкованный швеллер', 'Деревянный ростверк', 'Металлический ростверк', 'Без обвязки']

const basePrices: Record<string, number> = {
  'Свая 57 мм (лёгкие постройки)': 3500,
  'Свая 76 мм (дачи, бани)': 4500,
  'Свая 89 мм (дома)': 5500,
  'Свая 108 мм (тяжёлые дома)': 7000,
  'Свая 133 мм (коммерция)': 9000,
}
const countMultiplier: Record<string, number> = {
  'До 10 свай': 7, '10–20 свай': 15, '20–30 свай': 25, '30–50 свай': 40, 'Более 50 свай': 60,
}

export default function Calculator({ content: _ }: Props) {
  const [form, setForm] = useState({
    building: '', pile: '', count: '', soil: '', binding: '',
  })
  const [result, setResult] = useState<number | null>(null)
  const [sent, setSent] = useState(false)

  const calc = () => {
    if (!form.pile || !form.count) return
    const base = basePrices[form.pile] ?? 5500
    const qty = countMultiplier[form.count] ?? 15
    const soilExtra = form.soil === 'Торф/болото' || form.soil === 'Склон/перепад высот' ? 1.2 : 1
    const bindExtra = form.binding === 'Металлический ростверк' ? 15000 : form.binding === 'Деревянный ростверк' ? 10000 : form.binding === 'Оцинкованный швеллер' ? 12000 : 0
    setResult(Math.round(base * qty * soilExtra + bindExtra))
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <section id="calculator" className="py-20 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-brand-orange text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">Калькулятор</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">НАЧНИТЕ С РАСЧЁТА</h2>
          <p className="text-white/40 text-sm">УЗНАЙТЕ КОЛИЧЕСТВО И ВАРИАНТЫ ВИНТОВЫХ СВАЙ ПОД ВАШ ОБЪЕКТ</p>
        </div>

        <div className="liquid-glass rounded-3xl p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {([
              ['building', 'Тип постройки', buildingTypes],
              ['pile', 'Необходимый тип свай', pileTypes],
              ['count', 'Количество свай', pileCountOptions],
              ['soil', 'Особенности грунта', soilTypes],
            ] as [keyof typeof form, string, string[]][]).map(([key, label, opts]) => (
              <div key={key}>
                <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">{label}</label>
                <select
                  value={form[key]}
                  onChange={set(key)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-orange/50 transition-colors duration-200 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#111]">Выбрать...</option>
                  {opts.map(o => <option key={o} value={o} className="bg-[#111]">{o}</option>)}
                </select>
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">Тип обвязки</label>
              <select
                value={form.binding}
                onChange={set('binding')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-orange/50 transition-colors duration-200 appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#111]">Выбрать...</option>
                {bindingTypes.map(o => <option key={o} value={o} className="bg-[#111]">{o}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={calc}
            className="w-full bg-brand-orange hover:bg-orange-400 text-black font-bold text-sm tracking-[0.2em] uppercase py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-brand-orange/20"
          >
            РАССЧИТАТЬ СТОИМОСТЬ
          </button>

          {result !== null && (
            <div className="mt-6 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 p-6 text-center">
              <p className="text-white/50 text-xs tracking-widest uppercase mb-2">Примерная стоимость</p>
              <p className="text-4xl font-black text-brand-orange mb-1">от {result.toLocaleString('ru-RU')} ₽</p>
              <p className="text-white/30 text-xs mb-4">Точную цену уточнит менеджер после звонка</p>
              {!sent ? (
                <button
                  onClick={() => setSent(true)}
                  className="bg-brand-orange hover:bg-orange-400 text-black font-bold text-xs tracking-widest uppercase px-8 py-3 rounded-full transition-all duration-200 hover:scale-105"
                >
                  ОСТАВИТЬ ЗАЯВКУ
                </button>
              ) : (
                <p className="text-green-400 text-sm font-semibold">Спасибо! Свяжитесь с нами по телефону для уточнения.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
