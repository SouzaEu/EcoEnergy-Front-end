'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Car, CreditCard, Mail, Phone, Shield, User } from 'lucide-react'
import { useState } from 'react'

interface FormData {
  fullName: string
  email: string
  phone: string
  carModel: string
  carYear: string
  insuranceType: string
  paymentMethod: string
}

export default function SubscriptionPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    carModel: '',
    carYear: '',
    insuranceType: '',
    paymentMethod: '',
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
      carModel: '',
      carYear: '',
      insuranceType: '',
      paymentMethod: '',
    }

    if (!formData.fullName.trim()) newErrors.fullName = 'Nome é obrigatório'
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido'
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório'
    if (!formData.carModel.trim()) newErrors.carModel = 'Modelo do veículo é obrigatório'
    if (!formData.carYear.trim()) newErrors.carYear = 'Ano do veículo é obrigatório'
    if (!formData.insuranceType) newErrors.insuranceType = 'Tipo de seguro é obrigatório'
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Método de pagamento é obrigatório'

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

  const inputClasses = 'w-full bg-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
  const labelClasses = 'block text-sm font-medium text-gray-300 mb-1'
  const errorClasses = 'text-red-400 text-xs mt-1 flex items-center'

  const formFields = [
    { name: 'fullName', label: 'Nome Completo', type: 'text', icon: User, placeholder: 'Seu nome completo' },
    { name: 'email', label: 'E-mail', type: 'email', icon: Mail, placeholder: 'seu@email.com' },
    { name: 'phone', label: 'Telefone', type: 'tel', icon: Phone, placeholder: '(xx) xxxx-xxxx' },
    { name: 'carModel', label: 'Modelo do Veículo', type: 'text', icon: Car, placeholder: 'Ex: Civic' },
    { name: 'carYear', label: 'Ano do Veículo', type: 'text', placeholder: 'Ex: 2023' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 shadow-2xl rounded-lg p-8"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-6">Assine seu Seguro</h2>
          <p className="text-gray-300 text-center mb-8">
            Preencha os detalhes do seguro e do veículo para completar a assinatura.
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
              <label htmlFor="insuranceType" className={labelClasses}>Tipo de Seguro</label>
              <select
                id="insuranceType"
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleInputChange}
                className={inputClasses}
              >
                <option value="">Selecione o tipo de seguro</option>
                <option value="roubo">Roubo</option>
                <option value="colisao">Colisão</option>
                <option value="completo">Completo</option>
              </select>
              <AnimatePresence>
                {errors.insuranceType && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={errorClasses}
                  >
                    <Shield size={16} className="mr-1" /> {errors.insuranceType}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <label htmlFor="paymentMethod" className={labelClasses}>Método de Pagamento</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className={`${inputClasses} pl-10`}
                >
                  <option value="">Selecione o método de pagamento</option>
                  <option value="creditCard">Cartão de Crédito</option>
                  <option value="bankSlip">Boleto Bancário</option>
                </select>
              </div>
              <AnimatePresence>
                {errors.paymentMethod && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={errorClasses}
                  >
                    <Shield size={16} className="mr-1" /> {errors.paymentMethod}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
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
            <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-200 mr-4">Política de Privacidade</a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-200 mr-4">Termos de Uso</a>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition duration-200">Contato</a>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  )
}