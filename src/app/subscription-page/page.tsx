'use client'

import axios from 'axios'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'


interface FormData {
  nomeCompleto: string
  email: string
  telefone: string
  tipoResidencia: string
  bairro: string
  tipoPlano: string
  opcaoManutencao: string
}

export default function SubscriptionPage() {
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: '',
    email: '',
    telefone: '',
    tipoResidencia: '',
    bairro: '',
    tipoPlano: '',
    opcaoManutencao: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentSubscription, setCurrentSubscription] = useState<FormData | null>(null)

  useEffect(() => {
    fetchCurrentSubscription()
  }, [])

  const fetchCurrentSubscription = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (userId) {
        const response = await axios.get(`http://localhost:8080/assinaturas/${userId}`)
        setCurrentSubscription(response.data)
        setFormData(response.data)
      }
    } catch (error) {
      console.error('Error fetching current subscription:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = 'Nome completo é obrigatório'
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório'
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido'
    if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório'
    if (!formData.tipoResidencia.trim()) newErrors.tipoResidencia = 'Tipo de residência é obrigatório'
    if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório'
    if (!formData.tipoPlano) newErrors.tipoPlano = 'Tipo de plano é obrigatório'
    if (!formData.opcaoManutencao) newErrors.opcaoManutencao = 'Opção de manutenção é obrigatória'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const userId = localStorage.getItem('userId')
        if (currentSubscription) {
          await axios.put(`http://localhost:8080/assinaturas/${currentSubscription}`, {
            ...formData,
            usuarioId: userId,
          })

        } else {
          await axios.post('http://localhost:8080/assinaturas', {
            ...formData,
            usuarioId: userId,
          })
        }
        alert('Assinatura salva com sucesso!')
        fetchCurrentSubscription()
      } catch (error) {
        console.error('Error saving subscription:', error)
        alert('Erro ao salvar assinatura. Por favor, tente novamente.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-800 p-4">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      <div className="w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-800 shadow-2xl rounded-lg p-8 border-[3.5px] border-green-600"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-6 text-green-400 hover:text-green-300 transition-all duration-300 ease-in-out flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Voltar
            </motion.button>
          </Link>
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text mb-6">
            Assine o Plano EcoEnergy
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Preencha os detalhes para aderir ao nosso plano de energia sustentável e economize com hidrogênio verde.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-300">
                Nome Completo
              </label>
              <input
                type="text"
                id="nomeCompleto"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Seu nome completo"
              />
              {errors.nomeCompleto && <p className="text-red-400 text-xs mt-1">{errors.nomeCompleto}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-300">
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="(xx) xxxxx-xxxx"
              />
              {errors.telefone && <p className="text-red-400 text-xs mt-1">{errors.telefone}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="tipoResidencia" className="block text-sm font-medium text-gray-300">
                Tipo de Residência
              </label>
              <input
                type="text"
                id="tipoResidencia"
                name="tipoResidencia"
                value={formData.tipoResidencia}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Ex: Casa, Apartamento"
              />
              {errors.tipoResidencia && <p className="text-red-400 text-xs mt-1">{errors.tipoResidencia}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="bairro" className="block text-sm font-medium text-gray-300">
                Bairro
              </label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="Seu bairro"
              />
              {errors.bairro && <p className="text-red-400 text-xs mt-1">{errors.bairro}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="tipoPlano" className="block text-sm font-medium text-gray-300">
                Tipo de Plano
              </label>
              <div className="relative">
                <select
                  id="tipoPlano"
                  name="tipoPlano"
                  value={formData.tipoPlano}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 appearance-none"
                >
                  <option value="">Selecione o tipo de plano</option>
                  <option value="basico">Básico (Apenas Energia)</option>
                  <option value="padrao">Padrão (Energia + Monitoramento)</option>
                  <option value="premium">Premium (Energia + Monitoramento + Otimização)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
              {errors.tipoPlano && <p className="text-red-400 text-xs mt-1">{errors.tipoPlano}</p>}
            </div>
            <div className="space-y-1">
              <label htmlFor="opcaoManutencao" className="block text-sm font-medium text-gray-300">
                Opção de Manutenção
              </label>
              <div className="relative">
                <select
                  id="opcaoManutencao"
                  name="opcaoManutencao"
                  value={formData.opcaoManutencao}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 appearance-none"
                >
                  <option value="">Selecione a opção de manutenção</option>
                  <option value="sem manutenção">Sem manutenção</option>
                  <option value="manutenção basica">Manutenção Basica (Anual)</option>
                  <option value="manutenção premium">Manutenção Premium (Trimestral)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
              {errors.opcaoManutencao && <p className="text-red-400 text-xs mt-1">{errors.opcaoManutencao}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-neutral-800 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processando...' : 'Assinar'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-400">
            <Link href="/politica-privacidade" className="text-green-400 hover:text-green-300 transition duration-200">
              Política de Privacidade
            </Link>
            {' | '}
            <Link href="/termos-uso" className="text-green-400 hover:text-green-300 transition duration-200">
              Termos de Uso
            </Link>
            {' | '}
            <Link href="/contato" className="text-green-400 hover:text-green-300 transition duration-200">
              Contato
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}