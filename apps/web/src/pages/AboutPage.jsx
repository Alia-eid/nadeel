import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Sparkles, Award, Heart } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const AboutPage = () => {
  const values = [
    {
      icon: Sparkles,
      title: 'Quality craftsmanship',
      description: 'Every fragrance is meticulously crafted using the finest ingredients sourced from around the world'
    },
    {
      icon: Award,
      title: 'Heritage and tradition',
      description: 'We honor centuries of Arabian perfumery tradition while embracing modern innovation'
    },
    {
      icon: Heart,
      title: 'Customer dedication',
      description: 'Your satisfaction is our priority. We are committed to providing exceptional service and products'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About us - Nadeel</title>
        <meta name="description" content="Learn about Nadeel's journey in crafting luxury Arabian fragrances. Discover our commitment to quality, tradition, and excellence." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1920&q=80"
              alt="Luxury perfume ingredients and bottles"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>
          <div className="luxury-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <h1
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"
              >
                Our story
              </h1>
              <p className="text-xl leading-relaxed text-white/90">
                A journey through the art of Arabian perfumery
              </p>
            </motion.div>
          </div>
        </section>

        <section className="luxury-spacing">
          <div className="luxury-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold mb-6">
                  Crafting luxury since the beginning
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Nadeel was born from a passion for the timeless art of Arabian perfumery. Our founders, inspired by generations of master perfumers, set out to create fragrances that honor tradition while embracing contemporary elegance.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Each bottle tells a story of dedication, craftsmanship, and the pursuit of olfactory perfection. We source the finest ingredients from across the globe, from rare oud wood in Southeast Asia to delicate rose petals from the valleys of Damascus.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800&q=80"
                  alt="Master perfumer at work"
                  className="w-full rounded-2xl luxury-shadow-lg"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80"
                  alt="Luxury perfume bottles on display"
                  className="w-full rounded-2xl luxury-shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-4xl font-bold mb-6">
                  Our commitment to excellence
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Quality is not just a promise at Nadeel — it is our foundation. Every fragrance undergoes rigorous testing and refinement to ensure it meets our exacting standards.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that luxury should be accessible, which is why we offer premium fragrances at fair prices. Our direct-to-customer model eliminates unnecessary markups, allowing you to experience true luxury without compromise.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="luxury-spacing bg-muted/30">
          <div className="luxury-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The principles that guide everything we do
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;