// import React, { useState } from 'react';
// import { Helmet } from 'react-helmet';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import Header from '@/components/Header.jsx';
// import Footer from '@/components/Footer.jsx';
// import { useAuth } from '@/contexts/AuthContext.jsx';
// import { toast } from 'sonner';

// const AdminLoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const authData = await login(formData.email, formData.password);
      
//       if (authData.record.role !== 'admin') {
//         toast.error('Access denied. Admin privileges required.');
//         return;
//       }

//       toast.success('Admin login successful');
//       navigate('/admin');
//     } catch (error) {
//       console.error('Admin login failed:', error);
//       toast.error('Invalid credentials');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Admin Login - Nadeel</title>
//         <meta name="description" content="Admin login for Nadeel" />
//       </Helmet>

//       <div className="min-h-screen bg-background">
//         <Header />

//         <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="text-4xl font-serif font-bold text-foreground mb-2 text-center" style={{ letterSpacing: '0.05em' }}>
//               Admin Access
//             </h1>
//             <p className="text-muted-foreground text-center mb-8">
//               Login to admin dashboard
//             </p>

//             <Card className="bg-card border-border shadow-xl">
//               <CardContent className="p-8">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div>
//                     <Label htmlFor="email" className="text-foreground">Email</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="mt-2 bg-background text-foreground border-border"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="password" className="text-foreground">Password</Label>
//                     <Input
//                       id="password"
//                       name="password"
//                       type="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                       className="mt-2 bg-background text-foreground border-border"
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     disabled={loading}
//                     size="lg"
//                     className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
//                   >
//                     {loading ? 'Logging in...' : 'Admin Login'}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default AdminLoginPage;