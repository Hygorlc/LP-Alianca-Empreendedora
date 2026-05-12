import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ChevronDown, CheckCircle, Mic, BarChart2, Users, Star, MessageCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const GOLD = "#B99052";

function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 60, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const state = useRef({ wordIndex: 0, isDeleting: false, displayed: "" });
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function tick() {
      const { wordIndex, isDeleting } = state.current;
      const current = words[wordIndex % words.length];
      const cur = state.current.displayed;

      if (!isDeleting) {
        const next = current.slice(0, cur.length + 1);
        state.current.displayed = next;
        setDisplayed(next);
        if (next === current) {
          state.current.isDeleting = true;
          timeout.current = setTimeout(tick, pauseMs);
        } else {
          timeout.current = setTimeout(tick, typingSpeed);
        }
      } else {
        const next = current.slice(0, cur.length - 1);
        state.current.displayed = next;
        setDisplayed(next);
        if (next === "") {
          state.current.isDeleting = false;
          state.current.wordIndex = (wordIndex + 1) % words.length;
          timeout.current = setTimeout(tick, typingSpeed);
        } else {
          timeout.current = setTimeout(tick, deletingSpeed);
        }
      }
    }
    timeout.current = setTimeout(tick, typingSpeed);
    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, []);

  return displayed;
}

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
    title: "PALESTRA",
    desc: "Serão 2h de palestra com conteúdo profundo e estratégico, pensado para empresários que querem aplicar tudo na prática. Você aprenderá como atrair mais clientes qualificados, fortalecer seu posicionamento e se diferenciar da concorrência com métodos claros e aplicáveis ao seu negócio.",
  },
  {
    icon: <BarChart2 size={32} color={GOLD} />,
    title: "ANÁLISE DE POSICIONAMENTO",
    desc: "Vamos analisar perfis reais do Instagram ao vivo e mostrar, na prática, o que está funcionando e o que precisa ser ajustado. Você vai entender como melhorar sua comunicação, fortalecer seu posicionamento e tornar seu perfil mais atrativo para clientes certos, transformando seguidores em oportunidades reais de negócio.",
  },
  {
    icon: <Users size={32} color={GOLD} />,
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
  "https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_7706-1024x683-3.webp",
  "https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_8103-2-1024x683.webp",
  "https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_8202-2-1024x683.webp",
  "https://pablopitani.com.br/wp-content/uploads/2025/08/ALIANCA-EMPREENDEDORA-networking-scaled-e1755548208782-1024x429.webp",
];

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "Empresário",
    text: "O evento transformou a forma como eu me comunico com meus clientes. Pablo tem uma didática incrível e os resultados foram imediatos no meu negócio.",
    stars: 5,
    avatar: "https://ui-avatars.com/api/?name=Carlos+Mendes&background=B99052&color=fff&size=80&bold=true&font-size=0.4",
  },
  {
    name: "Fernanda Lima",
    role: "Empreendedora Digital",
    text: "Nunca imaginei que em 3 horas eu poderia entender tudo que estava faltando no meu posicionamento. Valeu muito cada centavo investido.",
    stars: 5,
    avatar: "https://ui-avatars.com/api/?name=Fernanda+Lima&background=B99052&color=fff&size=80&bold=true&font-size=0.4",
  },
  {
    name: "Ricardo Santos",
    role: "Consultor",
    text: "A análise de posicionamento ao vivo foi reveladora. Saí com um plano claro de ação e já estou implementando. Recomendo a todos os empresários.",
    stars: 5,
    avatar: "https://ui-avatars.com/api/?name=Ricardo+Santos&background=B99052&color=fff&size=80&bold=true&font-size=0.4",
  },
];

const faqs = [
  {
    q: "Onde será o evento?",
    a: "Av. Sergipe, 121 – Glória, Porto Alegre – RS, 91720-110",
  },
  {
    q: "Quando será o evento?",
    a: "O evento irá acontecer dia 14 de Maio de 2026 às 19:30",
  },
  {
    q: "Quanto tempo irá durar o evento?",
    a: "O evento irá durar 3 horas.",
  },
];

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 justify-center my-2">
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <div style={{ width: 8, height: 8, background: GOLD, transform: "rotate(45deg)" }} />
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

