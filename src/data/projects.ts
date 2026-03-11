/**
 * Projects data - separated from App component
 * Following DIP (Dependency Inversion Principle)
 * Now can be easily modified, fetched from API, or tested
 */

export interface Project {
    id: number;
    category: string;
    title: string;
    description: string;
    image: string;
    task?: string;
    solution?: string;
    gallery?: string[];
}

export const projects: Project[] = [
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

/**
 * Contact methods - now separated from ContactModal
 * Can be easily modified or fetched from configuration
 */
export interface ContactMethod {
    name: string;
    icon: string;
    href: string;
}

export const contactMethods: ContactMethod[] = [
    {
        name: 'Telegram',
        icon: 'send',
        href: 'https://t.me/yourusername',
    },
    {
        name: 'Viber',
        icon: 'chat',
        href: 'viber://chat?number=yournumber',
    },
    {
        name: 'WhatsApp',
        icon: 'call',
        href: 'https://wa.me/yournumber',
    },
    {
        name: 'Телефон',
        icon: 'phone',
        href: 'tel:+380000000000',
    }
];

/**
 * Tools and technologies - separated for maintainability
 */
export const tools = [
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
];
