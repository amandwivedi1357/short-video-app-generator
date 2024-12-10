'use client'

import { useState, useEffect,useCallback } from 'react'
import { Sun, Moon, ArrowRight, Video, Wand2, Layout, Check } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Mic,
  MessageSquare,
  Image as ImageIcon,
  
} from "lucide-react";
import ReactConfetti from 'react-confetti';

export default function Page() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-black dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          ClipVerse
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors duration-200"
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </header>

      <main>
        <HeroSection />
        <FeaturesSection />
        <VideoProcess/>
        <PricingSection />
      </main>

      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-6"
      >
        Create Stunning Short Videos in Seconds
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl mb-8 max-w-2xl mx-auto"
      >
        ClipVerse empowers you to generate captivating short-form videos with ease, powered by cutting-edge AI technology.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Get Started
          <ArrowRight className="ml-2" />
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16"
      >
        <img
         src='/proj.png'
          className="rounded-lg shadow-2xl max-w-4xl mx-auto w-full"
        />
          
       
      </motion.div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      title: 'Fast Video Generation',
      description: 'Create professional-quality videos in minutes, not hours.',
      icon: <Video className="w-12 h-12 text-purple-600" />,
    },
    {
      title: 'AI-Powered Generation',
      description: 'Let our advanced AI generate professional-quality videos for you.',
      icon: <Wand2 className="w-12 h-12 text-purple-600" />,
    },
    {
      title: 'Multiple Video Templates',
      description: 'Choose from a wide range of customizable templates.',
      icon: <Layout className="w-12 h-12 text-purple-600" />,
    },
  ]

  return (
    <motion.section
    initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
    className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-16">Why Choose ClipVerse?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 dark:border dark:border-purple-700 dark:shadow-purple-700/20"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      credits: '30',
      features: ['30 free credits', 'Basic templates', 'Standard quality'],
    },
    {
      name: 'Monthly',
      price: '9.99',
      credits: 'Unlimited',
      features: ['Unlimited credits', 'All templates', 'HD quality', 'Priority support'],
    },
    {
      name: 'Yearly',
      price: '100',
      credits: 'Unlimited',
      features: ['Unlimited credits', 'All templates', '4K quality', 'Priority support', '2 months free'],
    },
  ]

  return (
    <motion.section
    initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
    className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-16">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 dark:border dark:border-purple-700 dark:shadow-purple-700/20 flex flex-col h-full"
          >
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-4">
                ${plan.price}
                {plan.name !== 'Free' && <span className="text-lg font-normal">{plan.name === 'Monthly' ? '/month' : '/year'}</span>}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.credits} credits</p>
              <ul className="mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/signup"
              className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 mt-auto"
            >
              {plan.name === 'Free' ? 'Sign Up' : 'Subscribe'}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function Footer() {
  return (
    <footer className="bg-purple-100 dark:bg-black dark:border-t dark:border-purple-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} ClipVerse. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              Privacy Policy
            </Link>
            <Link href="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              About Us
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              Contact
            </Link>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0  011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}



const steps = [
  {
    id: 1,
    title: "Apply for the Program",
    description: "Submit your video creation request",
    icon: FileText,
    duration: "Step 1",
  },
  {
    id: 2,
    title: "Script Generation",
    description: "AI generates your video script",
    icon: MessageSquare,
    duration: "Step 2",
  },
  {
    id: 3,
    title: "Voice Generation",
    description: "Convert script to voiceover",
    icon: Mic,
    duration: "Step 3",
  },
  {
    id: 4,
    title: "Image Generation",
    description: "Choose visuals for your video",
    icon: ImageIcon,
    duration: "Step 4",
  },
  {
    id: 5,
    title: "Video Assembly",
    description: "Compile all elements into final video",
    icon: Video,
    duration: "Step 5",
  },
];


 function VideoProcess() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleStepClick = useCallback((index) => {
    setCurrentStep(index);
    if (index === steps.length - 1) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); 
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-black dark:to-gray-900 text-gray-900 p-6 relative overflow-hidden">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <div className="max-w-6xl mx-auto space-y-8 mt-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Video Creation Process</h1>
          <p className="text-gray-400">Below are the step involved in generating a short video</p>
        </div>
        
        <div className="relative mt-20">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#E94A97] to-[#7B2CD8]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;

              return (
                <div key={step.id} className="relative">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-3 left-[45%] w-6 h-6 bg-gradient-to-r from-[#E94A97] to-[#7B2CD8] rounded-full transform -translate-x-1/2"
                      />
                    )}
                  </AnimatePresence>
                  <div 
                    onClick={() => handleStepClick(index)}
                    className="cursor-pointer group"
                  >
                    <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-[#E94A97] to-[#7B2CD8] transition-transform duration-300 group-hover:scale-105">
                      <Card className="h-[15rem] bg-gray-900 rounded-lg">
                        <CardContent className="p-4 flex flex-col items-center justify-between h-full">
                          <div className="text-center flex items-center justify-center flex-col space-y-2  mt-10">
                            <div className={`p-2 w-12 flex items-center justify-center rounded-full transition-colors duration-300 ${
                              isActive ? 'bg-gradient-to-r from-[#E94A97] to-[#7B2CD8]' : 'bg-gray-800'
                            }`}>
                              <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                            </div>
                            <h3 className={`font-semibold text-sm transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-gray-400'
                            }`}>
                              {step.title}
                            </h3>
                            <p className="text-xs text-gray-500">{step.description}</p>
                          </div>
                          <div className="mt-4">
                            <span className={`text-xs font-medium transition-colors duration-300 ${
                              isActive ? 'text-[#E94A97]' : 'text-gray-500'
                            }`}>
                              {step.duration}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Video Generated Message */}
        <AnimatePresence>
          {currentStep === steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
              <p className="text-lg text-gray-300">Your video has been generated!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
