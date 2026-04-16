import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ReviewCard from '@/components/ReviewCard.jsx';

const ReviewsPage = () => {
  const testimonials = [
    {
      name: 'Fatima Al-Rashid',
      comment: 'Nadeel has become my go-to for luxury fragrances. The quality is exceptional and the scents are truly unique. I receive compliments every time I wear Oud Royale.',
      rating: 5
    },
    {
      name: 'Omar Hassan',
      comment: 'The attention to detail in every fragrance is remarkable. You can tell these are crafted by true perfumers who understand the art of scent.',
      rating: 5
    },
    {
      name: 'Layla Mansour',
      comment: 'I was hesitant to order online, but the experience exceeded my expectations. Fast shipping, beautiful packaging, and the fragrances are absolutely divine.',
      rating: 5
    },
    {
      name: 'Khalid Nasser',
      comment: 'As someone who appreciates fine oud, I can confidently say Nadeel offers some of the best quality I have found. The Black Oud Intense is a masterpiece.',
      rating: 5
    },
    {
      name: 'Amira Khalil',
      comment: 'The Desert Rose fragrance is my signature scent now. It is elegant, sophisticated, and lasts all day. Worth every penny.',
      rating: 5
    },
    {
      name: 'Zara Ahmed',
      comment: 'Beautiful fragrances at reasonable prices. The customer service is also excellent. Highly recommend Nadeel to anyone looking for quality perfumes.',
      rating: 4
    }
  ];

  return (
    <>
      <Helmet>
        <title>Customer reviews - Nadeel</title>
        <meta name="description" content="Read what our customers say about Nadeel's luxury Arabian fragrances. Discover why thousands trust us for their perfume needs." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="luxury-container py-12 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                What our customers say
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who have discovered their signature scent with Nadeel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ReviewCard review={testimonial} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ReviewsPage;