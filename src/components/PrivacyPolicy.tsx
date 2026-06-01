import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PrivacyPolicy() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 text-[14px]"
        >
          <ArrowLeft size={16} /> Назад
        </button>

        <h1 className="font-inter font-bold text-[32px] mb-2">
          Политика обработки персональных данных
        </h1>
        <p className="text-white/40 text-[13px] mb-10">Дата последнего обновления: 01 июня 2026 г.</p>

        <div className="space-y-8 text-[15px] text-white/70 leading-relaxed">
          <section>
            <h2 className="font-inter font-semibold text-white text-[18px] mb-3">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных
              данных пользователей сайта компании <strong className="text-white">ООО «Урал-Групп»</strong> (далее — Оператор),
              расположенной по адресу: Краснодар, Краснодарский край.
            </p>
            <p className="mt-3">
              Обработка персональных данных осуществляется в соответствии с Федеральным законом от
              27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
          </section>

          <section>
            <h2 className="font-inter font-semibold text-white text-[18px] mb-3">2. Какие данные мы собираем</h2>
            <p>При заполнении формы обратной связи на сайте Оператор получает:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/60">
              <li>Имя (фамилия, имя, отчество — при наличии)</li>
              <li>Номер телефона</li>
              <li>Текст сообщения (описание запроса)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-inter font-semibold text-white text-[18px] mb-3">3. Цели обработки</h2>
            <p>Персональные данные используются исключительно для:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/60">
              <li>Обратной связи с пользователем по его запросу</li>
              <li>Расчёта стоимости услуг и консультации</li>
              <li>Заключения и исполнения договора</li>
            </ul>
          </section>

          <section>
            <h2 className="font-inter font-semibold text-white text-[18px] mb-3">4. Хранение и передача данных</h2>
            <p>
              Оператор не продаёт и не передаёт персональные данные третьим лицам без согласия
              субъекта, за исключением случаев, предусмотренных законодательством Российской Федерации.
              Данные хранятся в защищённой системе и удаляются по достижении целей обработки или по
              требованию субъекта.
            </p>
          </section>

          <section>
            <h2 className="font-inter font-semibold text-white text-[18px] mb-3">5. Права субъекта персональных данных</h2>
            <p>Вы имеете право:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/60">
              <li>Получить сведения об обработке ваших персональных данных</li>
              <li>Потребовать уточнения, блокирования или уничтожения ваших персональных данных</li>
              <li>Отозвать своё согласие на обработку</li>
              <li>Обжаловать действия Оператора в уполномоченный орган по защите прав субъектов (Роскомнадзор)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-inter font-semibold text-white text-[18px] mb-3">6. Контакты</h2>
            <p>
              По вопросам обработки персональных данных обращайтесь:{' '}
              <a href="tel:89180368866" className="text-brand-orange hover:underline">
                8 918 036 88 66
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
