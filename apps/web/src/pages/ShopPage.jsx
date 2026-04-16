// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet';
// import { Link, useSearchParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Heart, Search, Sparkles } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Slider } from '@/components/ui/slider';
// import Header from '@/components/Header.jsx';
// import Footer from '@/components/Footer.jsx';
// import pb from '@/lib/pocketbaseClient';
// import { useWishlist } from '@/hooks/useWishlist.js';
// import { cn } from '@/lib/utils';

// const ShopPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
//   const [priceRange, setPriceRange] = useState([0, 500]);
//   const { isInWishlist, toggleWishlist } = useWishlist();

//   useEffect(() => {
//     fetchProducts();
//   }, [selectedCategory, priceRange]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       let filter = `price >= ${priceRange[0]} && price <= ${priceRange[1]}`;
      
//       if (selectedCategory !== 'all') {
//         filter += ` && category = "${selectedCategory}"`;
//       }

//       const result = await pb.collection('products').getList(1, 50, {
//         filter,
//         sort: '-created',
//         $autoCancel: false
//       });

//       setProducts(result.items);
//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <Helmet>
//         <title>Shop - Nadeel</title>
//         <meta name="description" content="Browse our collection of luxury perfumes, musk, and body splash. Find your signature scent at Nadeel." />
//       </Helmet>

//       <div className="min-h-screen bg-background">
//         <Header />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mb-12"
//           >
//             <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4" style={{ letterSpacing: '0.05em' }}>
//               Shop Our Collection
//             </h1>
//             <p className="text-lg text-muted-foreground leading-relaxed">
//               Discover fragrances that define elegance
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             <aside className="lg:col-span-1">
//               <Card className="sticky top-24 bg-card border-border">
//                 <CardContent className="p-6 space-y-6">
//                   <div>
//                     <label className="text-sm font-semibold uppercase tracking-wider mb-3 block">
//                       Search
//                     </label>
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                       <Input
//                         type="text"
//                         placeholder="Search products..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="pl-10 bg-background text-foreground border-border"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="text-sm font-semibold uppercase tracking-wider mb-3 block">
//                       Category
//                     </label>
//                     <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                       <SelectTrigger className="bg-background text-foreground border-border">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All Products</SelectItem>
//                         <SelectItem value="Perfume">Perfume</SelectItem>
//                         <SelectItem value="Musk">Musk</SelectItem>
//                         <SelectItem value="Body Splash">Body Splash</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <label className="text-sm font-semibold uppercase tracking-wider mb-3 block">
//                       Price Range
//                     </label>
//                     <Slider
//                       value={priceRange}
//                       onValueChange={setPriceRange}
//                       max={500}
//                       step={10}
//                       className="mb-4"
//                     />
//                     <div className="flex justify-between text-sm text-muted-foreground">
//                       <span>${priceRange[0]}</span>
//                       <span>${priceRange[1]}</span>
//                     </div>
//                   </div>

//                   <Button onClick={fetchProducts} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
//                     Apply Filters
//                   </Button>
//                 </CardContent>
//               </Card>
//             </aside>

//             <div className="lg:col-span-3">
//               {loading ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {[...Array(6)].map((_, i) => (
//                     <div key={i} className="bg-muted rounded-2xl h-96 animate-pulse"></div>
//                   ))}
//                 </div>
//               ) : filteredProducts.length === 0 ? (
//                 <div className="text-center py-20">
//                   <Sparkles className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
//                   <h3 className="text-2xl font-serif font-bold text-foreground mb-2">No products found</h3>
//                   <p className="text-muted-foreground">Try adjusting your filters</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {filteredProducts.map((product, index) => (
//                     <motion.div
//                       key={product.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.5, delay: index * 0.05 }}
//                     >
//                       <Card className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300">
//                         <div className="relative aspect-square overflow-hidden bg-muted">
//                           {product.image ? (
//                             <img
//                               src={pb.files.getUrl(product, product.image)}
//                               alt={product.name}
//                               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center bg-muted">
//                               <Sparkles className="w-16 h-16 text-muted-foreground/30" />
//                             </div>
//                           )}
//                           <button
//                             onClick={() => toggleWishlist(product.id)}
//                             className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-all duration-200"
//                           >
//                             <Heart
//                               className={cn(
//                                 'w-5 h-5 transition-all duration-200',
//                                 isInWishlist(product.id)
//                                   ? 'fill-primary text-primary'
//                                   : 'text-foreground'
//                               )}
//                             />
//                           </button>
//                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                             <Button
//                               asChild
//                               className="bg-primary text-primary-foreground hover:bg-primary/90"
//                             >
//                               <Link to={`/product/${product.id}`}>View Details</Link>
//                             </Button>
//                           </div>
//                         </div>
//                         <CardContent className="p-6">
//                           <div className="mb-2">
//                             <span className="text-xs font-medium uppercase tracking-wider text-primary">
//                               {product.category}
//                             </span>
//                           </div>
//                           <h3 className="font-semibold text-lg mb-2 text-foreground">{product.name}</h3>
//                           <p className="text-primary font-bold text-xl">${product.price.toFixed(2)}</p>
//                           {product.stock === 0 && (
//                             <span className="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full bg-destructive/10 text-destructive">
//                               Out of Stock
//                             </span>
//                           )}
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default ShopPage;