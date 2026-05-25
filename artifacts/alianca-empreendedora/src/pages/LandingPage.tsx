import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ChevronDown, CheckCircle, Mic, BarChart2, Users, Star, MessageCircle, X } from "lucide-react";
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
  "Por que o cliente que pergunta o preço primeiro nunca compra, e o que fazer para inverter essa ordem.",
  "Como cobrar mais que o concorrente que sabe menos que você, sem perder venda (a maioria erra justamente aqui)",
  "O método RCV de posicionamento que faz o cliente certo te procurar antes de você ir atrás dele",
  "A diferença entre vender o que você faz e vender quem você é - e por que só uma das duas paga as contas e escala o faturamento do seu negócio.",
  "O motivo real do teu Instagram não trazer cliente (não tem a ver com algoritmo, edição ou frequência de post)",
];

const eventFeatures = [
  {
    icon: <Mic size={32} color={GOLD} />,
    image: "https://pablopitani.com.br/wp-content/uploads/2026/05/FOTOS-7-12.png",
    title: "PALESTRA",
    desc: "2 horas de imersão prática no método que separa empresários comuns dos que são vistos como referência. Você vai entender por que a maioria está vendendo o produto errado e como construir uma percepção de valor que faz o cliente parar de comparar preço e começar a comparar autoridade.",
  },
  {
    icon: <BarChart2 size={32} color={GOLD} />,
    image: "https://pablopitani.com.br/wp-content/uploads/2026/05/PANA6098-scaled.jpg",
    title: "ANÁLISE DE POSICIONAMENTO",
    desc: "Vamos abrir alguns perfis ao vivo e mostrar, sem rodeio, o que está fazendo o teu cliente certo passar reto. Você vai sair com clareza cirúrgica do que precisa mudar na tua comunicação pra começar a atrair quem paga pelo que você entrega, e não pelo menor preço do mercado.",
  },
  {
    icon: <Users size={32} color={GOLD} />,
    image: "https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_7691-1024x683-2.webp",
    title: "NETWORKING",
    desc: "Você vai estar na mesma sala com empresários do Rio Grande do Sul que estão construindo posicionamento sério, não amadores buscando dica fácil. É o tipo de ambiente onde nasce parceria, indicação e contrato real, porque a sala foi filtrada pelo próprio conteúdo do evento.",
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
];

const testimonials = [
  {
    name: "Marcos Renner",
    role: "Empresário no ramo da advocacia.",
    text: "O evento foi transformador. O Pablo tem uma metodologia única que me ajudou a reposicionar meu escritório e atrair clientes muito mais qualificados.",
  },
  {
    name: "Gersiedma Malaquias",
    role: "Empresária no ramo da estética.",
    text: "Depois do evento, entendi exatamente o que precisava mudar no meu posicionamento. Os resultados vieram rápido e já estou atraindo clientes melhores.",
  },
];

const faqs = [
  {
    q: "Essa palestra serve pra qualquer tipo de negócio?",
    a: "Serve pra qualquer empresário ou profissional liberal que vende seu trabalho e quer parar de competir por preço. Já passaram pela sala advogados, médicos, esteticistas, arquitetos, consultores, donos de clínica, gestores de e-commerce e empresários do varejo. O método de posicionamento é universal, o que muda é a aplicação no seu nicho específico, que será trabalhada na análise ao vivo.",
  },
  {
    q: "O ingresso é mesmo válido pra duas pessoas?",
    a: "Sim. Por R$ 149 você pode trazer um sócio, sua esposa, seu marido, seu gerente de marketing ou quem você quiser que esteja envolvido nas decisões do seu negócio. Posicionamento muda quando a pessoa que decide junto com você está na mesma página.",
  },
  {
    q: "Essa palestra serve para qualquer tipo de negócio?",
    a: "Sim. As estratégias ensinadas podem ser adaptadas para negócios locais, serviços, infoprodutos, e-commerce e empresas tradicionais.",
  },
  {
    q: "E se eu não puder participar no dia, tem reembolso?",
    a: "A Aliança é presencial e tem vagas limitadas. Por isso pedimos pra você só garantir a vaga se tem certeza que vai estar lá. Em caso de imprevisto sério, entre em contato pelo WhatsApp e a equipe vai avaliar caso a caso.",
  },
  {
    q: "Vai ter espaço pra tirar dúvidas com o Pablo?",
    a: "Sim. Boa parte da palestra é prática e interativa, incluindo a análise ao vivo de perfis. Quem quer falar com o Pablo tem espaço pra isso ali, no momento exato em que o conteúdo ainda está fresco.",
  },
  {
    q: "Vai ter coffee?",
    a: "Sim, coffee e ambiente preparado pra você se conectar com os outros empresários presentes.",
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
            <span className="font-Cinzel text-xl tracking-widest hidden sm:block">ALIANÇA</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-sm uppercase tracking-widest hover:text-[#B99052] transition-colors">O Evento</a>
            <a href="#palestrante" className="text-sm uppercase tracking-widest hover:text-[#B99052] transition-colors">Palestrante</a>
            <a href="#faq" className="text-sm uppercase tracking-widest hover:text-[#B99052] transition-colors">Dúvidas</a>
            <a 
              href="https://pablopitani.com.br/alianca-empreendedora-forms/"
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
            <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="text-2xl font-Cinzel tracking-widest">O Evento</a>
            <a href="#palestrante" onClick={() => setIsMenuOpen(false)} className="text-2xl font-Cinzel tracking-widest">Palestrante</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)} className="text-2xl font-Cinzel tracking-widest">Dúvidas</a>
            <a 
              href="https://pablopitani.com.br/alianca-empreendedora-forms/"
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
            {/* Tag superior */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#B99052]/50"></div>
              <span className="text-[#B99052] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                Treinamento Presencial em Porto Alegre para Empresários Sérios e Comprometidos
              </span>
              <div className="h-[1px] w-12 bg-[#B99052]/50"></div>
            </div>

            {/* Título Principal */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-Cinzel font-bold mb-12 leading-tight tracking-wider max-w-5xl mx-auto uppercase">
              EM 2 HORAS EU VOU TE MOSTRAR COMO ATRAIR OS <span className="text-[#B99052]">CLIENTES QUE PAGAM CARO</span><br/>
              SEM RECLAMAR, ATRAVÉS DE UM <span className="text-[#B99052]">POSICIONAMENTO ÚNICO</span>,<br/>
              <span className="text-sm md:text-base tracking-[0.2em] font-normal underline underline-offset-8 decoration-[#B99052]">INDEPENDENTE DA SUA ÁREA DE TRABALHO.</span>
            </h1>

            {/* Vídeo/Imagem Central */}
            <div className="relative max-w-4xl mx-auto mb-12 group">
              <div className="aspect-video rounded-3xl overflow-hidden border-2 border-[#B99052]/30 shadow-[0_0_50px_rgba(185,144,82,0.15)] bg-zinc-900">
                <img 
                  src="https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_7691-1024x683-2.webp" 
                  alt="Pablo Pitani" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* Overlay de Play simulado na imagem */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-black/20 backdrop-blur-sm px-6 py-2 rounded-lg border border-white/10">
                      <span className="font-Cinzel text-white tracking-widest text-xl">bem vindo</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Subtítulo */}
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed">
              Quero fazer você ser visto como autoridade e nunca mais ter que<br/>
              implorar pra alguém comprar de você.
            </p>
            
            {/* Informações de Data e Local */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-3 px-6 py-3 border border-[#B99052]/30 rounded-xl bg-zinc-900/50 min-w-[240px] justify-center">
                <Calendar className="text-[#B99052]" size={18} />
                <span className="text-sm font-bold tracking-wide">28 de Maio às 19h 30</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 border border-[#B99052]/30 rounded-xl bg-zinc-900/50 min-w-[240px] justify-center">
                <MapPin className="text-[#B99052]" size={18} />
                <div className="text-left">
                  <p className="text-sm font-bold tracking-wide leading-none">Bairro Glória</p>
                  <p className="text-[10px] text-gray-500 font-bold mt-1">Porto Alegre</p>
                </div>
              </div>
            </div>

            {/* Botão Principal */}
            <a 
              href="https://pablopitani.com.br/alianca-empreendedora-forms/"
              className="inline-block px-12 py-5 border-2 border-[#B99052] text-[#B99052] font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-[#B99052] hover:text-black transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#B99052]/10"
            >
              Quero garantir minha vaga
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* O que você vai descobrir */}
      <section id="sobre" className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-5xl font-Cinzel font-bold mb-8 leading-tight">
                O que você vai descobrir nas <span className="text-[#B99052]">2 horas</span> da Aliança Presencial:
              </h2>
              <AnimatedList className="space-y-6">
                {painPoints.map((point, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
                    <div className="mt-1.5 w-5 h-5 bg-[#B99052]/20 border border-[#B99052]/40 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-[#B99052] rounded-full"></div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </AnimatedList>
            </AnimatedSection>
            
            <AnimatedSection className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_7691-1024x683-2.webp" 
                  alt="Networking Event" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#B99052] p-8 rounded-2xl shadow-2xl hidden md:block">
                <p className="text-black font-Cinzel font-bold text-2xl">Networking Real</p>
                <p className="text-black/80 text-sm">Empresários comprometidos</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features do Evento */}
      <section className="py-24 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-Cinzel font-bold mb-4 uppercase tracking-wider">O que terá no evento:</h2>
            <div className="w-24 h-1 bg-[#B99052] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {eventFeatures.map((feature, i) => (
              <AnimatedSection key={i} className="group p-8 bg-zinc-900/50 border border-white/5 rounded-3xl hover:border-[#B99052]/30 transition-all">
                <div className="mb-6 overflow-hidden rounded-2xl aspect-video">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-Cinzel font-bold mb-4 tracking-wider">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section className="py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-5xl font-Cinzel font-bold mb-4 uppercase">Fotos do evento:</h2>
            <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Vivencie a experiência Aliança</p>
          </div>
        </div>
        
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {photos.map((photo, i) => (
              <div key={i} className="embla__slide flex-[0_0_80%] sm:flex-[0_0_40%] lg:flex-[0_0_30%] min-w-0 pl-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                  <img src={photo} alt={"Evento " + i} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testemunhos */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-Cinzel font-bold mb-4 uppercase tracking-wider">O que estão falando:</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} className="p-10 bg-black border border-white/5 rounded-3xl relative">
                <Star className="text-[#B99052] mb-6" fill="#B99052" size={20} />
                <p className="text-lg text-gray-300 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-bold text-white uppercase tracking-widest text-sm">{t.name}</p>
                  <p className="text-[#B99052] text-xs font-medium mt-1">{t.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Meio */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#B99052]/5 -z-10"></div>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-Cinzel font-bold mb-8 max-w-4xl mx-auto">
            O problema não é o que você vende. É como <span className="text-[#B99052]">você está se posicionando.</span>
          </h2>
          <div className="inline-block p-8 bg-zinc-900 border border-[#B99052]/20 rounded-3xl mb-12">
            <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-4">Garanta o seu ingresso nessa condição especial:</p>
            <h3 className="text-2xl font-bold mb-2">Compre 2 ingressos pelo preço de 1</h3>
            <div className="text-5xl font-Cinzel font-bold text-[#B99052] mb-6">R$ 149,00</div>
            <a 
              href="https://pablopitani.com.br/alianca-empreendedora-forms/"
              className="block w-full py-4 bg-[#B99052] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#D4AF37] transition-all"
            >
              Quero garantir minha vaga
            </a>
            <div className="mt-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
              <span className="text-gray-500">Ingressos vendidos</span>
              <span className="text-[#B99052]">68%</span>
            </div>
            <div className="mt-2 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="w-[68%] h-full bg-[#B99052]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Palestrante */}
      <section id="palestrante" className="py-24 bg-black">
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
              <p className="text-[#B99052] font-bold uppercase tracking-[0.3em] mb-4">Quem será o palestrante:</p>
              <h2 className="text-4xl md:text-6xl font-Cinzel font-bold mb-6">Pablo Pitani</h2>
              <p className="text-xl text-gray-400 mb-8 font-light italic">Especialista em posicionamento pessoal e de marca.</p>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Há 15 anos, Pablo estuda como as marcas conseguem se diferenciar dos concorrentes através de um posicionamento autêntico. Ele criou um método único de posicionamento que junta o conhecimento em psicologia, marketing e neurociência onde ele identifica a identidade pessoal do dono e consegue encontrar le verdadeiro valor da marca, fazendo ela se tornar mais relevante e atrair Clientes mais qualificados.
                </p>
                <p>
                  Mais de 10 mil pessoas passaram por suas palestras, mentorias e cursos, além de já ter feito diversos treinamentos corporativos para grandes empresas.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-12">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-2xl font-bold text-[#B99052]">15 anos</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">De experiência</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-2xl font-bold text-[#B99052]">10k+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Pessoas impactadas</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-Cinzel font-bold mb-12 uppercase">Local do evento:</h2>
            <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 mb-8">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.8248742544484!2d-51.2066847!3d-30.0705488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197828062031e3%3A0x6291611765f0282b!2sAv.%20Sergipe%2C%20121%20-%20Gl%C3%B3ria%2C%20Porto%20Alegre%20-%20RS%2C%2091710-140!5e0!3m2!1spt-BR!2sbr!4v1716674400000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
            <p className="text-xl text-gray-400">Av Sergipe 121, Bairro Glória, Porto Alegre/RS</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-Cinzel font-bold mb-4 uppercase">Dúvidas Frequentes:</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors">
                  <span className="font-bold text-lg pr-4">{faq.q}</span>
                  <ChevronDown className="text-[#B99052] transition-transform group-open:rotate-180" />
                </summary>
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#B99052] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">A</span>
            </div>
            <span className="font-Cinzel text-lg tracking-widest">ALIANÇA</span>
          </div>
          <p className="text-gray-500 text-sm mb-8">© 2024 Pablo Pitani. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6">
            <a href="https://pablopitani.com.br/alianca-empreendedora-forms/" className="text-gray-400 hover:text-[#B99052] transition-colors"><MessageCircle size={20} /></a>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante WhatsApp */}
      <a 
        href="https://wa.me/5551999999999" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        <MessageCircle size={32} color="white" fill="white" />
      </a>
    </div>
  );
}
