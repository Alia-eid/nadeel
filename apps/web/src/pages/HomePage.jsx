import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Award, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CollectionCard from '@/components/CollectionCard.jsx';
import { mockCollections } from '@/data/mockCollections.js';

const HomePage = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Premium ingredients',
      description: 'Sourced from the finest perfumeries across the Middle East and beyond'
    },
    {
      icon: Award,
      title: 'Artisan craftsmanship',
      description: 'Each fragrance is carefully composed by master perfumers'
    },
    {
      icon: Truck,
      title: 'Fast delivery',
      description: 'Receive your luxury fragrances within 3-5 business days'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nadeel - Luxury Arabian Fragrances</title>
        <meta name="description" content="Discover Nadeel's collection of luxury Arabian perfumes, musks, and body splashes. Experience the art of traditional perfumery with modern elegance." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1601193908723-7bd3d509224d?w=1920&q=80"
              alt="Luxury perfume bottles on elegant display"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
          <div className="luxury-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
              >
                Discover the essence of luxury
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white/90">
                Handcrafted Arabian fragrances that tell your unique story. Experience timeless elegance in every bottle.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="text-lg transition-all duration-200 hover:gap-3 active:scale-95">
                    Explore collection
                    <ArrowRight className="w-5 h-5 ml-2 transition-all" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="secondary" className="text-lg transition-all duration-200 active:scale-95">
                    Our story
                  </Button>
                </Link>
              </div>
            </motion.div>
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
                Featured collections
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Explore our curated collections of luxury fragrances
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CollectionCard collection={collection} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="luxury-spacing">
          <div className="luxury-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  The art of Arabian perfumery
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  For generations, Arabian perfumery has been synonymous with luxury, sophistication, and timeless elegance. At Nadeel, we honor this rich heritage while embracing modern innovation.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Each fragrance in our collection is a masterpiece, carefully crafted using the finest ingredients sourced from around the world. From rare oud wood to delicate rose petals, every note tells a story.
                </p>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="transition-all duration-200 active:scale-95">
                    Learn more about us
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80"
                  alt="Artisan perfumer crafting luxury fragrance"
                  className="w-full rounded-2xl luxury-shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="luxury-spacing bg-muted/30">
          <div className="luxury-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
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
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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

export default HomePage;