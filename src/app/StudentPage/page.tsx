'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Github, Hash, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const teamMembers = [
  {
    name: "Vinicius Souza Carvalho",
    email: "vinisouzacntt@gmail.com",
    rm: "556089",
    github: "https://github.com/SouzaEu",
    linkedin: "https://www.linkedin.com/in/souzav/",
    image: "/rosto-vini.jpg",
    role: "Back-end Developer"
  },
  {
    name: "Gabriel Duarte Pinto",
    email: "gabrielduarte3219@gmail.com",
    rm: "556972",
    github: "https://github.com/gabrielduar7e",
    linkedin: "https://www.linkedin.com/in/gabriel-duarte-pinto/",
    image: "/gabrielgatao.jpg",
    role: "UI/UX Designer"
  },
  {
    name: "Thomaz Oliveira Bartol",
    email: "thomaz.bartol2006@gmail.com",
    rm: "555323",
    github: "https://github.com/ThomazBartol",
    linkedin: "https://www.linkedin.com/in/thomaz-bartol/",
    image: "/rosto-thomaz.jpg",
    role: "Front-end Developer"
  }
]

export default function TeamPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 text-white py-20">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center text-green-500 hover:text-green-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para página inicial
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text">Nossa Equipe</h1>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            A equipe por trás do EcoEnergy é composta por profissionais dedicados e apaixonados por energia sustentável.
            Nosso objetivo é revolucionar o setor energético com soluções inovadoras em hidrogênio verde.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Link
              href="https://github.com/EcoEnergy/sustainable-energy-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 transition-colors inline-flex items-center"
            >
              <Github className="mr-2" />
              Acessar Repositório do Projeto
            </Link>
          </motion.div>
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.rm}
              variants={itemVariants}
              className="bg-neutral-800 rounded-xl p-6 transform hover:-translate-y-2 transition-transform duration-300 border border-green-600/30 hover:border-green-600/60"
            >
              <div className="relative mb-6 group">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="absolute inset-0 bg-green-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-green-400 mb-4">{member.role}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-center text-gray-400">
                    <Mail className="w-4 h-4 mr-2" />
                    <a href={`mailto:${member.email}`} className="hover:text-green-400 transition-colors">
                      {member.email}
                    </a>
                  </div>

                  <div className="flex items-center justify-center text-gray-400">
                    <Hash className="w-4 h-4 mr-2" />
                    <span>RM: {member.rm}</span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full py-2 mt-4 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub Profile
                    </a>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full py-2 mt-4 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn Profile
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Repository Link Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para Página Inicial
          </Link>
        </motion.div>
      </div>
    </div>
  )
}