
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Handle signup logic here
    console.log('Signup attempt:', formData);
    alert('Signup functionality would be implemented with authentication system');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Create Account</CardTitle>
                  <p className="text-muted-foreground">Join Kimseng Express today</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          First Name
                        </Label>
                        <Input 
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          placeholder="First name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          placeholder="Last name"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Label>
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Phone Number
                      </Label>
                      <Input 
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+855 12 345 678"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Password
                      </Label>
                      <div className="relative">
                        <Input 
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          placeholder="Create a password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input 
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" required />
                      <span className="text-sm">
                        I agree to the{' '}
                        <a href="#" className="text-teal-600 hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
                      </span>
                    </div>

                    <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
                      Create Account
                    </Button>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <Link to="/login" className="text-teal-600 hover:underline">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
