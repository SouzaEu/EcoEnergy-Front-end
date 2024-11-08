'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Home, Mail, MapPin, Phone, Shield, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface FormData {
  fullName: string
  email: string
  phone: string
  residenceType: string
  neighborhood: string
  planType: string
  maintenanceOption: string
}

export default function Component() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    residenceType: '',
    neighborhood: '',
    planType: '',
    maintenanceOption: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<keyof FormData, string> = {
      fullName: '',
      email: '',
      phone: '',
      residenceType: '',
      neighborhood: '',
      planType: '',
      maintenanceOption: '',
    }

    if (!formData.fullName.trim()) newErrors.fullName = 'Nome é obrigatório'
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido'
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório'
    if (!formData.residenceType.trim()) newErrors.residenceType = 'Tipo de residência é obrigatório'
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Bairro é obrigatório'
    if (!formData.planType) newErrors.planType = 'Tipo de plano é obrigatório'
    if (!formData.maintenanceOption) newErrors.maintenanceOption = 'Opção de manutenção é obrigatória'

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== '')
    )

    setErrors(filteredErrors)
    return Object.keys(filteredErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        alert('Assinatura realizada com sucesso!')
      }, 2000)
    }
  }

  const inputClasses = 'w-full bg-neutral-700 text-white placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200'
  const labelClasses = 'block text-sm font-medium text-gray-300 mb-1'
  const errorClasses = 'text-red-400 text-xs mt-1 flex items-center'

  const formFields = [
    { name: 'fullName', label: 'Nome Completo', type: 'text', icon: User, placeholder: 'Seu nome completo' },
    { name: 'email', label: 'E-mail', type: 'email', icon: Mail, placeholder: 'seu@email.com' },
    { name: 'phone', label: 'Telefone', type: 'tel', icon: Phone, placeholder: '(xx) xxxx-xxxx' },
    { name: 'residenceType', label: 'Tipo de Residência', type: 'text', icon: Home, placeholder: 'Ex: Casa, Apartamento' },
    { name: 'neighborhood', label: 'Bairro', type: 'text', icon: MapPin, placeholder: 'Seu bairro' },
  ]

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

          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text mb-6">Assine o Plano EcoEnergy</h2>
          <p className="text-gray-300 text-center mb-8">
            Preencha os detalhes para aderir ao nosso plano de energia sustentável e economize com hidrogênio verde.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <label htmlFor={field.name} className={labelClasses}>{field.label}</label>
                <div className="relative">
                  {field.icon && <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />}
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange}
                    className={`${inputClasses} ${field.icon ? 'pl-10' : ''}`}
                    placeholder={field.placeholder}
                  />
                </div>
                <AnimatePresence>
                  {errors[field.name] && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={errorClasses}
                    >
                      <Shield size={16} className="mr-1" /> {errors[field.name]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <label htmlFor="planType" className={labelClasses}>Tipo de Plano</label>
              <div className="relative">
                <select
                  id="planType"
                  name="planType"
                  value={formData.planType}
                  onChange={handleInputChange}
                  className={`${inputClasses} appearance-none`}
                >
                  <option value="">Selecione o tipo de plano</option>
                  <option value="basic">Básico (Apenas Energia)</option>
                  <option value="standard">Padrão (Energia + Monitoramento)</option>
                  <option value="premium">Premium (Energia + Monitoramento + Otimização)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
              <AnimatePresence>
                {errors.planType && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={errorClasses}
                  >
                    <Shield size={16} className="mr-1" /> {errors.planType}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <label htmlFor="maintenanceOption" className={labelClasses}>Opção de Manutenção</label>
              <div className="relative">
                <select
                  id="maintenanceOption"
                  name="maintenanceOption"
                  value={formData.maintenanceOption}
                  onChange={handleInputChange}
                  className={`${inputClasses} appearance-none`}
                >
                  <option value="">Selecione a opção de manutenção</option>
                  <option value="none">Sem manutenção</option>
                  <option value="basic">Manutenção Básica (Anual)</option>
                  <option value="premium">Manutenção Premium (Trimestral)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
              <AnimatePresence>
                {errors.maintenanceOption && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={errorClasses}
                  >
                    <Shield size={16} className="mr-1" /> {errors.maintenanceOption}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </span>
              ) : (
                'Assinar Agora'
              )}
            </motion.button>
          </form>

          <motion.footer
            className="mt-6 text-center text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="#" className="text-green-400 hover:text-green-300 transition duration-200 mr-4">Política de Privacidade</Link>
            <Link href="#" className="text-green-400 hover:text-green-300 transition duration-200 mr-4">Termos de Uso</Link>
            <Link href="#" className="text-green-400 hover:text-green-300 transition duration-200">Contato</Link>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  )
}