function HeroVideo() {
  const [playing, setPlaying] = useState(false);

  const src = `https://www.youtube.com/embed/idRuRg9-n8o?start=28&autoplay=1&mute=0&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&loop=1&playlist=idRuRg9-n8o&disablekb=1`;

  return (
    <div
      className="relative rounded-2xl overflow-hidden w-80 md:w-[440px] lg:w-[580px]"
      style={{
        border: `2px solid rgba(185,144,82,0.4)`,
        boxShadow: "0 0 60px rgba(185,144,82,0.2)",
        aspectRatio: "16/9",
      }}
    >
      {/* Thumbnail + play overlay — shown until user clicks */}
      {!playing && (
        <button
          onClick={() => setPlaying(true)}
          aria-label="Reproduzir vídeo"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            padding: 0,
            cursor: "pointer",
            zIndex: 10,
            background: "transparent",
          }}
        >
          <img
            src="https://img.youtube.com/vi/idRuRg9-n8o/maxresdefault.jpg"
            alt="Pablo Pitani"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Play button */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: GOLD,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 32px rgba(185,144,82,0.6)`,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#000">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        </button>
      )}

      {/* iframe — only mounted after user clicks, starts with sound */}
      {playing && (
        <>
          <iframe
            src={src}
            title="Pablo Pitani — Aliança Empreendedora"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: "-14%",
              left: "-5%",
              width: "110%",
              height: "128%",
              border: "none",
              zIndex: 2,
            }}
            data-testid="video-hero-youtube"
          />
          {/* Overlay — blocks hover so YouTube UI never shows */}
          <div style={{ position: "absolute", inset: 0, zIndex: 10, cursor: "default" }} />
        </>
      )}
    </div>
  );
}

function HeroSection() {
  const typed = useTypewriter(["EM PORTO ALEGRE"], 90, 55, 2200);
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 30% 50%, #1a1200 0%, #0d0d0d 60%, #000 100%)",
      }}
    >
      {/* Diagonal lines texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(185,144,82,0.04) 60px, rgba(185,144,82,0.04) 61px)",
        }}
      />
      {/* Gold glow top left */}
      <div
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(185,144,82,0.15) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center lg:items-start gap-12">
        {/* Text content */}
        <div className="flex-1 w-full text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
              <div style={{ width: 40, height: 2, background: GOLD }} />
              <span style={{ color: GOLD, fontSize: 12, letterSpacing: "0.2em", fontFamily: "Montserrat" }} className="uppercase font-semibold">
                Evento Presencial
              </span>
            </div>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 uppercase"
              style={{ fontFamily: "GFS Didot, Georgia, serif", color: "#fff" }}
            >
              <span className="block">TREINAMENTO PRESENCIAL</span>
              <span
                className="block"
                style={{
                  color: GOLD,
                  minHeight: "1.2em",
                  display: "block",
                }}
              >
                {typed}
              </span>
              <span className="block">POSICIONAMENTO, MARKETING E VENDAS</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0" style={{ fontFamily: "Montserrat" }}>
              Você será visto como{" "}
              <span style={{ color: GOLD }} className="font-semibold">autoridade no seu nicho</span>{" "}
              e irá{" "}
              <span style={{ color: GOLD }} className="font-semibold">atrair os clientes certos</span>{" "}
              para o seu negócio
            </p>

            {/* Event badges */}
            <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-lg"
                style={{ border: `1px solid ${GOLD}`, background: "rgba(185,144,82,0.08)" }}
              >
                <Calendar size={18} color={GOLD} />
                <div>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: "Montserrat" }}>14 de Maio às 19:30</p>
                </div>
              </div>
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-lg"
                style={{ border: `1px solid ${GOLD}`, background: "rgba(185,144,82,0.08)" }}
              >
                <MapPin size={18} color={GOLD} />
                <div>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: "Montserrat" }}>Bairro Glória</p>
                  <p style={{ color: GOLD, fontSize: 12, fontFamily: "Montserrat" }}>Porto Alegre</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-start">
              <motion.a
                href="#ingresso"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-10 py-4 text-base font-bold uppercase tracking-widest rounded-lg transition-all"
                style={{
                  fontFamily: "Montserrat",
                  color: GOLD,
                  border: `2px solid ${GOLD}`,
                  background: "rgba(185,144,82,0.1)",
                  boxShadow: `0 0 24px rgba(185,144,82,0.35), 0 0 48px rgba(185,144,82,0.1)`,
                  letterSpacing: "0.12em",
                }}
                data-testid="button-hero-cta"
              >
                Quero garantir minha vaga
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Hero video */}
        <motion.div
          className="flex-none flex justify-center w-full lg:w-auto lg:justify-end lg:sticky lg:top-24"
          style={{ marginTop: "0" }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <HeroVideo />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={28} color={GOLD} />
      </motion.div>
    </section>
  );
}

function PainPointsSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <h2
            className="text-3xl md:text-4xl text-center mb-4"
            style={{ fontFamily: "GFS Didot, Georgia, serif", color: GOLD }}
          >
            Você se identifica com isso?
          </h2>
          <GoldDivider />
        </AnimatedSection>

        <AnimatedList className="mt-12 space-y-4">
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-4 px-6 py-5 rounded-lg"
              style={{
                background: "rgba(185,144,82,0.05)",
                border: "1px solid rgba(185,144,82,0.2)",
                borderLeft: `3px solid ${GOLD}`,
              }}
              data-testid={`text-pain-point-${i}`}
            >
              <CheckCircle size={22} color={GOLD} className="mt-0.5 shrink-0" />
              <p className="text-gray-200 text-base leading-relaxed" style={{ fontFamily: "Montserrat" }}>
                {point}
              </p>
            </motion.div>
          ))}
        </AnimatedList>
      </div>
    </section>
  );
}

function ThemeSection() {
  return (
    <section
      className="py-24 px-6 diagonal-texture"
      style={{ background: "linear-gradient(135deg, #0f0d06 0%, #0d0d0d 50%, #080600 100%)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <AnimatedSection className="flex-1">
          <p
            className="uppercase text-sm tracking-widest mb-4"
            style={{ color: GOLD, fontFamily: "Montserrat", letterSpacing: "0.2em" }}
          >
            Tema do próximo evento:
          </p>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-none"
            style={{ fontFamily: "GFS Didot, Georgia, serif", color: "#fff" }}
          >
            FOUNDER
            <br />
            <span style={{ color: GOLD }}>LED GROWTH</span>
          </h2>
          <GoldDivider />
          <p className="text-gray-300 text-base leading-relaxed mt-6" style={{ fontFamily: "Montserrat" }}>
            Uma estratégia em que o fundador da empresa impulsiona a expansão dos negócios tornando-se a
            principal voz e o rosto da marca, usando credibilidade pessoal e conhecimento para construir
            confiança, gerar leads e criar uma forte conexão com os clientes.
          </p>
        </AnimatedSection>

        <AnimatedSection className="flex-1">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: `1px solid rgba(185,144,82,0.3)`,
              boxShadow: "0 0 40px rgba(185,144,82,0.15)",
            }}
          >
            <img
              src="https://pablopitani.com.br/wp-content/uploads/2025/12/590402507_18054759968653478_5220481283472751031_n-e1767046847737.jpg"
              alt="Founder Led Growth"
              className="w-full h-80 object-cover"
              data-testid="img-theme-event"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#0d0d0d" }}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="uppercase text-sm tracking-widest mb-2" style={{ color: GOLD, fontFamily: "Montserrat", letterSpacing: "0.2em" }}>
            O que terá no evento:
          </p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "GFS Didot, Georgia, serif", color: "#fff" }}>
            O que você vai aprender
          </h2>
          <GoldDivider />
        </AnimatedSection>

        <AnimatedList className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventFeatures.map((feat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-8 rounded-2xl flex flex-col gap-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(185,144,82,0.25)`,
                boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
              }}
              data-testid={`card-feature-${i}`}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(185,144,82,0.12)", border: `1px solid rgba(185,144,82,0.3)` }}
              >
                {feat.icon}
              </div>
              <h3
                className="text-lg font-bold tracking-wide"
                style={{ color: GOLD, fontFamily: "Montserrat", letterSpacing: "0.08em" }}
              >
                {feat.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "Montserrat" }}>
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </AnimatedList>
      </div>
    </section>
  );
}

function PhotosSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  return (
    <section className="py-24 px-6" style={{ background: "#080808" }}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="uppercase text-sm tracking-widest mb-2" style={{ color: GOLD, fontFamily: "Montserrat", letterSpacing: "0.2em" }}>
            Momentos do evento:
          </p>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "GFS Didot, Georgia, serif", color: "#fff" }}>
            Fotos do evento
          </h2>
          <GoldDivider />
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex gap-4">
              {photos.map((src, i) => (
                <div
                  key={i}
                  className="shrink-0 rounded-xl overflow-hidden"
                  style={{ flex: "0 0 calc(100% - 1rem)", maxWidth: "calc(66.666% - 1rem)" }}
                  data-testid={`img-photo-${i}`}
                >
                  <img
                    src={src}
                    alt={`Foto do evento ${i + 1}`}
                    className="w-full h-64 md:h-96 object-cover"
                    style={{ borderRadius: 12 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ReelSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#0d0d0d" }}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="uppercase text-sm tracking-widest mb-2" style={{ color: GOLD, fontFamily: "Montserrat", letterSpacing: "0.2em" }}>
            Veja como é:
          </p>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "GFS Didot, Georgia, serif", color: "#fff" }}>
            O evento em vídeo
          </h2>
          <GoldDivider />
        </AnimatedSection>

        <AnimatedList className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: "DVMehuniAIe", testId: "embed-instagram-reel-1" },
            { id: "DWpBzHVk1Bb", testId: "embed-instagram-reel-2" },
            { id: "DWzbWqxiNT-", testId: "embed-instagram-reel-3" },
          ].map((reel) => (
            <motion.div
              key={reel.id}
              variants={fadeUp}
              className="rounded-2xl w-full"
              style={{
                border: `1px solid rgba(185,144,82,0.3)`,
                boxShadow: "0 0 40px rgba(185,144,82,0.15)",
                overflow: "hidden",
                position: "relative",
                height: 360,
              }}
              data-testid={reel.testId}
            >
              <iframe
                src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                style={{
                  border: "none",
                  display: "block",
                  width: "100%",
                  height: 760,
                  position: "absolute",
                  top: -56,
                  left: 0,
                }}
                allowFullScreen
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                title="Reel do evento Aliança Empreendedora"
              />
              {/* Overlay to block Instagram hover header */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 80,
                  zIndex: 10,
                  cursor: "default",
                }}
              />
            </motion.div>
          ))}
        </AnimatedList>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 px-6 diagonal-texture" style={{ background: "#0a0800" }}>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="uppercase text-sm tracking-widest mb-2" style={{ color: GOLD, fontFamily: "Montserrat", letterSpacing: "0.2em" }}>
            Depoimentos:
          </p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "GFS Didot, Georgia, serif", color: "#fff" }}>
            O que estão falando
          </h2>
          <GoldDivider />
        </AnimatedSection>

        <AnimatedList className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-8 rounded-2xl flex flex-col gap-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(185,144,82,0.2)`,
              }}
              data-testid={`card-testimonial-${i}`}
            >
              <MessageCircle size={24} color={GOLD} />
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} fill={GOLD} color={GOLD} />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic" style={{ fontFamily: "Montserrat" }}>
                "{t.text}"
              </p>
              <div className="mt-auto pt-4 flex items-center gap-3" style={{ borderTop: "1px solid rgba(185,144,82,0.2)" }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="rounded-full flex-shrink-0"
                  style={{ width: 40, height: 40, border: `2px solid ${GOLD}`, objectFit: "cover" }}
                />
                <div>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: "Montserrat" }}>{t.name}</p>
                  <p className="text-sm" style={{ color: GOLD, fontFamily: "Montserrat" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatedList>
      </div>
    </section>
  );
}

function StatementSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section
      className="py-28 px-6"
      style={{ background: "linear-gradient(135deg, #0d0a04 0%, #0d0d0d 100%)" }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div style={{ color: GOLD, fontSize: 48, lineHeight: 1, marginBottom: 16 }}>"</div>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
          style={{ fontFamily: "GFS Didot, Georgia, serif", color: "#fff" }}
        >
          O problema não é o que você vende.{" "}
          <span style={{ color: GOLD }}>É como você está se posicionando.</span>
        </h2>
        <div style={{ color: GOLD, fontSize: 48, lineHeight: 1, marginTop: 8, transform: "rotate(180deg)" }}>"</div>
        <motion.a
          href="#ingresso"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block mt-10 px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-lg"
          style={{
            fontFamily: "Montserrat",
            color: GOLD,
            border: `2px solid ${GOLD}`,
            background: "rgba(185,144,82,0.1)",
            boxShadow: `0 0 24px rgba(185,144,82,0.3)`,
            letterSpacing: "0.12em",
          }}
          data-testid="button-statement-cta"
        >
          Quero resolver isso
        </motion.a>
      </motion.div>
    </section>
  );
}

function TicketSection() {
  return (
    <section id="ingresso" className="py-24 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <p className="uppercase text-sm tracking-widest mb-2" style={{ color: GOLD, fontFamily: "Montserrat", letterSpacing: "0.2em" }}>
            Garanta seu ingresso:
          </p>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "GFS Didot, Georgia, serif", color: "#fff" }}>
            Valor do ingresso:
          </h2>
          <GoldDivider />

          <div className="mt-10 mb-2">
            <p className="text-7xl md:text-8xl font-bold" style={{ color: GOLD, fontFamily: "GFS Didot, Georgia, serif" }}>
              R$ 149,00
            </p>
          </div>
          <p className="text-sm text-gray-400 mb-8" style={{ fontFamily: "Montserrat" }}>
            Lotes esgotando — garanta o seu agora
          </p>

          {/* Progress bar */}
          <div className="mb-2 flex justify-between items-center px-1">
            <span className="text-xs text-gray-400" style={{ fontFamily: "Montserrat" }}>Lote vendido</span>
            <span className="text-sm font-bold" style={{ color: GOLD, fontFamily: "Montserrat" }}>68%</span>
          </div>
          <div
            className="w-full h-3 rounded-full mb-10 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(185,144,82,0.2)" }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "68%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${GOLD}, #d4a853)`, boxShadow: `0 0 12px rgba(185,144,82,0.6)` }}
            />
          </div>

          <motion.a
            href="http://wa.me/5551999804338"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-14 py-5 text-base font-bold uppercase tracking-widest rounded-xl"
            style={{
              fontFamily: "Montserrat",
              color: "#0d0d0d",
              background: `linear-gradient(135deg, ${GOLD}, #c9a060, ${GOLD})`,
              boxShadow: `0 0 32px rgba(185,144,82,0.5), 0 0 64px rgba(185,144,82,0.2)`,
              letterSpacing: "0.1em",
            }}
            data-testid="button-buy-ticket"
          >
            Quero meu ingresso
          </motion.a>

          <motion.a
            href="https://wa.me/5551999804338"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 inline-flex items-center gap-3 px-10 py-4 text-sm font-semibold rounded-xl"
            style={{
              fontFamily: "Montserrat",
              color: "#fff",
              background: "#4a6741",
              border: "1px solid #5a7a50",
              boxShadow: "0 0 20px rgba(74,103,65,0.4)",
              letterSpacing: "0.04em",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Quero falar com um atendente
          </motion.a>

          <p className="mt-6 text-xs text-gray-500" style={{ fontFamily: "Montserrat" }}>
            Ao clicar, você sera redirecionado ao WhatsApp
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function MentorSection() {
  return (
    <section
      className="py-24 px-6 diagonal-texture"
      style={{ background: "linear-gradient(135deg, #0f0d06 0%, #0d0d0d 60%, #0a0800 100%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="uppercase text-sm tracking-widest mb-2" style={{ color: GOLD, fontFamily: "Montserrat", letterSpacing: "0.2em" }}>
            Quem será o mentor:
          </p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "GFS Didot, Georgia, serif", color: "#fff" }}>
            Pablo Pitani
          </h2>
          <GoldDivider />
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <AnimatedSection className="flex-none">
            <div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden"
              style={{
                border: `3px solid ${GOLD}`,
                boxShadow: `0 0 40px rgba(185,144,82,0.3), 0 0 80px rgba(185,144,82,0.1)`,
              }}
            >
              <img
                src="https://pablopitani.com.br/wp-content/uploads/elementor/thumbs/ChatGPT-Image-29-de-dez.-de-2025-19_36_48-rgw2gstnvxpfzssl7zts9aj0qakzo7spixh7mak8l8.png"
                alt="Pablo Pitani"
                className="w-full h-full object-cover"
                data-testid="img-mentor"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection className="flex-1">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: GOLD, fontFamily: "Montserrat", letterSpacing: "0.05em" }}
            >
              Especialista em Posicionamento Estratégico
            </h3>
            <p className="text-gray-300 leading-relaxed mb-8" style={{ fontFamily: "Montserrat", lineHeight: 1.9 }}>
              Com mais de 25 anos de experiência prática e trajetória acadêmica na área da Psicologia, Pablo
              Pitani é uma referência na transformação de empreendedores que buscam crescimento com autenticidade,
              propósito e consistência estratégica. Especialista em posicionamento empresarial, ele une profundo
              domínio do comportamento humano com inteligência de mercado para estruturar marcas pessoais sólidas,
              coerentes e altamente competitivas. Mais de 15 mil pessoas já foram impactadas por seus ensinamentos.
            </p>
            <div className="flex flex-wrap gap-4">
              {["25+ Anos de Experiência", "15.000+ Pessoas Impactadas", "Psicólogo e Especialista"].map((badge, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    color: GOLD,
                    border: `1px solid rgba(185,144,82,0.4)`,
                    background: "rgba(185,144,82,0.08)",
                    fontFamily: "Montserrat",
                  }}
                  data-testid={`badge-mentor-${i}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#080808" }}>
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="uppercase text-sm tracking-widest mb-2" style={{ color: GOLD, fontFamily: "Montserrat", letterSpacing: "0.2em" }}>
            Local do evento:
          </p>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "GFS Didot, Georgia, serif", color: "#fff" }}>
            Onde acontece
          </h2>
          <GoldDivider />
          <p className="text-gray-300 mt-6 text-lg" style={{ fontFamily: "Montserrat" }}>
            Av. Sergipe, 121 – Bairro Glória – Porto Alegre/RS, 91720-110
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <a
            href="https://maps.google.com/?q=Av+Sergipe+121+Bairro+Gloria+Porto+Alegre+RS"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden hover:opacity-90 transition-opacity"
            style={{
              border: `1px solid rgba(185,144,82,0.3)`,
              boxShadow: "0 0 32px rgba(185,144,82,0.1)",
            }}
            data-testid="link-location-map"
          >
            <img
              src="https://pablopitani.com.br/wp-content/uploads/2025/07/mapa-sergipe-1-por-1.png"
              alt="Mapa do evento - Av. Sergipe 121, Bairro Glória, Porto Alegre"
              className="w-full max-h-96 object-cover"
            />
          </a>
          <p className="text-center text-sm mt-4" style={{ color: GOLD, fontFamily: "Montserrat" }}>
            Clique no mapa para abrir no Google Maps
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="uppercase text-sm tracking-widest mb-2" style={{ color: GOLD, fontFamily: "Montserrat", letterSpacing: "0.2em" }}>
            Dúvidas frequentes:
          </p>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "GFS Didot, Georgia, serif", color: "#fff" }}>
            FAQ
          </h2>
          <GoldDivider />
        </AnimatedSection>

        <AnimatedList className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${open === i ? GOLD : "rgba(185,144,82,0.2)"}`,
                background: open === i ? "rgba(185,144,82,0.07)" : "rgba(255,255,255,0.02)",
                transition: "border-color 0.3s",
              }}
              data-testid={`faq-item-${i}`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                data-testid={`button-faq-${i}`}
              >
                <span className="font-semibold text-white" style={{ fontFamily: "Montserrat" }}>
                  {faq.q}
                </span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={20} color={GOLD} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-300 text-sm leading-relaxed" style={{ fontFamily: "Montserrat" }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatedList>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 text-center" style={{ background: "#050505" }}>
      <GoldDivider />
      <div className="mt-8">
        <p
          className="text-sm"
          style={{ color: "#555", fontFamily: "Montserrat" }}
          data-testid="text-footer-copyright"
        >
          Todos os direitos reservados a{" "}
          <span style={{ color: GOLD }}>Pablo Pitani</span>
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0d0d0d" }}>
      <HeroSection />
      <PainPointsSection />
      <ThemeSection />
      <FeaturesSection />
      <PhotosSection />
      <ReelSection />
      <TestimonialsSection />
      <StatementSection />
      <TicketSection />
      <MentorSection />
      <LocationSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
