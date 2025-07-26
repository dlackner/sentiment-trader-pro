import React, { useState } from 'react'
import { Check, Star, Zap, Crown, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface PricingTier {
  name: string
  price: number
  period: string
  description: string
  features: string[]
  popular?: boolean
  icon: React.ReactNode
  cta: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 49,
    period: 'month',
    description: 'Perfect for individual traders getting started with sentiment analysis',
    icon: <Star className="w-6 h-6" />,
    cta: 'Start Free Trial',
    features: [
      'Track up to 5 X accounts',
      'Real-time keyword analysis',
      'Basic sentiment charts',
      'Email alerts',
      '7-day data history',
      'Mobile responsive dashboard',
      'Standard support'
    ]
  },
  {
    name: 'Professional',
    price: 149,
    period: 'month',
    description: 'Advanced features for serious traders and small portfolio managers',
    icon: <Zap className="w-6 h-6" />,
    cta: 'Start Free Trial',
    popular: true,
    features: [
      'Track unlimited X accounts',
      'Advanced keyword mapping',
      'Custom sentiment algorithms',
      'Real-time push notifications',
      '30-day data history',
      'API access',
      'Custom watchlists',
      'Advanced charts & analytics',
      'Priority support',
      'Export capabilities'
    ]
  },
  {
    name: 'Enterprise',
    price: 499,
    period: 'month',
    description: 'Complete solution for portfolio management firms and institutions',
    icon: <Crown className="w-6 h-6" />,
    cta: 'Contact Sales',
    features: [
      'Everything in Professional',
      'Multi-client management',
      'White-label solutions',
      'Custom integrations',
      'Unlimited data history',
      'Advanced AI sentiment models',
      'Custom reporting',
      'Dedicated account manager',
      '24/7 phone support',
      'SLA guarantees',
      'Custom onboarding'
    ]
  }
]

interface PricingPageProps {
  onBack: () => void
}

const PricingPage: React.FC<PricingPageProps> = ({ onBack }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')

  const getPrice = (basePrice: number) => {
    return billingPeriod === 'annual' ? Math.floor(basePrice * 0.8) : basePrice
  }

  const getSavings = (basePrice: number) => {
    return billingPeriod === 'annual' ? Math.floor(basePrice * 0.2 * 12) : 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 
                       transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          
          <h1 className="text-4xl font-light tracking-widest text-white uppercase mb-4">
            Mirror Lake Pricing
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Choose the perfect plan for your sentiment intelligence needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billingPeriod === 'annual' ? 'bg-accent-blue' : 'bg-dark-400'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  billingPeriod === 'annual' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingPeriod === 'annual' ? 'text-white' : 'text-gray-400'}`}>
              Annual
            </span>
            {billingPeriod === 'annual' && (
              <span className="text-xs bg-accent-green/20 text-accent-green px-2 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                tier.popular
                  ? 'bg-gradient-to-b from-accent-blue/20 to-dark-200 border-2 border-accent-blue/50'
                  : 'bg-dark-200/80 border border-dark-400/50'
              } backdrop-blur-lg`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  tier.popular ? 'bg-accent-blue/20' : 'bg-dark-300/50'
                }`}>
                  <div className={tier.popular ? 'text-accent-blue' : 'text-gray-400'}>
                    {tier.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{tier.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${getPrice(tier.price)}</span>
                  <span className="text-gray-400">/{billingPeriod === 'annual' ? 'month' : 'month'}</span>
                  {billingPeriod === 'annual' && (
                    <div className="text-sm text-accent-green mt-1">
                      Save ${getSavings(tier.price)}/year
                    </div>
                  )}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                    tier.popular
                      ? 'bg-accent-blue hover:bg-accent-blue/80 text-white'
                      : 'bg-dark-300 hover:bg-dark-400 text-gray-300'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>

              <div className="space-y-4">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  What data sources do you use?
                </h3>
                <p className="text-gray-400 text-sm">
                  We integrate with X (Twitter) API, Reddit, and major financial news sources to provide 
                  comprehensive sentiment analysis across multiple platforms.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  How often is data updated?
                </h3>
                <p className="text-gray-400 text-sm">
                  Data is updated in real-time for Professional and Enterprise plans. Starter plans 
                  receive updates every 15 minutes.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Can I cancel anytime?
                </h3>
                <p className="text-gray-400 text-sm">
                  Yes, you can cancel your subscription at any time. No long-term contracts or 
                  cancellation fees.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Do you offer custom solutions?
                </h3>
                <p className="text-gray-400 text-sm">
                  Enterprise clients can request custom integrations, white-label solutions, and 
                  specialized analytics tailored to their specific needs.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-400 text-sm">
                  Yes! All plans include a 14-day free trial with full access to features. No credit 
                  card required to start.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  What kind of support do you provide?
                </h3>
                <p className="text-gray-400 text-sm">
                  Support levels vary by plan, from email support for Starter to 24/7 phone support 
                  and dedicated account managers for Enterprise.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-accent-blue/20 to-accent-green/20 rounded-2xl p-12 border border-accent-blue/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Trading Strategy?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful traders and portfolio managers who use Mirror Lake 
              to stay ahead of market sentiment and make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-accent-blue hover:bg-accent-blue/80 text-white rounded-lg font-medium transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-3 border border-gray-400 text-gray-300 hover:text-white hover:border-white rounded-lg font-medium transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage