
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockProperties } from '@/data/mockData';
import { toast } from "sonner";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { Property } from '@/components/properties/PropertyCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MeetingReservation = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  // Fill form with user data if logged in
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      if (user.name) setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    // In a real app, fetch the property by ID from an API
    const foundProperty = mockProperties.find(p => p.id === parseInt(id || '0'));
    
    if (foundProperty) {
      setProperty(foundProperty);
    }
    setLoading(false);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!date || !time || !name || !email || !phone) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // In a real app, this would submit to an API
    toast.success("Viewing scheduled successfully! We'll contact you to confirm.");
    
    // Reset form
    setDate(undefined);
    setTime("");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    
    // Redirect back to property detail
    setTimeout(() => {
      navigate(`/properties/${id}`);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-12">
            <svg className="animate-spin h-10 w-10 text-real-gold mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg">Loading property details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container px-4 md:px-8 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
            <p className="mb-8">The property you are looking for does not exist or has been removed.</p>
            <Button asChild>
              <Link to="/properties">Browse All Properties</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12">
        <div className="container px-4 md:px-8">
          <div className="mb-6">
            <nav className="text-sm">
              <ol className="flex flex-wrap items-center">
                <li><Link to="/" className="text-gray-500 hover:text-real-gold">Home</Link></li>
                <li className="mx-2 text-gray-400">/</li>
                <li><Link to="/properties" className="text-gray-500 hover:text-real-gold">Properties</Link></li>
                <li className="mx-2 text-gray-400">/</li>
                <li><Link to={`/properties/${property.id}`} className="text-gray-500 hover:text-real-gold">{property.title}</Link></li>
                <li className="mx-2 text-gray-400">/</li>
                <li className="text-gray-700 font-medium">Schedule a Viewing</li>
              </ol>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule a Property Viewing</CardTitle>
                  <CardDescription>
                    Fill in the form below to schedule a viewing of {property.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date">Select Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) => 
                                date < new Date() || 
                                date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">Select Time *</Label>
                        <Select value={time} onValueChange={setTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTimes.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="Your email address"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          placeholder="Your phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Information</Label>
                      <Textarea 
                        id="message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Any specific questions or requests about the viewing?"
                        rows={4}
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button type="button" variant="outline" asChild>
                        <Link to={`/properties/${property.id}`}>Cancel</Link>
                      </Button>
                      <Button type="submit">Schedule Viewing</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video w-full rounded-md overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">{property.title}</h3>
                      <p className="text-sm text-gray-500">{property.address}</p>
                      <p className="text-real-gold font-bold mt-2">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0,
                        }).format(property.price)}
                      </p>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-real-light-gray p-2 rounded">
                          <p className="text-xs text-gray-500">Beds</p>
                          <p className="font-semibold">{property.bedrooms}</p>
                        </div>
                        <div className="bg-real-light-gray p-2 rounded">
                          <p className="text-xs text-gray-500">Baths</p>
                          <p className="font-semibold">{property.bathrooms}</p>
                        </div>
                        <div className="bg-real-light-gray p-2 rounded">
                          <p className="text-xs text-gray-500">Area</p>
                          <p className="font-semibold">{property.sqft} sqft</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MeetingReservation;
