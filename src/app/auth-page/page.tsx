'use client'

import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface FormData {
  email: string
  senha: string
  confirmarSenha: string
  nomeCompleto: string
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    senha: '',
    confirmarSenha: '',
    nomeCompleto: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.email) newErrors.email = 'E-mail é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido'
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória'
    if (!isLogin) {
      if (!formData.nomeCompleto) newErrors.nomeCompleto = 'Nome completo é obrigatório'
      if (!formData.confirmarSenha) newErrors.confirmarSenha = 'Confirmação de senha é obrigatória'
      else if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = 'As senhas não coincidem'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        if (isLogin) {
          const response = await axios.post('http://localhost:8080/usuarios/login', null, {
            params: { email: formData.email, senha: formData.senha }
          })
          console.log('Login successful', response.data)
          // Handle successful login (e.g., store token, redirect)
        } else {
          await axios.post('http://localhost:8080/usuarios', formData)
          console.log('Registration successful')
          setIsLogin(true) // Switch to login view after successful registration
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Authentication error', error.response.data)
            alert(`Erro de autenticação: ${error.response.data.message || 'Tente novamente mais tarde.'}`)
          } else if (error.request) {
            // The request was made but no response was received
            console.error('Network error', error.request)
            alert('Erro de rede: Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.')
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message)
            alert('Erro inesperado. Por favor, tente novamente.')
          }
        } else {
          console.error('Unexpected error', error)
          alert('Erro inesperado. Por favor, tente novamente.')
        }
      }
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

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
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text mb-6">
            {isLogin ? 'Login' : 'Cadastro'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="fullName"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
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
                </motion.div>
              )}
            </AnimatePresence>
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
              <label htmlFor="senha" className="block text-sm font-medium text-gray-300">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.senha && <p className="text-red-400 text-xs mt-1">{errors.senha}</p>}
            </div>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="confirmPassword"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-1">
                    <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-300">
                      Confirmar Senha
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmarSenha"
                        name="confirmarSenha"
                        value={formData.confirmarSenha}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        placeholder="Confirme sua senha"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition duration-200"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmarSenha && <p className="text-red-400 text-xs mt-1">{errors.confirmarSenha}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-green-400 hover:text-green-300 transition duration-200">
                  Esqueceu sua senha?
                </a>
              </div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-neutral-800 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-400 hover:text-green-300 transition duration-200"
            >
              {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}