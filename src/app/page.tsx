'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ChevronDown, Send, Phone, Mail, MapPin, MousePointer } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCar, FaClock, FaCalendar, FaUser } from 'react-icons/fa'
import Chatbot from '../app/components/Chatbot'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = ['Início', 'Sobre Nós', 'Integrantes', 'Insights', 'Serviços', 'Contato']

  return (
    <div className="p-2 sm:p-4">
      <header className="bg-[#2e2e2e] text-white rounded-[10em] border-[3.5px] border-blue-900 shadow-lg transition-all duration-300 ease-in-out overflow-hidden fixed top-3 left-0 right-0 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] mx-auto z-10">
        <div className="flex items-center justify-between h-14 pr-4 pl-6">
          <Link href="/" className="flex items-center space-x-2">
            <motion.span 
              className="text-lg font-bold tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ethereal
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
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
                </Link>
              </motion.div>
            ))}
          </nav>
 
          <div className="hidden md:flex h-full items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 ease-in-out"
            >
              <Link href="/subscription-page" className="w-full h-full flex items-center justify-center">
                Assinar
              </Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 ease-in-out"
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
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left" />
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
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600" />
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
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600" />
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

export default function EnhancedModernHomepage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div className="bg-gray-900 text-gray-100 min-h-screen">
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              ETHEREAL
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
              Sua oficina online com suporte ágil e prático. Volte à estrada em instantes!
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToNextSection}
          >
            <MousePointer className="w-10 h-10 text-blue-500 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-nós" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4">Sobre Nós</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div 
              className="space-y-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-semibold mb-4">Nossa Missão</h3>
              <p className="text-lg">
                A Ethereal é uma oficina totalmente online, projetada para oferecer suporte ágil e prático aos nossos clientes. Nossa missão é garantir que você volte à estrada o mais rápido possível, sem comprometer a qualidade do serviço.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Nossa Visão</h3>
              <p className="text-lg">
                Com uma equipe de profissionais altamente qualificados e um sistema inovador de diagnóstico e atendimento, estamos revolucionando a maneira como as pessoas cuidam de seus veículos.
              </p>
            </motion.div>
            <motion.div 
              className="relative h-96"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Image
                src="/logo.png"
                alt="logo com simbolos, um circulo e raios"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-blue-600 opacity-20 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
                  className="bg-white p-6 rounded-full shadow-xl"
                >
                  <span className="text-blue-600 font-bold text-xl">ETHEREAL</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="serviços" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4">Nossos Serviços</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div 
              className="space-y-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-semibold mb-4">Desempenho dos Serviços</h3>
              {['Diagnóstico Online', 'Manutenção Preventiva', 'Reparos Especializados', 'Atendimento'].map((service, index) => (
                <div key={service} className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        {service}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {85 + index * 5}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <motion.div 
                      style={{ width: `${85 + index * 5}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${85 + index * 5}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              
              ))}
            </motion.div>
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {['Satisfação do Cliente', 'Eficiência', 'Inovação', 'Confiabilidade'].map((metric, index) => (
                <div key={metric} className="text-center">
                  <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#E0E0E0" 
                      strokeWidth="10"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 45}
                      strokeDashoffset={2 * Math.PI * 45 * (1 - (0.9 + index * 0.02))}
                      transform="rotate(-90 50 50)"
                      initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - (0.9 + index * 0.02)) }}
                      transition={{ duration: 2, delay: index * 0.2 }}
                    />
                    <text x="50" y="50" textAnchor="middle" dy=".3em" className="text-3xl font-bold" fill="currentColor">
                      {90 + index * 2}%
                    </text>
                  </svg>
                  <p className="mt-2 text-lg font-semibold">{metric}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="integrantes" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4">Nossa Equipe</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Conheça os talentosos profissionais por trás da Ethereal, dedicados a oferecer o melhor serviço para você.
            </p>
          </motion.div>
          <div className="flex justify-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/StudentPage"
                className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold rounded-full bg-blue-600 text-white"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 group-hover:opacity-100"></span>
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

      {/* Sessão de Insight */}
      <section id="insights" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4">Insight</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
            <p className="mt-4 text-xl text-gray-400">Status atualizado do seu veículo em reparo</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Status do Veículo */}
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Status do Veículo</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaCar className="text-blue-500 mr-2" size={20} />
                  <p><span className="font-medium">Situação Atual:</span> Em Reparo</p>
                </div>
                <p><span className="font-medium">Etapa Atual:</span> Inspeção do sistema de freios</p>
                <div className="flex items-center">
                  <FaClock className="text-blue-500 mr-2" size={20} />
                  <p><span className="font-medium">Tempo Estimado:</span> Previsão de conclusão em 2 dias</p>
                </div>
                <div className="flex items-center">
                  <FaCalendar className="text-blue-500 mr-2" size={20} />
                  <p><span className="font-medium">Data de Entrada:</span> 28/10/2024</p>
                </div>
              </div>
            </motion.div>

            {/* Detalhes do Reparo */}
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Detalhes do Reparo</h3>
              <div className="space-y-3">
                <p><span className="font-medium">Última Atualização:</span> Peças de freio substituídas, aguardando teste final</p>
                <div>
                  <p className="font-medium mb-2">Itens de Reparo:</p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>Sistema de Freios: Substituição em andamento</li>
                    <li>Motor: Inspecionado - Sem problemas</li>
                    <li>Bateria: Carregada e testada</li>
                  </ul>
                </div>
                <div className="flex items-center">
                  <FaUser className="text-blue-500 mr-2" size={20} />
                  <p><span className="font-medium">Responsável Técnico:</span> Gabriel Pinto</p>
                </div>
              </div>
            </motion.div>

            {/* Histórico Rápido */}
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Histórico Rápido</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Histórico de Reparo:</p>
                  <ul className="space-y-1">
                    <li>Último Reparo: Sistema de ar condicionado - Concluído em 15/09/2024</li>
                    <li>Revisão Geral: Feita em 30/07/2024</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Manutenções Recentes:</p>
                  <ul className="space-y-1">
                    <li>Troca de óleo: Concluído em 15/08/2024</li>
                    <li>Alinhamento: Feito em 10/08/2024</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4">Entre em Contato</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div 
              className="bg-gray-800 p-8 rounded-lg shadow-lg"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-semibold mb-6">Envie-nos uma mensagem</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-400 mb-2">Nome</label>
                  <input type="text" id="name" className="w-full bg-gray-700 text-white border-none rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                  <input type="email" id="email" className="w-full bg-gray-700 text-white border-none rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-400 mb-2">Mensagem</label>
                  <textarea id="message" rows={4} className="w-full bg-gray-700 text-white border-none rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center"
                >
                  Enviar Mensagem
                  <Send className="ml-2" size={18} />
                </motion.button>
              </form>
            </motion.div>
            <motion.div 
              className="bg-gray-800 p-8 rounded-lg shadow-lg"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-semibold mb-6">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="text-blue-500 mr-4" />
                  <span>(11) 1234-5678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="text-blue-500 mr-4" />
                  <span>contato@Ethereal.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-blue-500 mr-4" />
                  <span>Avenida Paulista, 756 - São Paulo, SP</span>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Horário de Funcionamento</h4>
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Sábado: 9h às 14h</p>
                <p>Domingo: Fechado</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="text-2xl font-bold text-blue-500 mb-4 inline-block">
                Ethereal
              </Link>
              <p className="text-gray-400">Sua oficina online de confiança</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                {['Início', 'Sobre Nós', 'Serviços', 'Insights', 'Contato'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Siga-nos</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Ethereal. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      <Chatbot/>
    </div>
  )
}
