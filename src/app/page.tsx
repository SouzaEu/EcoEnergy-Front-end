'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Mail, MapPin, Menu, MousePointer, Phone, Send, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaBatteryFull, FaChartLine, FaIndustry, FaLeaf, FaLightbulb, FaRecycle, FaSolarPanel, FaWind } from 'react-icons/fa'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = ['Início', 'Sobre Nós', 'Serviços', 'Equipe', 'Insights', 'Contato']

  return (
    <div className="p-2 sm:p-4">
      <header className="bg-[#2e2e2e] text-white rounded-[10em] border-[3.5px] border-green-600 shadow-lg transition-all duration-300 ease-in-out overflow-hidden fixed top-3 left-0 right-0 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] mx-auto z-10">
        <div className="flex items-center justify-between h-14 pr-4 pl-6">
          <Link href="/" className="flex items-center space-x-2">
            <motion.span
              className="text-lg font-bold tracking-tight bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              EcoEnergy
            </motion.span>
          </Link>

          <nav className="hidden md:flex space-x-4 flex-grow justify-center">
            {menuItems.map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-white transition-colors duration-300 ease-in-out relative group"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden md:flex h-full items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 ease-in-out"
            >
              <Link href="/subscription-page" className="w-full h-full flex items-center justify-center">
                Assinar
              </Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 ease-in-out"
            >
              <Link href="/auth-page" className="w-full h-full flex items-center justify-center">
                Login
              </Link>
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 z-50 relative"
            onClick={toggleMenu}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#1a1a1a] z-40 md:hidden"
            >
              <div className="flex flex-col h-full justify-center items-start px-8">
                <nav className="space-y-8 w-full">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                        className="inline-block text-2xl font-light text-gray-300 hover:text-white transition-colors duration-300 ease-in-out relative group"
                        onClick={toggleMenu}
                      >
                        {item}
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="mt-12 space-y-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/assinar"
                      className="inline-block text-2xl font-light text-gray-400 hover:text-white transition-colors duration-300 ease-in-out relative"
                      onClick={toggleMenu}
                    >
                      Assinar
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-500" />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/cadastro-login"
                      className="inline-block text-2xl font-light text-gray-400 hover:text-white transition-colors duration-300 ease-in-out relative"
                      onClick={toggleMenu}
                    >
                      Login
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-500" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  )
}

interface FormData {
  consumo: string;
  tipoEnergia: string;
  setor: string;
}

interface Resultados {
  consumoAntigo: string;
  consumoNovo: string;
  emissaoAntiga: string;
  emissaoNova: string;
  economiaTotal: string;
}

export default function EnhancedModernHomepage() {
  const [scrollY, setScrollY] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    consumo: '',
    tipoEnergia: '',
    setor: ''
  })
  const [resultados, setResultados] = useState<Resultados | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simular cálculos (substitua isso por cálculos reais)
    const resultadosSimulados: Resultados = {
      consumoAntigo: formData.consumo,
      consumoNovo: (parseFloat(formData.consumo) * 0.8).toFixed(2),
      emissaoAntiga: (parseFloat(formData.consumo) * 0.5).toFixed(2),
      emissaoNova: (parseFloat(formData.consumo) * 0.1).toFixed(2),
      economiaTotal: (parseFloat(formData.consumo) * 0.2 * 0.5).toFixed(2)
    }
    setResultados(resultadosSimulados)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('sobre-nós')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-gradient-to-b from-neutral-900 to-neutral-800 text-gray-100 min-h-screen relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      <Header />

      {/* Hero Section */}
      <section id="início" className="h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="mb-8"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">
              EcoEnergy
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
              Impulsionando o crescimento econômico através de soluções em energia renovável e sustentável.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToNextSection}
          >
            <MousePointer className="w-10 h-10 text-green-500 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-nós" className="py-20 bg-neutral-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4">Sobre Nós</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              className="relative h-96"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Image
                src="/hydrogen-green.jpg"
                alt="Imagem representando energia renovável"
                width={500}
                height={300}
                layout="responsive"
                objectFit="cover"
                className="rounded-lg shadow-2xl"
              />
              {/* Removido o filtro verde */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
                  className="bg-white p-6 rounded-full shadow-xl"
                >
                  <span className="text-green-600 font-bold text-xl">EcoEnergy</span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="space-y-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-semibold mb-4">O que queremos melhorar?</h3>
              <p className="text-lg">
              Nosso objetivo é impulsionar o crescimento econômico com foco na adoção de tecnologias de energia renovável, especialmente o Hidrogênio Verde. Essa solução é chave para reduzir a dependência de combustíveis fósseis e transformar o futuro da energia.
              </p>
              <p className="text-lg">
              Desenvolvemos uma plataforma com inteligência artificial para otimizar custos e reduzir emissões, oferecendo soluções de energia limpa sob medida para cada cliente ou projeto.
              </p>
              <p className="text-lg">
              Queremos democratizar o acesso à energia sustentável, promovendo o desenvolvimento econômico e a preservação ambiental, com impacto positivo duradouro.
              </p>
              <p className="text-lg">
              Transforme o futuro da energia conosco e construa um mundo mais sustentável e próspero.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Economize com Hidrogênio Verde Section */}
      <section id="serviços" className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4">Economize com Hidrogênio Verde</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Descubra quanto você pode economizar e reduzir suas emissões ao adotar o hidrogênio verde. Informe seu consumo atual e setor para calcular o impacto direto dessa transição.
            </p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto bg-neutral-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="consumo" className="block text-sm font-medium text-gray-300 mb-2">
                  Consumo Atual de Energia
                </label>
                <input
                  type="number"
                  id="consumo"
                  name="consumo"
                  value={formData.consumo}
                  onChange={handleInputChange}
                  placeholder="Insira seu consumo médio mensal em kWh"
                  className="w-full bg-neutral-600 text-white border-none rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="tipoEnergia" className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de Energia Atual
                </label>
                <div className="relative">
                  <select
                    id="tipoEnergia"
                    name="tipoEnergia"
                    value={formData.tipoEnergia}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-600 text-white border-none rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                    required
                  >
                    <option value="">Selecione o tipo de energia</option>
                    <option value="gas-natural">Gás Natural</option>
                    <option value="carvao">Carvão</option>
                    <option value="diesel">Diesel</option>
                    <option value="eletricidade">Eletricidade</option>
                    <option value="solar">Solar</option>
                    <option value="eolica">Eólica</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label htmlFor="setor" className="block text-sm font-medium text-gray-300 mb-2">
                  Setor de Atuação
                </label>
                <div className="relative">
                  <select
                    id="setor"
                    name="setor"
                    value={formData.setor}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-600 text-white border-none rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                    required
                  >
                    <option value="">Selecione o setor</option>
                    <option value="industria">Indústria</option>
                    <option value="transporte">Transporte</option>
                    <option value="comercial">Comercial</option>
                    <option value="residencial">Residencial</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-300"
              >
                Calcular Economia
              </button>
            </form>

            {resultados && (
              <motion.div
                className="mt-8 p-6 bg-neutral-600 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-green-400">Resultados</h3>
                <div className="space-y-2 text-gray-300">
                  <p><span className="font-medium">Consumo Atual:</span> <span className="text-red-400">{resultados.consumoAntigo} kWh</span></p>
                  <p><span className="font-medium">Consumo com Hidrogênio Verde:</span> <span className="text-green-400">{resultados.consumoNovo} kWh</span></p>
                  <p><span className="font-medium">Emissão de Gases (Atual):</span> <span className="text-red-400">{resultados.emissaoAntiga} toneladas de CO₂</span></p>
                  <p><span className="font-medium">Emissão de Gases (Novo):</span> <span className="text-green-400">{resultados.emissaoNova} toneladas de CO₂</span></p>
                  <p><span className="font-medium">Economia Total:</span> <span className="text-green-400">R$ {resultados.economiaTotal} por mês</span></p>
                </div>
              </motion.div>
            )}


            <div className="mt-8 text-center">
              <p className="text-xl mb-4 text-gray-300">Pronto para adotar uma energia limpa e econômica?</p>
              <button
                onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
              >
                Fale com um Especialista
              </button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Team Section */}
      <section id="integrantes" className="py-20 bg-neutral-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4">Nossa Equipe</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Conheça os talentosos profissionais por trás da EcoEnergy, dedicados a impulsionar a transição para energia sustentável.
            </p>
          </motion.div>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/StudentPage"
                className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold rounded-full bg-green-600 text-white"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-green-700 via-green-800 to-green-900 group-hover:opacity-100"></span>
                <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                <span className="absolute inset-0 w-full h-full border border-white rounded-full opacity-10"></span>
                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                <span className="relative flex items-center">
                  Ver Integrantes
                  <ChevronDown className="ml-2 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4">Insights</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
            <p className="mt-4 text-xl text-gray-400">Acompanhe o progresso da transição energética</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Renewable Energy Progress */}
            <motion.div
              className="bg-neutral-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Progresso em Energia Renovável</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaSolarPanel className="text-green-500 mr-2" size={20} />
                  <p><span className="font-medium">Energia Solar:</span> 30% de aumento</p>
                </div>
                <div className="flex items-center">
                  <FaBatteryFull className="text-green-500 mr-2" size={20} />
                  <p><span className="font-medium">Capacidade Total:</span> 150 GW instalados</p>
                </div>
                <div className="flex items-center">
                  <FaWind className="text-green-500 mr-2" size={20} />
                  <p><span className="font-medium">Energia Eólica:</span> 25% de crescimento</p>
                </div>
              </div>
            </motion.div>

            {/* Emission Reduction */}
            <motion.div
              className="bg-neutral-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Redução de Emissões</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaLeaf className="text-green-500 mr-2" size={20} />
                  <p><span className="font-medium">Redução Total:</span> 15% em comparação ao ano anterior</p>
                </div>
                <div className="flex items-center">
                  <FaIndustry className="text-green-500 mr-2" size={20} />
                  <p><span className="font-medium">Setor Industrial:</span> 20% de redução</p>
                </div>
                <div className="flex items-center">
                  <FaRecycle className="text-green-500 mr-2" size={20} />
                  <p><span className="font-medium">Transporte:</span> 10% de redução nas emissões</p>
                </div>
              </div>
            </motion.div>

            {/* Economic Impact */}
            <motion.div
              className="bg-neutral-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Impacto Econômico</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaChartLine className="text-green-500 mr-2" size={20} />
                  <p><span className="font-medium">Novos Empregos:</span> 100.000 no setor de energia limpa</p>
                </div>
                <div className="flex items-center">
                  <FaLightbulb className="text-green-500 mr-2" size={20} />
                  <p><span className="font-medium">Investimento em P&D:</span> R$ 5 bilhões</p>
                </div>
                <div className="flex items-center">
                  <FaChartLine className="text-green-500 mr-2" size={20} />
                  <p><span className="font-medium">Economia Projetada:</span> R$ 10 bilhões até 2030</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-neutral-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4">Entre em Contato</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              className="bg-neutral-700 p-8 rounded-lg shadow-lg"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-semibold mb-6">Envie-nos uma mensagem</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-400 mb-2">Nome</label>
                  <input type="text" id="name" className="w-full bg-neutral-600 text-white border-none rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                  <input type="email" id="email" className="w-full bg-neutral-600 text-white border-none rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-400 mb-2">Mensagem</label>
                  <textarea id="message" rows={4} className="w-full bg-neutral-600 text-white border-none rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center"
                >
                  Enviar Mensagem
                  <Send className="ml-2" size={18} />
                </motion.button>
              </form>
            </motion.div>
            <motion.div
              className="bg-neutral-700 p-8 rounded-lg shadow-lg"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-semibold mb-6">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="text-green-500 mr-4" size={24} />
                  <p>(11) 1234-5678</p>
                </div>
                <div className="flex items-center">
                  <Mail className="
text-green-500 mr-4" size={24} />
                  <p>contato@ecoenergy.com</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-green-500 mr-4" size={24} />
                  <p>Av. Paulista, 1000 - São Paulo, SP</p>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Horário de Atendimento</h4>
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Sábado: 9h às 13h</p>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Atendimento via WhatsApp</h4>
                <a href="https://wa.me/5511123456789" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Iniciar conversa
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-4">EcoEnergy</h3>
              <p className="mb-4">Impulsionando o futuro da energia sustentável.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold text-white mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link href="#início" className="hover:text-green-500 transition-colors duration-300">Início</Link></li>
                <li><Link href="#sobre-nós" className="hover:text-green-500 transition-colors duration-300">Sobre Nós</Link></li>
                <li><Link href="#serviços" className="hover:text-green-500 transition-colors duration-300">Serviços</Link></li>
                <li><Link href="#integrantes" className="hover:text-green-500 transition-colors duration-300">Equipe</Link></li>
                <li><Link href="#insights" className="hover:text-green-500 transition-colors duration-300">Insights</Link></li>
                <li><Link href="#contato" className="hover:text-green-500 transition-colors duration-300">Contato</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
              <p className="mb-4">Inscreva-se para receber as últimas notícias e atualizações.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-grow bg-neutral-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition duration-300"
                >
                  Inscrever
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 EcoEnergy. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}