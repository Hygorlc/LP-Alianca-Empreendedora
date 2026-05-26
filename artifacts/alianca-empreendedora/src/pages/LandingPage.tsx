import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ChevronDown, CheckCircle, Mic, BarChart2, Users, Star, MessageCircle, X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const GOLD = "#B99052";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const painPoints = [
  "Está sempre dependendo de indicação para vender o seu produto?",
  "Atrai clientes que só buscam preço e não enxergam o seu valor?",
  "Tem dificuldade de comunicar seu diferencial de forma clara e impactante?",
  "Sente que seus conteúdos não trazem resultados para o seu negócio?",
  "Atrai seguidores, mas poucos ou nenhum viram clientes?",
];

const eventFeatures = [
  {
    icon: <Mic size={32} color={GOLD} />,
    image: "https://pablopitani.com.br/wp-content/uploads/2026/05/FOTOS-7-12.png",
    title: "PALESTRA",
    desc: "Serão 2h de palestra com conteúdo profundo e estratégico, pensado para empresários que querem aplicar tudo na prática. Você aprenderá como atrair mais clientes qualificados, fortalecer seu posicionamento e se diferenciar da concorrência com métodos claros e aplicáveis ao seu negócio.",
  },
  {
    icon: <BarChart2 size={32} color={GOLD} />,
    image: "https://pablopitani.com.br/wp-content/uploads/2026/05/PANA6098-scaled.jpg",
    title: "ANÁLISE DE POSICIONAMENTO",
    desc: "Vamos analisar perfis reais do Instagram ao vivo e mostrar, na prática, o que está funcionando e o que precisa ser ajustado. Você vai entender como melhorar sua comunicação, fortalecer seu posicionamento e tornar seu perfil mais atrativo para clientes certos, transformando seguidores em oportunidades reais de negócio.",
  },
  {
    icon: <Users size={32} color={GOLD} />,
    image: "https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_7691-1024x683-2.webp",
    title: "NETWORKING",
    desc: "No evento, você terá a chance de ampliar sua rede de contatos, conectando-se com grandes empresários do Rio Grande do Sul. Um ambiente com um enorme potencial de parcerias e oportunidades que irão abrir portas e acelerar o crescimento do seu negócio.",
  },
];

const photos = [
  "https://pablopitani.com.br/wp-content/uploads/2026/05/18-FOTOS-DIA-02-1024x776.jpg",
  "https://pablopitani.com.br/wp-content/uploads/2026/05/46-FOTOS-DIA-02-1024x715.jpg",
  "https://pablopitani.com.br/wp-content/uploads/2026/05/8-FOTOS-DIA-02-1024x782.jpg",
  "https://pablopitani.com.br/wp-content/uploads/2026/05/FOTOS-DIA-O2-36-1024x760.png",
  "https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_82022-1-1024x683.webp",
  "https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_7691-1024x683-3.webp",
  "https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_8103-2-1024x683.webp",
  "https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_7706-1024x683-3.webp",
  "https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_8202-2-1024x683.webp",
  "https://pablopitani.com.br/wp-content/uploads/2025/08/ALIANCA-EMPREENDEDORA-networking-scaled-e1755548208782-1024x429.webp",
];

const reels = [
  "https://www.instagram.com/reel/DVMehuniAIe/embed/",
  "https://www.instagram.com/reel/DWpBzHVk1Bb/embed/",
  "https://www.instagram.com/reel/DWzbWqxiNT-/embed/",
];

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "Empresário",
    initials: "CM",
    text: "O evento transformou a forma como eu me comunico com meus clientes. Pablo tem uma didática incrível e os resultados foram imediatos no meu negócio.",
  },
  {
    name: "Fernanda Lima",
    role: "Empreendedora Digital",
    initials: "FL",
    text: "Nunca imaginei que em 3 horas eu poderia entender tudo que estava faltando no meu posicionamento. Valeu muito cada centavo investido.",
  },
  {
    name: "Ricardo Santos",
    role: "Consultor",
    initials: "RS",
    text: "A análise de posicionamento ao vivo foi reveladora. Saí com um plano claro de ação e já estou implementando. Recomendo a todos os empresários.",
  },
];

