import React, { useState } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, StarIcon, UsersIcon, MapPinIcon, GiftIcon } from '@heroicons/react/24/outline';

const AboutUs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Benefit+?",
      answer: "Benefit+ is a premium membership platform that connects travelers, digital nomads, and expats with the best businesses, exclusive deals, and exciting events in Da Nang & Hoi An, Vietnam. We curate authentic experiences and provide member-exclusive benefits."
    },
    {
      question: "How much does membership cost?",
      answer: "We offer flexible membership plans starting from $19/month. Each plan includes access to exclusive deals, priority event bookings, and special member-only experiences. Contact us for detailed pricing information."
    },
    {
      question: "How do I redeem member deals?",
      answer: "Simply show your Benefit+ membership card or digital pass at participating businesses. Some deals may require advance booking through our platform. Always check the specific terms for each deal."
    },
    {
      question: "Can I cancel my membership?",
      answer: "Yes, you can cancel your membership at any time. There are no long-term contracts or cancellation fees. Your benefits will remain active until the end of your current billing period."
    },
    {
      question: "How do you select partner businesses?",
      answer: "We carefully vet all partner businesses based on quality, authenticity, and member value. Each business must meet our standards for service quality, cleanliness, and commitment to providing exceptional member experiences."
    },
    {
      question: "What if I have a problem with a business or deal?",
      answer: "We're here to help! If you experience any issues with a partner business or deal, contact our member support team immediately. We'll work to resolve the issue and ensure your satisfaction."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Join",
      description: "Sign up for a Benefit+ membership and choose your plan",
      icon: UsersIcon,
      color: "bg-primary"
    },
    {
      step: 2,
      title: "Explore",
      description: "Browse our curated directory of businesses, deals, and events",
      icon: MapPinIcon,
      color: "bg-metallic-gold"
    },
    {
      step: 3,
      title: "Redeem",
      description: "Use your member benefits to access exclusive offers and experiences",
      icon: GiftIcon,
      color: "bg-gunmetal"
    },
    {
      step: 4,
      title: "Enjoy",
      description: "Experience the best of Da Nang & Hoi An with premium service",
      icon: StarIcon,
      color: "bg-primary-dark"
    }
  ];

  const membershipPromise = [
    {
      category: "For Members",
      promises: [
        "Respectful conduct at all partner businesses",
        "Honoring deal terms and conditions",
        "Providing honest feedback and reviews",
        "Supporting the local community"
      ]
    },
    {
      category: "For Partner Businesses",
      promises: [
        "Maintaining high service standards",
        "Honoring all member deals and offers",
        "Providing authentic local experiences",
        "Contributing to community growth"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background-gray">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gunmetal to-transparent opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Benefit+</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Connecting people to the best of Da Nang & Hoi An through curated experiences and exclusive member benefits
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Mission */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">Our Mission</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              We believe that the best travel experiences come from authentic connections with local communities. 
              Benefit+ bridges the gap between visitors and the hidden gems of Vietnam's central coast.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-text mb-4">For Travelers</h3>
              <p className="text-text-secondary mb-4">
                Discover authentic experiences that go beyond tourist traps. Get exclusive access to local favorites, 
                member-only deals, and insider knowledge that makes your stay truly special.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-text-secondary">Curated business recommendations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-text-secondary">Exclusive member discounts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-text-secondary">Local event access</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-text mb-4">For Local Businesses</h3>
              <p className="text-text-secondary mb-4">
                Connect with quality-conscious customers who appreciate authentic experiences. 
                Our platform helps you showcase your unique offerings to a targeted audience.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-text-secondary">Quality customer acquisition</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-text-secondary">Marketing support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="w-5 h-5 text-primary" />
                  <span className="text-text-secondary">Community growth</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How Benefit+ Works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">How Benefit+ Works</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Simple steps to unlock exclusive experiences and connect with the best of Da Nang & Hoi An
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="bg-metallic-gold text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Membership Promise */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">The Membership Promise</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              We're committed to building a safe, respectful ecosystem where everyone benefits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {membershipPromise.map((section) => (
              <div key={section.category} className="card p-8">
                <h3 className="text-2xl font-bold text-text mb-6 text-center">{section.category}</h3>
                <div className="space-y-4">
                  {section.promises.map((promise, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-metallic-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckIcon className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-text-secondary">{promise}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Everything you need to know about Benefit+ membership and how to get the most from our platform
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="card mb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-text">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUpIcon className="w-5 h-5 text-text-secondary" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-text-secondary" />
                  )}
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-text-secondary">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="card-premium p-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-text mb-4">Ready to Join?</h2>
            <p className="text-text-secondary text-lg mb-8">
              Start your journey with Benefit+ and discover the authentic side of Da Nang & Hoi An
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">Get Started Today</button>
              <button className="btn-secondary">Contact Us</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
