// import React, { useState } from 'react';
// import { Helmet } from 'react-helmet';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import Header from '@/components/Header.jsx';
// import Footer from '@/components/Footer.jsx';
// import { useAuth } from '@/contexts/AuthContext.jsx';
// import { toast } from 'sonner';

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const { signup } = useAuth();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     passwordConfirm: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.passwordConfirm) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       return;
//     }

//     setLoading(true);

//     try {
//       await signup(formData.email, formData.password, formData.passwordConfirm, formData.name);
//       toast.success('Account created successfully');
//       navigate('/account');
//     } catch (error) {
//       console.error('Signup failed:', error);
//       toast.error('Failed to create account. Email may already be in use.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Sign Up - Nadeel</title>
//         <meta name="description" content="Create your Nadeel account" />
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
//               Join Nadeel
//             </h1>
//             <p className="text-muted-foreground text-center mb-8">
//               Create your account
//             </p>

//             <Card className="bg-card border-border shadow-xl">
//               <CardContent className="p-8">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div>
//                     <Label htmlFor="name" className="text-foreground">Name</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       type="text"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="mt-2 bg-background text-foreground border-border"
//                     />
//                   </div>

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
//                       minLength={8}
//                       className="mt-2 bg-background text-foreground border-border"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="passwordConfirm" className="text-foreground">Confirm Password</Label>
//                     <Input
//                       id="passwordConfirm"
//                       name="passwordConfirm"
//                       type="password"
//                       value={formData.passwordConfirm}
//                       onChange={handleChange}
//                       required
//                       minLength={8}
//                       className="mt-2 bg-background text-foreground border-border"
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     disabled={loading}
//                     size="lg"
//                     className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
//                   >
//                     {loading ? 'Creating account...' : 'Sign Up'}
//                   </Button>
//                 </form>

//                 <p className="text-center text-sm text-muted-foreground mt-6">
//                   Already have an account?{' '}
//                   <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
//                     Login
//                   </Link>
//                 </p>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default SignupPage;