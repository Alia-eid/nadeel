import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useProducts } from '@/hooks/useProducts.js';
import { toast } from 'sonner';

const AdminDashboardPage = () => {
  const { allProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock'), 10) || 0,
      description: formData.get('description'),
      category: formData.get('category'),
      image: formData.get('image')
    };
    try {
      await addProduct(product);
      toast.success('Product added successfully');
      setIsAddDialogOpen(false);
      e.target.reset();
    } catch (error) {
      toast.error(error.message || 'Failed to add product');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock'), 10) || 0,
      description: formData.get('description'),
      category: formData.get('category'),
      image: formData.get('image')
    };
    try {
      await updateProduct(editingProduct.id, updates);
      toast.success('Product updated successfully');
      setEditingProduct(null);
    } catch (error) {
      toast.error(error.message || 'Failed to update product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error(error.message || 'Failed to delete product');
      }
    }
  };

  const ProductForm = ({ product, onSubmit, submitText }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Product name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={product?.name}
          required
          className="mt-1 text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          defaultValue={product?.price}
          required
          className="mt-1 text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div>
        <Label htmlFor="stock">Stock quantity</Label>
        <Input
          id="stock"
          name="stock"
          type="number"
          min="0"
          step="1"
          defaultValue={product?.stock ?? 0}
          required
          className="mt-1 text-foreground placeholder:text-muted-foreground"
        />
        <p className="text-xs text-muted-foreground mt-1">
          When stock reaches 0, the product shows as out of stock on the storefront.
        </p>
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue={product?.category || 'Perfume'}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Perfume">Perfume</SelectItem>
            <SelectItem value="Musk">Musk</SelectItem>
            <SelectItem value="Body Splash">Body Splash</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          rows={4}
          required
          className="mt-1 text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          type="url"
          defaultValue={product?.image}
          required
          className="mt-1 text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <Button type="submit" className="w-full transition-all duration-200 active:scale-95">
        {submitText}
      </Button>
    </form>
  );

  return (
    <>
      <Helmet>
        <title>Admin dashboard - Nadeel</title>
        <meta name="description" content="Manage Nadeel products and inventory." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="luxury-container py-12 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl md:text-5xl font-bold">
                Admin dashboard
              </h1>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="transition-all duration-200 active:scale-95">
                    <Plus className="w-4 h-4 mr-2" />
                    Add product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add new product</DialogTitle>
                  </DialogHeader>
                  <ProductForm onSubmit={handleAddProduct} submitText="Add product" />
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>
                            {product.stock != null && product.stock <= 0 ? (
                              <span className="text-destructive font-medium">Out of stock</span>
                            ) : (
                              <span>{product.stock ?? '—'}</span>
                            )}
                          </TableCell>
                          <TableCell>{product.rating}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog open={editingProduct?.id === product.id} onOpenChange={(open) => !open && setEditingProduct(null)}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditingProduct(product)}
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Edit product</DialogTitle>
                                  </DialogHeader>
                                  <ProductForm
                                    product={editingProduct}
                                    onSubmit={handleUpdateProduct}
                                    submitText="Update product"
                                  />
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AdminDashboardPage;