const faqs = [
  {
    q: "Onde será o evento?",
    a: "O evento será realizado na Av. Sergipe, 121 – Bairro Glória – Porto Alegre/RS, 91720-110.",
  },
  {
    q: "Quando será o evento?",
    a: "O evento acontecerá no dia 28 de Maio às 19:30.",
  },
  {
    q: "Quanto tempo irá durar o evento?",
    a: "O evento terá duração aproximada de 3 horas, incluindo palestra, análise de posicionamento e networking.",
  },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#B99052]/30">

      {/* Header Fixo */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#B99052] to-[#8C6D3E] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-xl tracking-widest hidden sm:block uppercase">ALIANÇA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-sm uppercase tracking-widest hover:text-[#B99052] transition-colors">O Evento</a>
            <a href="#palestrante" className="text-sm uppercase tracking-widest hover:text-[#B99052] transition-colors">Palestrante</a>
            <a href="#faq" className="text-sm uppercase tracking-widest hover:text-[#B99052] transition-colors">Dúvidas</a>
            <a
              href="#ingresso"
              className="px-6 py-2.5 bg-[#B99052] text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#D4AF37] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#B99052]/20"
            >
              Garantir Vaga
            </a>
          </nav>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
      </header>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-8 right-8 text-white" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold tracking-widest uppercase">O Evento</a>
            <a href="#palestrante" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold tracking-widest uppercase">Palestrante</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold tracking-widest uppercase">Dúvidas</a>
            <a
              href="#ingresso"
              onClick={() => setIsMenuOpen(false)}
              className="px-10 py-4 bg-[#B99052] text-black font-bold uppercase tracking-widest rounded-full"
            >
              Garantir Vaga
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#B99052]/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#B99052]/50"></div>
              <span className="text-[#B99052] text-xs font-bold uppercase tracking-[0.3em]">EVENTO PRESENCIAL</span>
              <div className="h-[1px] w-12 bg-[#B99052]/50"></div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-wider uppercase">
              TREINAMENTO PRESENCIAL<br />
              <span className="text-[#B99052]">EM PORTO ALEGRE</span>
            </h1>

            <h2 className="text-xl md:text-2xl font-bold text-white/80 uppercase tracking-widest mb-6">
              POSICIONAMENTO, MARKETING E VENDAS
            </h2>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 font-light tracking-wide leading-relaxed">
              Você será visto como <span className="text-white font-semibold">autoridade no seu nicho</span> e irá{" "}
              <span className="text-white font-semibold">atrair os clientes certos</span> para o seu negócio
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full bg-white/5">
                <Calendar className="text-[#B99052]" size={20} />
                <span className="text-sm font-medium tracking-wide">📅 28 de Maio às 19:30</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full bg-white/5">
                <MapPin className="text-[#B99052]" size={20} />
                <span className="text-sm font-medium tracking-wide">📍 Bairro Glória — Porto Alegre</span>
              </div>
            </div>

            <a
              href="#ingresso"
              className="inline-block px-12 py-5 bg-[#B99052] text-black font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#D4AF37] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#B99052]/20 mb-6"
            >
              QUERO GARANTIR MINHA VAGA
            </a>

            <p className="text-gray-500 text-sm uppercase tracking-widest">Pablo Pitani — Aliança Empreendedora</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Dor — Você se identifica? */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wider">
              Você se identifica com isso? <span className="text-[#B99052]">✦</span>
            </h2>
          </AnimatedSection>

          <AnimatedList className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-4 p-6 bg-zinc-900/50 border border-white/5 rounded-2xl"
              >
                <span className="text-2xl flex-shrink-0">❌</span>
                <p className="text-gray-300 leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </AnimatedList>
        </div>
      </section>

      {/* Tema do Evento */}
      <section id="sobre" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-[#B99052] font-bold uppercase tracking-[0.3em] mb-4 block text-sm">TEMA DO PRÓXIMO EVENTO:</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight uppercase">
                FOUNDER<br />
                <span className="text-[#B99052]">LED GROWTH</span>
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Uma estratégia em que o fundador da empresa impulsiona a expansão dos negócios tornando-se a principal voz e o rosto da marca, usando credibilidade pessoal e conhecimento para construir confiança, gerar leads e criar uma forte conexão com os clientes.
              </p>
            </AnimatedSection>

            <AnimatedSection className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://pablopitani.com.br/wp-content/uploads/2025/12/590402507_18054759968653478_5220481283472751031_n-e1767046847737.jpg"
                  alt="Founder Led Growth"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features do Evento */}
      <section className="py-24 border-y border-white/5 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#B99052] font-bold uppercase tracking-[0.3em] text-sm block mb-4">O QUE TERÁ NO EVENTO:</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wider">O que você vai aprender <span className="text-[#B99052]">✦</span></h2>
            <div className="w-24 h-1 bg-[#B99052] mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {eventFeatures.map((feature, i) => (
              <AnimatedSection key={i} className="group p-8 bg-zinc-900/50 border border-white/5 rounded-3xl hover:border-[#B99052]/30 transition-all">
                <div className="mb-6 overflow-hidden rounded-2xl aspect-video">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4 tracking-wider">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section className="py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <span className="text-[#B99052] font-bold uppercase tracking-[0.3em] text-sm block mb-4">MOMENTOS DO EVENTO:</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">Fotos do evento <span className="text-[#B99052]">✦</span></h2>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {photos.map((photo, i) => (
              <div key={i} className="embla__slide flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_30%] min-w-0 pl-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                  <img src={photo} alt={"Evento " + (i + 1)} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vídeos / Reels */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#B99052] font-bold uppercase tracking-[0.3em] text-sm block mb-4">VEJA COMO É:</span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider">O evento em vídeo <span className="text-[#B99052]">✦</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {reels.map((src, i) => (
              <AnimatedSection key={i} className="aspect-[9/16] rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  src={src}
                  title={`Reel do evento Aliança Empreendedora ${i + 1}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  scrolling="no"
                ></iframe>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#B99052] font-bold uppercase tracking-[0.3em] text-sm block mb-4">DEPOIMENTOS:</span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider">O que estão falando <span className="text-[#B99052]">✦</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} className="p-10 bg-zinc-900/50 border border-white/5 rounded-3xl relative">
                <MessageCircle className="text-[#B99052] mb-4" size={28} />
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#B99052" color="#B99052" />)}
                </div>
                <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#B99052]/20 border border-[#B99052]/40 rounded-full flex items-center justify-center">
                    <span className="text-[#B99052] font-bold text-sm">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white uppercase tracking-widest text-sm">{t.name}</p>
                    <p className="text-[#B99052] text-xs font-medium mt-0.5">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quote + CTA / Ingresso */}
      <section id="ingresso" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#B99052]/5 -z-10"></div>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 max-w-4xl mx-auto leading-tight">
            O problema não é o que você vende. É como{" "}
            <span className="text-[#B99052]">você está se posicionando.</span>
          </h2>

          <div className="inline-block p-8 bg-zinc-900 border border-[#B99052]/20 rounded-3xl w-full max-w-md text-left">
            <span className="text-[#B99052] font-bold uppercase tracking-widest text-xs block mb-4">GARANTA SEU INGRESSO:</span>
            <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-2">Lotes esgotando — garanta o seu agora</p>
            <div className="text-5xl font-bold text-[#B99052] mb-2 text-center">R$ 149,00</div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest mb-2">
              <span className="text-gray-500">Lote vendido</span>
              <span className="text-[#B99052]">68%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
              <div className="w-[68%] h-full bg-[#B99052]"></div>
            </div>
            <a
              href="http://wa.me/5551999804338"
              className="block w-full py-4 bg-[#B99052] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#D4AF37] transition-all text-center mb-3"
            >
              QUERO MEU INGRESSO
            </a>
            <a
              href="https://wa.me/5551999804338"
              className="flex items-center justify-center gap-3 w-full py-4 border border-[#25D366] text-[#25D366] font-bold uppercase tracking-widest rounded-xl hover:bg-[#25D366]/10 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Quero falar com um atendente
            </a>
            <p className="text-gray-600 text-xs mt-3 text-center">Ao clicar, você será redirecionado ao WhatsApp</p>
          </div>
        </div>
      </section>

      {/* Palestrante */}
      <section id="palestrante" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                  <img
                    src="https://pablopitani.com.br/wp-content/uploads/elementor/thumbs/ChatGPT-Image-29-de-dez.-de-2025-19_36_48-rgw2gstnvxpfzssl7zts9aj0qakzo7spixh7mak8l8.png"
                    alt="Pablo Pitani"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-zinc-900 border border-white/10 p-6 rounded-2xl hidden md:block">
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#B99052" color="#B99052" />)}
                  </div>
                  <p className="text-white font-bold text-sm uppercase tracking-widest">Especialista em Posicionamento</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <span className="text-[#B99052] font-bold uppercase tracking-[0.3em] mb-4 block text-sm">QUEM SERÁ O MENTOR:</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Pablo Pitani</h2>
              <p className="text-xl text-gray-400 mb-8 font-light italic">Especialista em Posicionamento Estratégico</p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Com mais de 25 anos de experiência prática e trajetória acadêmica na área da Psicologia, Pablo Pitani é uma referência na transformação de empreendedores que buscam crescimento com autenticidade, propósito e consistência estratégica. Especialista em posicionamento empresarial, ele une profundo domínio do comportamento humano com inteligência de mercado para estruturar marcas pessoais sólidas, coerentes e altamente competitivas. Mais de 15 mil pessoas já foram impactadas por seus ensinamentos.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-2xl font-bold text-[#B99052]">25+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Anos de Experiência</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-2xl font-bold text-[#B99052]">15.000+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Pessoas Impactadas</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <p className="text-2xl font-bold text-[#B99052]">🎓</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Psicólogo e Especialista</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <span className="text-[#B99052] font-bold uppercase tracking-[0.3em] text-sm block mb-4">LOCAL DO EVENTO:</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase">Onde acontece <span className="text-[#B99052]">✦</span></h2>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📍</span>
              <p className="text-gray-300 text-lg">Av. Sergipe, 121 – Bairro Glória – Porto Alegre/RS, 91720-110</p>
            </div>
            <p className="text-gray-600 text-sm mb-8">Clique no mapa para abrir no Google Maps</p>

            <a
              href="https://maps.google.com/?q=Av+Sergipe+121+Bairro+Gloria+Porto+Alegre+RS"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-3xl overflow-hidden border border-white/10 hover:border-[#B99052]/40 transition-all"
            >
              <img
                src="https://pablopitani.com.br/wp-content/uploads/2025/07/mapa-sergipe-1-por-1.png"
                alt="Mapa do evento - Av. Sergipe 121, Bairro Glória, Porto Alegre"
                className="w-full object-cover"
              />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-16">
            <span className="text-[#B99052] font-bold uppercase tracking-[0.3em] text-sm block mb-4">DÚVIDAS FREQUENTES:</span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase">FAQ <span className="text-[#B99052]">✦</span></h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors">
                  <span className="font-bold text-lg pr-4">{faq.q}</span>
                  <ChevronDown className="text-[#B99052] transition-transform group-open:rotate-180 flex-shrink-0" />
                </summary>
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-black text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase">Garanta sua vaga agora</h2>
          <p className="text-gray-400 mb-10 text-lg">Lotes esgotando — não perca essa oportunidade</p>
          <a
            href="#ingresso"
            className="inline-block px-12 py-5 bg-[#B99052] text-black font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#D4AF37] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#B99052]/20"
          >
            QUERO MEU INGRESSO
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#B99052] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-lg tracking-widest uppercase">ALIANÇA</span>
          </div>
          <p className="text-gray-500 text-sm">Todos os direitos reservados a <strong className="text-white">Pablo Pitani</strong></p>
        </div>
      </footer>

      {/* Botão Flutuante WhatsApp */}
      <a
        href="https://wa.me/5551999804338"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
