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
  "A atrair clientes qualificados para o seu negócio sem depender de indicação.",
  "Se diferenciar dos concorrentes e ser visto como a melhor opção do mercado.",
  "A criar um posicionamento único para a sua marca tanto no digital quanto no físico.",
  "A usar as redes sociais de forma estratégica para ser visto como uma autoridade.",
  
];

const eventFeatures = [
  {
    icon: <Mic size={32} color={GOLD} />,
    image: "https://pablopitani.com.br/wp-content/uploads/2026/05/FOTOS-7-12.png",
    title: "PALESTRA",
    desc: "Serão 2 horas de conteúdo prático sobre posicionamento, marketing e vendas para você se diferenciar dos concorrentes, aumentar a sua percepção de valor e se tornar uma autoridade no seu mercado.",
  },
  {
    icon: <BarChart2 size={32} color={GOLD} />,
    image: "https://pablopitani.com.br/wp-content/uploads/2026/05/PANA6098-scaled.jpg",
    title: "ANÁLISE DE POSICIONAMENTO",
    desc: "Vamos analisar ao vivo alguns perfis do Instagram e mostrar exatamente o que precisa ser melhorado. Você verá como estruturar sua comunicação para atrair clientes que realmente vão pagar pelo o que você faz.",
  },
  {
    icon: <Users size={32} color={GOLD} />,
    image: "https://pablopitani.com.br/wp-content/uploads/2025/08/DMF_7691-1024x683-2.webp",
    title: "NETWORKING",
    desc: "Você conhecerá empresários do Rio Grande do Sul para trocar conhecimento e potencializar os resultados do seu negócio. Além de grandes possibilidades de parcerias.",
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
    name: "Empresário 1",
    role: "Nicho do Empresário",
    text: "Depoimento do empresário sobre os resultados obtidos após aplicar o método de posicionamento.",
  },
  {
    name: "Empresário 2",
    role: "Nicho do Empresário",
    text: "Depoimento do empresário sobre os resultados obtidos após aplicar o método de posicionamento.",
  },
];

const faqs = [
  {
    q: "Para quem é o evento?",
    a: "O evento é focado em empresários e profissionais liberais que buscam elevar seu posicionamento e atrair clientes de maior valor.",
  },
  {
    q: "Preciso levar algo?",
    a: "Recomendamos levar material para anotação e muita disposição para networking.",
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
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#B99052]/50"></div>
              <span className="text-[#B99052] text-xs font-bold uppercase tracking-[0.3em]">Treinamento Presencial em Porto Alegre</span>
              <div className="h-[1px] w-12 bg-[#B99052]/50"></div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-Cinzel font-bold mb-8 leading-tight tracking-wider">
              A ARTE DO <br />
              <span className="text-[#B99052]">POSICIONAMENTO</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 font-light tracking-wide leading-relaxed">
              Descubra como atrair os <span className="text-white font-medium">clientes que pagam caro</span> e ser visto como a <span className="text-white font-medium">maior autoridade</span> do seu mercado, independente da sua área de atuação.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full bg-white/5">
                <Calendar className="text-[#B99052]" size={20} />
                <span className="text-sm font-medium tracking-wide">Em breve - Porto Alegre</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full bg-white/5">
                <MapPin className="text-[#B99052]" size={20} />
                <span className="text-sm font-medium tracking-wide">Local a definir</span>
              </div>
            </div>

            <a 
              href="https://pablopitani.com.br/alianca-empreendedora-forms/"
              className="inline-block px-12 py-5 bg-[#B99052] text-black font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#D4AF37] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#B99052]/20"
            >
              Quero Garantir Minha Vaga
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
                O que você vai descobrir na <span className="text-[#B99052]">Aliança:</span>
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
                  Com anos de experiência no mercado, Pablo Pitani já ajudou centenas de empresários a construírem marcas fortes e lucrativas através de estratégias validadas de posicionamento.
                </p>
                <p>
                  Sua metodologia une o branding tradicional com as novas demandas do mundo digital, criando uma comunicação que não apenas atrai, mas converte o cliente ideal.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-12">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-2xl font-bold text-[#B99052]">10+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Anos de experiência</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-2xl font-bold text-[#B99052]">500+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Empresários mentorados</p>
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
            <p className="text-xl text-gray-400">Porto Alegre, RS</p>
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
