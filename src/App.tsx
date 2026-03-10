import { useState, useEffect, useRef } from 'react'
import './App.css'
import FigmaSketchAnimation from './components/FigmaSketchAnimation'
import ScrollAnimationBlock from './components/ScrollAnimationBlock'
import FooterBubbleAnimation from './components/FooterBubbleAnimation'
import ContactModal from './components/ContactModal'
import CaseStudy from './components/CaseStudy'
// Removed horizontal scroll hook - using simple grid layout instead

interface CounterProps {
  start?: number;
  end: number;
  duration?: number;
  suffix?: string;
}

const SwayingText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block animate-sway-slow"
          style={{
            animationDelay: `${index * 0.15}s`,
            display: char === " " ? "inline" : "inline-block"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
};

const projects = [
  {
    id: 1,
    category: 'Мобільний додаток',
    title: 'E-commerce App',
    description: 'Інноваційне рішення для онлайн-покупок з акцентом на персоналізований UX та безшовну оплату.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhjgEqgleXkmWZk6IPmQNkwkcWleUq2PHrsSSy7DV4FEYLHJjkfaoEfdOOzpozkP8f4RSaENMtERt5HXptZrVGKP0l0mMZaL3L-99L3XbD92Z4WNfUTgf1EK9kWgZXBfp5TPEpvwp_TKNr8OIvP4fqYNE2lEiz1HKEHjxrGijqrrrjEW2cjSJadFyTb0EeYVbU34ZKD6jh288aJwKnU5TfEm_TTFO38tdDaqEKmLZVjOx2JfDwsO4EnwOCd4uikcOHzIK3DM7-9h9z',
    task: 'Розробити мобільний додаток для e-commerce, який вирішує проблеми традиційних інтернет-магазинів: складна навігація, довгий процес оформлення замовлення, відсутність персоналізації. Основна мета — створити інтуїтивнийshopping experience, що збільшує конверсію та середній чек.',
    solution: 'Створено сучасний додаток з AI-персоналізацією, спрощеним checkout процесом (3 кліки до покупки), інтеграцією з платіжними системами та push-сповіщеннями. Впроваджено систему рекомендацій на основі історії переглядів та покупок. Дизайн-система включає 50+ компонентів для швидкої розробки.',
    gallery: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80'
    ]
  },
  {
    id: 2,
    category: 'Веб-інтерфейс',
    title: 'Fintech Dashboard',
    description: 'Комплексна панель керування фінансами для бізнесу з глибокою аналітикою та автоматизацією звітності.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwfqCrE4uIcNnPsqH1UUpvdXnyqYZX11zHzDSLav_Hknzjfi4KL8X4ResdNvbqTyHiA4Qv7_s9gLnH9K56gldYkBFik8EvMwWoY4LSl8vJtS6orpcugcYG7OkdkfTCYd6VpoDSJgO0zPNMYs7jmQGJhB8OINncSQpPVrsj7DWxF_JQP7T5S_L8s-r3-WCYnxP8q61pdJRpt2zayObHKeeXpA9KGcsY7cWXOk0bfwzHXZ7YvhmUv4qqxhriJpG5PlQVC1mQKMsZAlfS',
    task: 'Створити комплексну фінансову панель для малого та середнього бізнесу. Користувачі потребують: відстеження cash flow в реальному часі, генерацію звітів, прогнозування бюджету та інтеграцію з банківськими API. Основний виклик — подати складні дані в зрозумілому вигляді.',
    solution: 'Розроблено інформативний дашборд з інтерактивними графіками, drag-and-drop конструктором звітів та AI-аналітикою. Впроваджено white-label рішення для партнерів-банків. Система підтримує 15+ мов та інтегрується з 50+ платіжними провайдерами.',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
      'https://images.unsplash.com/photo-1543286386-713df548e9cc?w=800&q=80'
    ]
  },
  {
    id: 3,
    category: 'Мобільний додаток',
    title: 'Health Tracker',
    description: 'Трекер здоров\'я з персоналізованими рекомендаціями, інтеграцією зі смарт-годинниками та гейміфікацією.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChEYtfkWMdc2VD-TEUcZyGW2QW9PXIO75U5lKOYhtJ4BYAIRMUXp_vw5MOVWMv35-zkJc9-bqSVq_denPv2LMy5IBRHXnAU9zOkH9_nXDAs0AHHeTnRMevkaNvzZRuqaUaMOXKMsFlhl3tVpTrZXaBYMn5IVpaPMNASIpUUYTrgHziixwTQsVhgQb_Wq9CWbRLBfdNVC0k1cmHA1IQddCMKky_qqEsLg8UPWW9lTzev8wbTyHEezTpvsNsXQfuAtfiHOd8E_s6cQVK',
    task: 'Розробити застосунок для відстеження здоров\'я, який мотивує користувачів вести здоровий спосіб життя. Проблема існуючих рішень — низька залученість та відсутність персоналізації. Потрібно інтегрувати дані з Apple Watch, Google Fit та інших пристроїв.',
    solution: 'Створено додаток з гейміфікацією (досягнення, челленджі, рейтинги), персоналізованими планами харчування та тренувань. AI-алгоритм аналізує дані та дає рекомендації. Вбудована соціальна складова з друзями та тренерами. Понад 2 млн завантажень за перший рік.',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80'
    ]
  },
  {
    id: 4,
    category: 'SaaS платформа',
    title: 'Real Estate Portal',
    description: 'Екосистема для пошуку та оренди нерухомості з використанням AR-турів та AI-підбору житла.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvKJK9mA6i8G-NnFA3BjviIm6b0cwpTmkWT4fozXGANxioMyOxeENkSQdcPZxVlfgfaYpLk2wBuh992cRkQCPHH7VCGAvojYpvf4RPNys_oM7riEpjJNgK-lXzXocMAczk2Vn-OxEsrbxrXJPRouNpELHuVuIhRUDn4fb8AiMJGXMR-eNegKcDJ1uL7TQUQ7epAJDR7XyKNCfXGZ6xmONh5cIYUwqmlwO7qu60QmjzSidx047XAJTiK6-8kEMlV38Hm_K0duI-d8aQ',
    task: 'Революціонізувати ринок нерухомості через цифровізацію. Створити платформу, яка поєднує пошук, перегляд та оренду житла в одному місці. Впровадити AR-турування для економії часу орендарів.',
    solution: 'Побудовано повнофункціональну SaaS-платформу з AR-турами (працюють у браузері без додатків), AI-підбором житла на основі 50+ параметрів, інтеграцією з 200+ агентствами нерухомості. Впроваджено систему верифікації документів та безпечні онлайн-угоди.',
    gallery: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
    ]
  }
];

