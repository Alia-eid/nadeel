// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet';
// import { motion } from 'framer-motion';
// import { User, Package, Heart, Settings } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import Header from '@/components/Header.jsx';
// import Footer from '@/components/Footer.jsx';
// import { useAuth } from '@/contexts/AuthContext.jsx';
// import { useNavigate } from 'react-router-dom';
// import pb from '@/lib/pocketbaseClient';

// const UserAccountPage = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (currentUser) {
//       fetchOrders();
//     }
//   }, [currentUser]);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const result = await pb.collection('orders').getList(1, 50, {
//         filter: `userId="${currentUser.id}"`,
//         sort: '-created',
//         $autoCancel: false
//       });
//       setOrders(result.items);
//     } catch (error) {
//       console.error('Failed to fetch orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending':
//         return 'bg-yellow-500/10 text-yellow-600';
//       case 'processing':
//         return 'bg-blue-500/10 text-blue-600';
//       case 'shipped':
//         return 'bg-purple-500/10 text-purple-600';
//       case 'delivered':
//         return 'bg-green-500/10 text-green-600';
//       default:
//         return 'bg-muted text-muted-foreground';
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>My Account - Nadeel</title>
//         <meta name="description" content="Manage your Nadeel account, orders, and wishlist" />
//       </Helmet>

//       <div className="min-h-screen bg-background">
//         <Header />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-12" style={{ letterSpacing: '0.05em' }}>
//               My Account
//             </h1>

//             <Tabs defaultValue="profile" className="space-y-8">
//               <TabsList className="bg-card border border-border">
//                 <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//                   <User className="w-4 h-4 mr-2" />
//                   Profile
//                 </TabsTrigger>
//                 <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//                   <Package className="w-4 h-4 mr-2" />
//                   Orders
//                 </TabsTrigger>
//                 <TabsTrigger value="wishlist" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//                   <Heart className="w-4 h-4 mr-2" />
//                   Wishlist
//                 </TabsTrigger>
//                 <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//                   <Settings className="w-4 h-4 mr-2" />
//                   Settings
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="profile">
//                 <Card className="bg-card border-border">
//                   <CardContent className="p-8">
//                     <h2 className="text-2xl font-serif font-bold text-foreground mb-6" style={{ letterSpacing: '0.05em' }}>
//                       Profile Information
//                     </h2>
//                     <div className="space-y-4">
//                       <div>
//                         <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Name</span>
//                         <p className="text-lg text-foreground mt-1">{currentUser?.name || 'Not set'}</p>
//                       </div>
//                       <div>
//                         <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Email</span>
//                         <p className="text-lg text-foreground mt-1">{currentUser?.email}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="orders">
//                 <Card className="bg-card border-border">
//                   <CardContent className="p-8">
//                     <h2 className="text-2xl font-serif font-bold text-foreground mb-6" style={{ letterSpacing: '0.05em' }}>
//                       Order History
//                     </h2>

//                     {loading ? (
//                       <div className="text-center py-12">
//                         <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                         <p className="text-muted-foreground">Loading orders...</p>
//                       </div>
//                     ) : orders.length === 0 ? (
//                       <div className="text-center py-12">
//                         <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
//                         <p className="text-muted-foreground">No orders yet</p>
//                       </div>
//                     ) : (
//                       <div className="space-y-4">
//                         {orders.map((order) => (
//                           <div key={order.id} className="border border-border rounded-lg p-6">
//                             <div className="flex justify-between items-start mb-4">
//                               <div>
//                                 <p className="text-sm text-muted-foreground">Order ID</p>
//                                 <p className="font-mono text-foreground">{order.id}</p>
//                               </div>
//                               <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
//                                 {order.status}
//                               </span>
//                             </div>
//                             <div className="grid grid-cols-2 gap-4 mb-4">
//                               <div>
//                                 <p className="text-sm text-muted-foreground">Date</p>
//                                 <p className="text-foreground">
//                                   {new Date(order.created).toLocaleDateString()}
//                                 </p>
//                               </div>
//                               <div>
//                                 <p className="text-sm text-muted-foreground">Total</p>
//                                 <p className="text-lg font-bold text-primary">
//                                   ${order.totalPrice.toFixed(2)}
//                                 </p>
//                               </div>
//                             </div>
//                             <div>
//                               <p className="text-sm text-muted-foreground mb-2">Items</p>
//                               <div className="space-y-1">
//                                 {order.products.map((product, index) => (
//                                   <p key={index} className="text-sm text-foreground">
//                                     {product.name} x {product.quantity}
//                                   </p>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="wishlist">
//                 <Card className="bg-card border-border">
//                   <CardContent className="p-8">
//                     <h2 className="text-2xl font-serif font-bold text-foreground mb-6" style={{ letterSpacing: '0.05em' }}>
//                       My Wishlist
//                     </h2>
//                     <p className="text-muted-foreground mb-4">
//                       View your saved products on the{' '}
//                       <Button
//                         variant="link"
//                         className="p-0 h-auto text-primary hover:text-primary/80"
//                         onClick={() => navigate('/wishlist')}
//                       >
//                         Wishlist page
//                       </Button>
//                     </p>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="settings">
//                 <Card className="bg-card border-border">
//                   <CardContent className="p-8">
//                     <h2 className="text-2xl font-serif font-bold text-foreground mb-6" style={{ letterSpacing: '0.05em' }}>
//                       Account Settings
//                     </h2>
//                     <Button
//                       onClick={handleLogout}
//                       variant="destructive"
//                       size="lg"
//                     >
//                       Logout
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </motion.div>
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default UserAccountPage;