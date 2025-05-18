
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard, { Property } from '@/components/properties/PropertyCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { mockProperties } from '@/data/mockData';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [bedroomsMin, setBedroomsMin] = useState('any');
  
  useEffect(() => {
    // In a real app, we would fetch from API with the query params
    setProperties(mockProperties);
    
    // Initialize filters from URL params if present
    const locationParam = searchParams.get('location');
    const typeParam = searchParams.get('type');
    const priceParam = searchParams.get('price');
    
    if (locationParam) setSearchTerm(locationParam);
    if (typeParam) setPropertyType(typeParam);
    if (priceParam) {
      const [min, max] = priceParam.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setPriceRange([min, max]);
      } else if (!isNaN(min) && priceParam.includes('+')) {
        setPriceRange([min, 5000000]); // For "1000000+" style ranges
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Apply filters
    let results = properties;
    
    if (searchTerm) {
      results = results.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (propertyType !== 'all') {
      results = results.filter(property => property.type === propertyType);
    }
    
    if (statusFilter !== 'all') {
      results = results.filter(property => property.status === statusFilter);
    }
    
    results = results.filter(property => 
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );
    
    if (bedroomsMin !== 'any') {
      results = results.filter(property => property.bedrooms >= parseInt(bedroomsMin));
    }
    
    setFilteredProperties(results);
  }, [properties, searchTerm, propertyType, statusFilter, priceRange, bedroomsMin]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-real-navy">
          <div className="container px-4 md:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Explore Our Properties</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Browse our comprehensive listings of available properties and find your perfect match.
            </p>
          </div>
        </section>
        
        {/* Filters & Listings */}
        <section className="py-12 bg-real-light-gray">
          <div className="container px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-6">Filter Properties</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Search</label>
                      <Input
                        type="text"
                        placeholder="Search by location, name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Property Type</label>
                      <Select value={propertyType} onValueChange={setPropertyType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="For Sale">For Sale</SelectItem>
                          <SelectItem value="For Rent">For Rent</SelectItem>
                          <SelectItem value="Sold">Sold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Price Range</label>
                      <div className="pt-6 pb-2">
                        <Slider
                          defaultValue={[0, 5000000]}
                          max={5000000}
                          step={50000}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Bedrooms</label>
                      <Select value={bedroomsMin} onValueChange={setBedroomsMin}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select minimum" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      onClick={() => {
                        setSearchTerm('');
                        setPropertyType('all');
                        setStatusFilter('all');
                        setPriceRange([0, 5000000]);
                        setBedroomsMin('any');
                      }}
                      variant="outline"
                      className="w-full mt-2"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Property Listings */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-wrap justify-between items-center">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{filteredProperties.length}</span> properties
                  </p>
                  <div className="flex space-x-2 mt-4 sm:mt-0">
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest first</SelectItem>
                        <SelectItem value="price-asc">Price (low to high)</SelectItem>
                        <SelectItem value="price-desc">Price (high to low)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-12 text-center">
                    <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your filters to find more properties.</p>
                    <Button 
                      onClick={() => {
                        setSearchTerm('');
                        setPropertyType('all');
                        setStatusFilter('all');
                        setPriceRange([0, 5000000]);
                        setBedroomsMin('any');
                      }}
                    >
                      Reset All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
