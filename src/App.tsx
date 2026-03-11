import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import FigmaSketchAnimation from './components/FigmaSketchAnimation';
import ScrollAnimationBlock from './components/ScrollAnimationBlock';
import FooterBubbleAnimation from './components/FooterBubbleAnimation';
import ContactModal from './components/ContactModal';
import CaseStudy from './components/CaseStudy';
import SwayingText from './components/SwayingText';
import Counter from './components/Counter';
import saLogo from './assets/sa_logo.svg';
import { projects, tools } from './data/projects';

/**
 * Main App Component
 * 
 * REFACTORING IMPROVEMENTS:
 * 1. Extracted SwayingText and Counter to separate files (SRP)
 * 2. Projects data moved to data/projects.ts (DIP)
 * 3. Uses useScrollSpy custom hook with throttling (Performance)
 * 4. Cleaner component composition
 */

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use ref for active section to avoid unnecessary re-renders during scroll
  const activeSectionRef = useRef('hero');
  const [, setForceRender] = useState(0); // Only used to trigger re-render when section changes

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Handle case study navigation
  const handleOpenCase = (caseId: number) => {
    setSelectedCaseId(caseId);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleCloseCase = () => {
    setSelectedCaseId(null);
    activeSectionRef.current = 'hero';
    setForceRender(n => n + 1);
  };

  // Optimized scroll handler with throttling using requestAnimationFrame
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const sections = ['hero', 'about', 'work', 'contact'];

    const handleScroll = () => {
      // Cancel pending frame - ensures only one scroll check per frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;

            if (section === 'contact') {
              const pageHeight = document.documentElement.scrollHeight;
              const viewportHeight = window.innerHeight;

              if (scrollPosition >= offsetTop || scrollPosition >= pageHeight - viewportHeight) {
                if (activeSectionRef.current !== section) {
                  activeSectionRef.current = section;
                  setForceRender(n => n + 1);
                }
                break;
              }
            } else if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              if (activeSectionRef.current !== section) {
                activeSectionRef.current = section;
                setForceRender(n => n + 1);
              }
              break;
            }
          }
        }
      });
    };

    const ref = { current: 0 };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

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
        <header className="fixed top-0 left-0 w-full h-16 md:h-20 bg-zinc-950/80 backdrop-blur-lg z-50 border-b border-white/5 flex justify-center">
          <div className="w-full max-w-[1240px] flex items-center justify-between px-4 md:px-0">
            <div className="flex items-center gap-2">
              <a href="#hero" className="flex items-center gap-2 cursor-pointer">
                <img
                  src={saLogo}
                  alt="ELARA"
                  className="h-8 md:h-10 w-auto"
                />
              </a>
            </div>
            <nav className="hidden md:flex items-center gap-10">
              <NavLink href="#hero" activeSection={activeSectionRef.current}>Головна</NavLink>
              <NavLink href="#about" activeSection={activeSectionRef.current}>Про мене</NavLink>
              <NavLink href="#work" activeSection={activeSectionRef.current}>Роботи</NavLink>
              <NavLink href="#contact" activeSection={activeSectionRef.current}>Контакти</NavLink>
              <button
                onClick={openModal}
                className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-full h-10 px-6 bg-violet-500/10 border border-violet-500/20 text-violet-500 text-sm font-bold transition-all hover:bg-violet-500/20">
                <span>Співпраця</span>
              </button>
            </nav>
            <div className="md:hidden cursor-pointer flex items-center justify-center" onClick={toggleMobileMenu}>
              <span className="material-symbols-outlined text-slate-100">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 md:top-20 left-0 w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-zinc-950/90 backdrop-blur-lg z-40 md:hidden">
            <nav className="flex flex-col items-center justify-center gap-8 h-full">
              <MobileNavLink href="#hero" activeSection={activeSectionRef.current} onClick={closeMobileMenu}>Головна</MobileNavLink>
              <MobileNavLink href="#about" activeSection={activeSectionRef.current} onClick={closeMobileMenu}>Про мене</MobileNavLink>
              <MobileNavLink href="#work" activeSection={activeSectionRef.current} onClick={closeMobileMenu}>Роботи</MobileNavLink>
              <MobileNavLink href="#contact" activeSection={activeSectionRef.current} onClick={closeMobileMenu}>Контакти</MobileNavLink>
              <button
                onClick={() => { closeMobileMenu(); openModal(); }}
                className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-full h-12 px-8 bg-violet-500/10 border border-violet-500/20 text-violet-500 text-base font-bold transition-all hover:bg-violet-500/20 mt-4">
                <span>Співпраця</span>
              </button>
            </nav>
          </div>
        )}

        <main className={`flex-1 w-full flex flex-col items-center justify-center pt-16 md:pt-20 ${isMobileMenuOpen ? 'pt-36 md:pt-20' : ''}`}>
          {/* Show main page content only when no case is selected */}
          {!selectedCaseId && (
            <>
              {/* Hero Section */}
              <section id="hero" className="relative flex flex-1 items-center justify-center px-6 py-20 pb-32 max-[480px]:px-4 max-[480px]:py-14 max-[480px]:pb-28">
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

                  <h1 className="text-slate-100 text-[88px] font-black leading-[1.1] tracking-tight font-display mb-8 max-[480px]:text-[56px]">
                    Створюю <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400">цифрові</span> <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400">продукти</span>, що <SwayingText text="мають" /> <br />
                    <SwayingText text="значення" />
                  </h1>

                  <p className="text-slate-400 text-[18px] font-light leading-relaxed max-w-2xl mb-12 max-[480px]:text-base">
                    Шукаю ідеальний баланс між естетикою та зручністю. Проєктую інтерфейси, які вирішують бізнес-задачі та закохують у себе користувачів.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full">
                    <a href="#work" className="group flex cursor-pointer items-center justify-center gap-2 rounded-full h-14 px-8 bg-violet-600 text-white text-base font-bold transition-all hover:scale-105 hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] border-2 border-violet-400 max-[480px]:w-full max-[480px]:min-w-full">
                      <span>Мої роботи</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                    <button
                      onClick={openModal}
                      className="flex cursor-pointer items-center justify-center rounded-full h-14 px-8 border border-white/40 text-slate-300 text-base font-bold transition-all hover:bg-white/10 hover:text-white hover:border-white max-[480px]:w-full max-[480px]:min-w-full">
                      <span>Зв'язатися</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="relative px-6 md:px-12 py-24 max-[480px]:px-4 max-[480px]:py-14 w-full">
                <div className="max-w-[1240px] mx-auto flex flex-col gap-20 max-[480px]:gap-8">
                  {/* Title Section */}
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between w-full border-b border-white/5 pb-8 max-[480px]:pb-6 gap-4">
                    <h2 className="text-white text-[64px] max-[480px]:text-[48px] font-display font-black leading-none tracking-tight">Про мене</h2>
                    <p className="text-violet-400 text-lg md:text-xl max-[480px]:text-base font-medium tracking-wide uppercase">UI/UX Дизайнер з України</p>
                  </div>

                  {/* Two-Column Layout: Philosophy + Stats */}
                  <div className="flex flex-col gap-16 lg:gap-20 max-[480px]:gap-6 items-center">
                    {/* Two Columns with Text */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-[480px]:gap-4 w-full">
                      {/* Left Column */}
                      <div className="flex flex-col gap-6 max-[480px]:gap-4">
                        <p className="text-slate-300 text-lg md:text-xl max-[480px]:text-sm leading-relaxed">
                          Мій підхід базується на системному мисленні та глибокій аналітиці бізнес-процесів. Я вірю, що в складних SaaS-продуктах кожен піксель має працювати на ефективність, а кожен інтерфейсний перехід — спрощувати шлях користувача до результату.
                        </p>
                      </div>

                      {/* Right Column */}
                      <div className="flex flex-col gap-6 max-[480px]:gap-4">
                        <p className="text-slate-300 text-lg max-[480px]:text-sm leading-relaxed">
                          Я спеціалізуюся на створенні інтерфейсів, які не лише виглядають сучасно, а й вирішують реальні завдання великого бізнесу. Моя мета — зробити взаємодію з важкими масивами даних та багатоетапними процесами безшовною, інтуїтивною та результативною.
                        </p>
                      </div>
                    </div>

                    {/* Numbers Block */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl w-full mx-auto justify-items-center items-center">
                      <CounterCard value={9} suffix="+" label="Років досвіду" />
                      <CounterCard value={50} suffix="+" label="Проєктів" />
                      <CounterCard start={100} value={0} suffix="%" label="Хаосу" />
                      <CounterCard value={100} suffix="%" label="Якість" />
                    </div>
                  </div>

                  {/* Expertise Cards */}
                  <ExpertiseCards />

                  {/* Tools Section */}
                  <ToolsSection tools={tools} />
                </div>
              </section>

              {/* Portfolio Section */}
              <section id="work" className="relative px-6 md:px-12 py-24 max-[480px]:px-4 max-[480px]:py-14 w-full">
                <div className="max-w-[1240px] mx-auto flex flex-col gap-16 max-[480px]:gap-8">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between w-full border-b border-white/5 pb-8 max-[480px]:pb-6 gap-4">
                    <h2 className="text-white text-[64px] max-[480px]:text-[48px] font-display font-black leading-none tracking-tight">Мої проєкти</h2>
                    <p className="text-violet-400 text-lg md:text-xl max-[480px]:text-base font-medium tracking-wide uppercase">Добірка найкращих моїх рішень</p>
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
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                        </div>
                        <div className="flex flex-col gap-3 p-6">
                          <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">{project.category}</span>
                          <h3 className="text-white text-xl font-bold">{project.title}</h3>
                          <p className="text-slate-400 text-sm line-clamp-2">{project.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="relative px-6 py-24 max-[480px]:px-4 max-[480px]:py-14 w-full overflow-hidden min-h-screen flex items-center">
                {/* Bubble animation - positioned absolutely to fill the section */}
                <div className="absolute inset-0 pointer-events-none opacity-30" style={{ height: '100%' }}>
                  <FooterBubbleAnimation />
                </div>
                <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-8 relative z-10">
                  <h2 className="text-white text-4xl md:text-5xl font-display font-black text-center">Готові обговорити проєкт?</h2>
                  <p className="text-slate-400 text-lg text-center max-w-xl">
                    Напишіть мені, і ми обговоримо деталі вашого проєкту.
                  </p>
                  <button
                    onClick={openModal}
                    className="flex cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-violet-600 text-white text-base font-bold transition-all hover:scale-105 hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  >
                    <span>Зв'язатися</span>
                  </button>
                </div>
              </section>

              {/* Footer */}
              <footer className="w-full bg-zinc-950 border-t border-white/5 pt-8 pb-8 md:pt-20 md:pb-12">
                <div className="max-w-[1240px] mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:mb-16 items-center">
                    <div className="flex justify-center md:justify-start">
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="material-symbols-outlined text-violet-500">location_on</span>
                        <span className="font-medium">Харків, Україна</span>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-4 md:gap-8">
                      <a className="group flex items-center gap-2 text-slate-300 hover:text-violet-500 transition-colors font-medium" href="#">
                        <span className="material-symbols-outlined text-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all">language</span>
                        Dribbble
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
              </footer>
            </>
          )}

          {/* Case Study View */}
          {currentCase && (
            <CaseStudy
              project={currentCase}
              prevCase={prevCase}
              nextCase={nextCase}
              onNavigate={handleOpenCase}
              onBack={handleCloseCase}
              onOpenContact={openModal}
            />
          )}
        </main>

        {/* Contact Modal */}
        <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
}

// Helper components for better organization

const NavLink: React.FC<{ href: string; activeSection: string; children: React.ReactNode }> = ({
  href,
  activeSection,
  children
}) => {
  const isActive = activeSection === href.slice(1);
  return (
    <a
      className={`text-sm font-medium transition-colors ${isActive ? 'text-violet-400' : 'text-slate-400 hover:text-white'}`}
      href={href}
    >
      {children}
    </a>
  );
};

const MobileNavLink: React.FC<{
  href: string;
  activeSection: string;
  onClick: () => void;
  children: React.ReactNode
}> = ({
  href,
  activeSection,
  onClick,
  children
}) => {
    const isActive = activeSection === href.slice(1);
    return (
      <a
        onClick={onClick}
        className={`text-2xl font-medium transition-colors ${isActive ? 'text-violet-400' : 'text-slate-400 hover:text-white'}`}
        href={href}
      >
        {children}
      </a>
    );
  };

const CounterCard: React.FC<{
  value: number;
  suffix?: string;
  start?: number;
  label: string
}> = ({
  value,
  suffix = "",
  start = 0,
  label
}) => (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl p-8 aspect-square lg:aspect-auto lg:h-48 group hover:bg-violet-500/5 transition-all w-full">
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-400 text-[72px] md:text-[72px] max-[480px]:text-[48px] font-display font-black text-center tracking-wider">
        <Counter end={value} start={start} suffix={suffix} />
      </p>
      <p className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-widest text-center">{label}</p>
    </div>
  );

const ExpertiseCards: React.FC = () => {
  const cards = [
    { icon: 'psychology', title: 'Емпатія', desc: 'Глибоке розуміння користувача — фундамент кожного успішного проекту.' },
    { icon: 'database', title: 'SaaS та Product Design', desc: 'Проєктування CRM/ERP систем з нуля, робота з великими даними та складною логікою ролей.' },
    { icon: 'account_tree', title: 'UX-архітектура', desc: 'Створюю інтуїтивні сценарії для складних процесів (multi-step flows, верифікація, аукціони).' },
    { icon: 'palette', title: 'Візуальна айдентика', desc: 'Підсилюю продукти досвідом у брендингу, забезпечуючи цілісний образ бренду.' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 max-[480px]:gap-2">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-6 max-[480px]:p-4 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all group relative overflow-hidden"
        >
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          <div className="max-[480px]:flex max-[480px]:items-center max-[480px]:gap-2 max-[480px]:mb-2">
            <span className="material-symbols-outlined text-violet-500 text-3xl mb-10 max-[480px]:mb-0 relative z-10">{card.icon}</span>
            <h4 className="text-white text-lg font-bold">{card.title}</h4>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
        </div>
      ))}
    </div>
  );
};

const ToolsSection: React.FC<{ tools: Array<{ name: string; icon: string }> }> = ({ tools }) => (
  <div className="flex flex-col gap-10 max-[480px]:gap-8">
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-white text-3xl max-[480px]:text-2xl font-display font-bold">Інструменти та Технології</h3>
      <div className="h-1 w-20 bg-violet-500 rounded-full"></div>
    </div>

    <div className="flex flex-wrap gap-3 justify-center max-[480px]:flex-col max-[480px]:w-full max-[480px]:gap-1">
      {tools.map((tool) => (
        <div
          key={tool.name}
          className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-violet-500/20 hover:border-violet-500 transition-all cursor-default group max-[480px]:w-full max-[480px]:justify-start"
        >
          <span className="material-symbols-outlined text-slate-400 group-hover:text-violet-500 transition-colors text-xl">{tool.icon}</span>
          <span className="text-slate-300 font-medium group-hover:text-white transition-colors text-sm">{tool.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default App;
