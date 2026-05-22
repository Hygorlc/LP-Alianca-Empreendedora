import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const GOLD = "#D4AF37";

const Inscricao = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-gold selection:text-black overflow-x-hidden">
      {/* Header com botão voltar */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center">
          <Link href="/">
            <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Voltar para o site</span>
            </button>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: GOLD }}>
              GARANTA SUA VAGA
            </h1>
            <p className="text-white/70 text-lg">
              Preencha o formulário abaixo para concluir sua inscrição no Treinamento Presencial.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#111] rounded-xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <iframe
              src="https://gestao-instituto-pitani.vercel.app/f/cmp064jlz00007v9wc1nxhvp4"
              width="100%"
              height="800px"
              frameBorder="0"
              style={{ border: 'none' }}
              title="Formulário de Inscrição"
            ></iframe>
          </motion.div>

          <p className="text-center mt-8 text-white/40 text-sm">
            Seu pagamento será processado em um ambiente seguro e criptografado.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Inscricao;