const Counter: React.FC<CounterProps> = ({ start = 0, end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const counterElement = counterRef.current;
    if (!counterElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            setIsVisible(true);
          }
        });
      },
      { threshold: 1 }
    );

    observer.observe(counterElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const currentValue = start + (end - start) * percentage;
      setCount(Math.floor(currentValue));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, start, end, duration]);

  return (
    <span ref={counterRef} className="tabular-nums inline-flex items-center justify-center" style={{ minWidth: '4ch' }}>
      {count}{suffix}
    </span>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Handle case study navigation
  const handleOpenCase = (caseId: number) => {
    setSelectedCaseId(caseId);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleCloseCase = () => {
    setSelectedCaseId(null);
  };

  const getCurrentCaseIndex = () => {
    if (selectedCaseId === null) return -1;
    return projects.findIndex(p => p.id === selectedCaseId);
  };

  const currentCase = selectedCaseId !== null ? projects.find(p => p.id === selectedCaseId) : null;
  const currentIndex = getCurrentCaseIndex();
  const prevCase = currentIndex > 0 ? { id: projects[currentIndex - 1].id, title: projects[currentIndex - 1].title } : null;
  const nextCase = currentIndex < projects.length - 1 && currentIndex >= 0 ? { id: projects[currentIndex + 1].id, title: projects[currentIndex + 1].title } : null;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-zinc-950 text-slate-100 antialiased font-sans">
      <div className="layout-container flex h-full grow flex-col">
        {/* Navigation Header */}
        <header className="fixed top-0 left-0 w-full h-20 bg-zinc-950/80 backdrop-blur-lg z-50 border-b border-white/5 flex justify-center">
          <div className="w-full max-w-[1240px] px-6 md:px-12 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-violet-500">
                <span className="material-symbols-outlined text-3xl font-bold">blur_on</span>
              </div>
              <h2 className="text-slate-100 text-2xl font-bold tracking-tight font-display">ELARA</h2>
            </div>
            <nav className="hidden md:flex items-center gap-10">
              <a className="text-slate-400 hover:text-white text-sm font-medium transition-colors" href="#work">Роботи</a>
              <a className="text-slate-400 hover:text-white text-sm font-medium transition-colors" href="#about">Про мене</a>
              <a className="text-slate-400 hover:text-white text-sm font-medium transition-colors" href="#contact">Контакти</a>
              <button
                onClick={openModal}
                className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-full h-10 px-6 bg-violet-500/10 border border-violet-500/20 text-violet-500 text-sm font-bold transition-all hover:bg-violet-500/20">
                <span>Співпраця</span>
              </button>
            </nav>
            <div className="md:hidden">
              <span className="material-symbols-outlined text-slate-100">menu</span>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full flex flex-col items-center justify-center pt-20">
          {/* Show main page content only when no case is selected */}
          {!selectedCaseId && (
            <>
              {/* Hero Section */}
              <section className="relative flex flex-1 items-center justify-center px-6 py-20 pb-32">
                {/* Background Animation and Gradients */}
                <FigmaSketchAnimation />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,rgba(9,9,11,0)_60%)] pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none"></div>

                <div className="layout-content-container flex flex-col items-center max-w-[1240px] w-full text-center z-10">
                  <div className="mb-8 relative flex items-center gap-2 px-4 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm group">
                    {/* Sparkle Border Effect - perfectly aligned with the 1px border */}
                    <svg className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] pointer-events-none">
                      <rect
                        x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" rx="16" ry="16"
                        fill="none"
                        stroke="rgba(167, 139, 250, 0.9)"
                        strokeWidth="1.5"
                        strokeDasharray="12 88"
                        className="animate-sparkle"
                        pathLength="100"
                        style={{ filter: "blur(0.3px)" }}
                      />
                    </svg>
                    <span className="size-2 rounded-full bg-violet-500 animate-pulse relative z-10"></span>
                    <span className="text-xs font-bold tracking-widest uppercase text-violet-400 relative z-10">Відкритий до нових проєктів</span>
                  </div>

                  <h1 className="text-slate-100 text-[88px] font-black leading-[1.1] tracking-tight font-display mb-8">
                    Створюю <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400">цифрові</span> <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400">продукти</span>, що <SwayingText text="мають" /> <br />
                    <SwayingText text="значення" />
                  </h1>

                  <p className="text-slate-400 text-[18px] font-light leading-relaxed max-w-2xl mb-12">
                    Шукаю ідеальний баланс між естетикою та зручністю. Проєктую інтерфейси, які вирішують бізнес-задачі та закохують у себе користувачів.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
                    <a href="#work" className="group flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-full h-14 px-8 bg-violet-600 text-white text-base font-bold transition-all hover:scale-105 hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                      <span>Мої роботи</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                    <button
                      onClick={openModal}
                      className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-full h-14 px-8 border border-white/10 text-slate-300 text-base font-bold transition-all hover:bg-white/5 hover:text-white">
                      <span>Зв'язатися</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* About Section */}
              <ScrollAnimationBlock>
                <section id="about" className="relative px-6 md:px-12 py-24 w-full">
                  <div className="max-w-[1240px] mx-auto flex flex-col gap-20">
                    {/* Title Section */}
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between w-full border-b border-white/5 pb-8 gap-4">
                      <h2 className="text-white text-[64px] font-display font-black leading-none tracking-tight">Про мене</h2>
                      <p className="text-violet-400 text-lg md:text-xl font-medium tracking-wide uppercase">UI/UX Дизайнер з України</p>
                    </div>

                    {/* Two-Column Layout: Philosophy + Stats */}
                    <div className="flex flex-col gap-16 lg:gap-20 items-center">
                      {/* Two Columns with Text */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full">
                        {/* Left Column */}
                        <div className="flex flex-col gap-6">
                          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                            Мій підхід базується на емпатії до користувача та інноваційних рішеннях. Я вірю, що кожен піксель повинен мати мету, а кожен перехід — розповідати історію.
                          </p>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6">
                          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                            Я прагну створювати інтерфейси, які не лише виглядають естетично, але й вирішують реальні бізнес-завдання, роблячи взаємодію з цифровим світом безшовною та приємною.
                          </p>
                        </div>
                      </div>

                      {/* Numbers Block */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl w-full mx-auto justify-items-center items-center">
                        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl p-8 aspect-square lg:aspect-auto lg:h-48 group hover:bg-violet-500/5 transition-all w-full">
                          <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400 text-[72px] md:text-[72px] font-display font-black text-center">
                            <Counter end={9} suffix="+" />
                          </p>
                          <p className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-widest text-center">Років досвіду</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl p-8 aspect-square lg:aspect-auto lg:h-48 group hover:bg-violet-500/5 transition-all w-full">
                          <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400 text-[72px] md:text-[72px] font-display font-black text-center">
                            <Counter end={50} suffix="+" />
                          </p>
                          <p className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-widest text-center">Проєктів</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl p-8 aspect-square lg:aspect-auto lg:h-48 group hover:bg-violet-500/5 transition-all w-full">
                          <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400 text-[72px] md:text-[72px] font-display font-black text-center">
                            <Counter start={100} end={0} suffix="%" />
                          </p>
                          <p className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-widest text-center">Хаосу</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl p-8 aspect-square lg:aspect-auto lg:h-48 group hover:bg-violet-500/5 transition-all w-full">
                          <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400 text-[72px] md:text-[72px] font-display font-black text-center">
                            <Counter end={100} suffix="%" />
                          </p>
                          <p className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-widest text-center">Якість</p>
                        </div>
                      </div>
                    </div>

                    {/* Expertise Cards — horizontal row of 4 below Philosophy+Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                      <div className="flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-8 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all group relative overflow-hidden">
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <span className="material-symbols-outlined text-violet-500 text-3xl mb-10 relative z-10">psychology</span>
                        <div className="flex flex-col gap-4">
                          <h4 className="text-white text-lg font-bold">Емпатія</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">Глибоке розуміння користувача — фундамент кожного успішного проекту.</p>
                        </div>
                      </div>
                      <div className="flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-8 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all group relative overflow-hidden">
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <span className="material-symbols-outlined text-violet-500 text-3xl mb-10 relative z-10">database</span>
                        <div className="flex flex-col gap-4">
                          <h4 className="text-white text-lg font-bold">SaaS & Product Design</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">Проектую CRM/ERP системи з нуля, працюючи з багатокористувацькою логікою та великими даними.</p>
                        </div>
                      </div>
                      <div className="flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-8 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all group relative overflow-hidden">
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <span className="material-symbols-outlined text-violet-500 text-3xl mb-10 relative z-10">account_tree</span>
                        <div className="flex flex-col gap-4">
                          <h4 className="text-white text-lg font-bold">UX Architecture</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">Створюю інтуїтивні сценарії для складних процесів (multi-step flows, верифікація, аукціони).</p>
                        </div>
                      </div>
                      <div className="flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-8 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all group relative overflow-hidden">
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <span className="material-symbols-outlined text-violet-500 text-3xl mb-10 relative z-10">palette</span>
                        <div className="flex flex-col gap-4">
                          <h4 className="text-white text-lg font-bold">Visual Identity</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">Підсилюю продукти досвідом у брендингу, забезпечуючи цілісний образ бренду.</p>
                        </div>
                      </div>
                    </div>

                    {/* Tools Section */}
                    <div className="flex flex-col gap-10">
                      <div className="flex flex-col gap-2 items-center">
                        <h3 className="text-white text-3xl font-display font-bold">Інструменти та Технології</h3>
                        <div className="h-1 w-20 bg-violet-500 rounded-full"></div>
                      </div>

                      <div className="flex flex-wrap gap-3 justify-center">
                        {[
                          { name: "Figma", icon: "diamond" },
                          { name: "Adobe Photoshop", icon: "photo_filter" },
                          { name: "Adobe Illustrator", icon: "draw" },
                          { name: "Miro", icon: "sticky_note_2" },
                          { name: "Adobe Lightroom", icon: "exposure" },
                          { name: "Creative Direction", icon: "movie_filter" },
                          { name: "Technical Specification Writing", icon: "description" },
                          { name: "Stakeholder Management", icon: "groups" },
                          { name: "Cross-functional Team Collaboration", icon: "hub" },
                          { name: "Responsive Web Design", icon: "devices" },
                          { name: "Design-to-Development Handoff", icon: "code_blocks" },
                          { name: "Auto Layout & Components", icon: "widgets" },
                          { name: "Prototyping (Advanced)", icon: "animation" },
                          { name: "User Research & Competitor Analysis", icon: "analytics" },
                          { name: "Rapid Prototyping", icon: "bolt" },
                          { name: "UX Strategy", icon: "architecture" },
                          { name: "Design Systems", icon: "category" },
                          { name: "Product Design", icon: "layers" }
                        ].map((tool) => (
                          <div key={tool.name} className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-violet-500/20 hover:border-violet-500 transition-all cursor-default group">
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-violet-500 transition-colors text-xl">{tool.icon}</span>
                            <span className="text-slate-300 font-medium group-hover:text-white transition-colors text-sm">{tool.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </section>
              </ScrollAnimationBlock>

              {/* Portfolio Section - Simple Grid */}
              <section id="work" className="relative px-6 md:px-12 py-24 w-full">
                <div className="max-w-[1240px] mx-auto flex flex-col gap-16">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between w-full border-b border-white/5 pb-8 gap-4">
                    <h2 className="text-white text-[64px] font-display font-black leading-none tracking-tight">Мої проєкти</h2>
                    <p className="text-violet-400 text-lg md:text-xl font-medium tracking-wide uppercase">Добірка найкращих моїх рішень</p>
                  </div>

                  {/* Simple 2-Column Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => handleOpenCase(project.id)}
                        className="group flex flex-col rounded-2xl bg-white/[0.02] overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] cursor-pointer"
                      >
                        <div className="w-full aspect-square relative">
                          <img
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            src={project.image}
                          />
                          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                            <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">{project.category}</span>
                            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                            <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 mb-2">
                              {project.description}
                            </p>
                            <span className="inline-flex items-center gap-2 text-violet-400 font-bold group/btn">
                              Дивитися кейс
                              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <ScrollAnimationBlock delay={0.4}>
                <section id="contact" className="relative w-full px-6 py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
                  <FooterBubbleAnimation />
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,rgba(9,9,11,0)_60%)] pointer-events-none"></div>
                  <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none"></div>

                  <div className="max-w-[1240px] w-full mx-auto text-center z-10">
                    <h2 className="text-white text-[64px] font-display font-black mb-8 tracking-tight leading-tight">
                      Маєте ідею для проєкту?
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                      Давайте разом створимо щось надзвичайне. Я завжди відкритий до нових викликів та цікавих колаборацій.
                    </p>
                    <div className="flex justify-center">
                      <button onClick={openModal} className="group flex min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-full h-14 px-8 bg-violet-600 text-white text-base font-bold transition-all hover:scale-105 hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                        <span>Написати мені</span>
                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </section>
              </ScrollAnimationBlock>
            </>
          )}
        </main >

        {/* Footer - only show when no case is selected */}
        {!selectedCaseId && (
          <footer className="w-full bg-zinc-950 border-t border-white/5 pt-20 pb-12">
            <div className="max-w-[1240px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="material-symbols-outlined text-violet-500">location_on</span>
                    <span className="font-medium">Київ, Україна</span>
                  </div>
                </div>

                <div className="lg:col-span-2 flex justify-center items-center gap-8 md:gap-12 flex-wrap">
                  <a className="group flex items-center gap-2 text-slate-300 hover:text-violet-500 transition-colors font-medium" href="#">
                    <span className="material-symbols-outlined text-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all">language</span>
                    Dribbble
                  </a>
                  <a className="group flex items-center gap-2 text-slate-300 hover:text-violet-500 transition-colors font-medium" href="#">
                    <span className="material-symbols-outlined text-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all">brush</span>
                    Behance
                  </a>
                  <a className="group flex items-center gap-2 text-slate-300 hover:text-violet-500 transition-colors font-medium" href="#">
                    <span className="material-symbols-outlined text-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all">hub</span>
                    LinkedIn
                  </a>
                  <a className="group flex items-center gap-2 text-slate-300 hover:text-violet-500 transition-colors font-medium" href="#">
                    <span className="material-symbols-outlined text-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all">photo_camera</span>
                    Instagram
                  </a>
                </div>

                <div className="flex justify-center md:justify-end">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="size-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-violet-500 hover:border-violet-500 transition-all active:scale-90"
                  >
                    <span className="material-symbols-outlined">expand_less</span>
                  </button>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-sm">© 2024 Портфоліо UI/UX Дизайнера. Всі права захищено.</p>
                <div className="flex gap-6 text-slate-500 text-sm">
                  <a className="hover:text-violet-500 transition-colors" href="#">Політика конфіденційності</a>
                  <a className="hover:text-violet-500 transition-colors" href="#">Умови використання</a>
                </div>
              </div>
            </div>
          </footer >
        )}
      </div >

      <ContactModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Case Study Page */}
      {currentCase && (
        <CaseStudy
          project={currentCase}
          prevCase={prevCase}
          nextCase={nextCase}
          onNavigate={handleOpenCase}
          onBack={handleCloseCase}
        />
      )}
    </div >
  )
}

export default App

