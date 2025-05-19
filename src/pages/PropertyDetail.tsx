import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import PropertyCard, { Property } from '@/components/properties/PropertyCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProperties } from '@/data/mockData';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, Calendar } from 'lucide-react';
import { toast } from "sonner";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { isFavorite, addToFavorites, removeFromFavorites } = useWishlist();
  
  // Mock additional images
  const additionalImages = [
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  ];
  
  useEffect(() => {
    // In a real app, fetch the property by ID from an API
    const foundProperty = mockProperties.find(p => p.id === parseInt(id || '0'));
    
    if (foundProperty) {
      setProperty(foundProperty);
    }
    setLoading(false);
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteToggle = () => {
    if (!property) return;
    
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
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

  // Combine property main image with additional mock images
  const allImages = [property.image, ...additionalImages];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-real-light-gray py-4">
          <div className="container px-4 md:px-8">
            <nav className="text-sm">
              <ol className="flex flex-wrap items-center">
                <li><Link to="/" className="text-gray-500 hover:text-real-gold">Home</Link></li>
                <li className="mx-2 text-gray-400">/</li>
                <li><Link to="/properties" className="text-gray-500 hover:text-real-gold">Properties</Link></li>
                <li className="mx-2 text-gray-400">/</li>
                <li className="text-gray-700 font-medium truncate max-w-[200px]">{property.title}</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Property Gallery */}
        <section className="bg-white py-8">
          <div className="container px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <div className="relative overflow-hidden rounded-lg aspect-[16/9]">
                  <img 
                    src={allImages[activeImageIndex]} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex space-x-3 mt-3 overflow-x-auto pb-2">
                  {allImages.map((image, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`rounded-md overflow-hidden flex-shrink-0 w-20 h-20 ${activeImageIndex === index ? 'ring-2 ring-real-gold' : ''}`}
                    >
                      <img 
                        src={image} 
                        alt={`View ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Summary */}
              <div className="lg:col-span-4">
                <div className="bg-real-light-gray p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        property.status === 'For Sale' ? 'bg-real-gold text-white' : 
                        property.status === 'For Rent' ? 'bg-blue-500 text-white' : 
                        'bg-gray-500 text-white'
                      }`}>
                        {property.status}
                      </span>
                    </div>
                    <button 
                      onClick={handleFavoriteToggle}
                      className={`p-2 rounded-full bg-white/80 backdrop-blur-sm ${isFavorite(property.id) ? 'text-red-500' : 'text-gray-400'}`}
                      aria-label={isFavorite(property.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart fill={isFavorite(property.id) ? "currentColor" : "none"} className="h-6 w-6" />
                    </button>
                  </div>

                  <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
                  <p className="text-gray-600 mb-4">{property.address}</p>
                  <p className="text-real-gold text-3xl font-bold mb-6">{formatPrice(property.price)}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="bg-white p-3 rounded-lg">
                      <span className="block text-sm text-gray-500">Bedrooms</span>
                      <span className="font-semibold">{property.bedrooms}</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <span className="block text-sm text-gray-500">Bathrooms</span>
                      <span className="font-semibold">{property.bathrooms}</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <span className="block text-sm text-gray-500">Area</span>
                      <span className="font-semibold">{property.sqft} sqft</span>
                    </div>
                  </div>

                  <Button asChild className="w-full mb-3 flex items-center gap-2">
                    <Link to={`/properties/${property.id}/reserve`}>
                      <Calendar className="w-5 h-5" />
                      Schedule a Viewing
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">Contact Agent</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Details Tabs */}
        <section className="py-12">
          <div className="container px-4 md:px-8">
            <Tabs defaultValue="description">
              <TabsList className="mb-8">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">About This Property</h2>
                <div className="prose max-w-none">
                  <p className="mb-4">
                    This stunning {property.bedrooms} bedroom, {property.bathrooms} bathroom property showcases exceptional design and premium finishes throughout. 
                    Located in a highly desirable neighborhood, this {property.type} offers the perfect blend of comfort, style, and convenience.
                  </p>
                  <p className="mb-4">
                    With {property.sqft} square feet of thoughtfully designed living space, this home features spacious rooms, abundant natural light, 
                    and high-quality fixtures. The gourmet kitchen includes stainless steel appliances, custom cabinetry, and a large island perfect for entertaining.
                  </p>
                  <p>
                    The primary suite offers a luxurious retreat with a walk-in closet and an en-suite bathroom featuring a soaking tub and separate shower. 
                    Additional highlights include hardwood floors, a modern open concept layout, and a private outdoor space ideal for relaxation.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Property Type:</span>
                        <span className="font-medium">{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium">{property.status}</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Year Built:</span>
                        <span className="font-medium">2019</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Lot Size:</span>
                        <span className="font-medium">0.25 acres</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Interior Details</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Bedrooms:</span>
                        <span className="font-medium">{property.bedrooms}</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Bathrooms:</span>
                        <span className="font-medium">{property.bathrooms}</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Floor Area:</span>
                        <span className="font-medium">{property.sqft} sqft</span>
                      </li>
                      <li className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Garage:</span>
                        <span className="font-medium">2 Cars</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Property Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Interior</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Central Heating</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Air Conditioning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Fireplace</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Walk-in Closet</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Exterior</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Private Garden</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Outdoor Patio</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>BBQ Area</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Double Garage</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Nearby</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Shopping Mall</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Public Transport</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Schools</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Parks & Recreation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <div className="aspect-[16/9] w-full bg-gray-200 rounded-lg mb-4">
                  {/* Placeholder for map - in a real app, this would be an actual map */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-600">Map view would be displayed here</p>
                      <p className="text-sm text-gray-500 mt-2">{property.address}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Neighborhood</h3>
                    <p className="text-gray-600 mb-4">
                      This property is located in a highly desirable neighborhood with excellent schools, 
                      parks, and amenities. The area offers a perfect blend of urban convenience and residential tranquility.
                    </p>
                    <h4 className="font-semibold mt-4 mb-2">Distance to:</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Downtown:</span>
                        <span className="font-medium">3.2 miles</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Airport:</span>
                        <span className="font-medium">12.5 miles</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Nearest School:</span>
                        <span className="font-medium">0.8 miles</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Grocery Store:</span>
                        <span className="font-medium">0.3 miles</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Transportation</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-real-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <div>
                          <span className="font-medium">Public Transit</span>
                          <p className="text-sm text-gray-600">
                            Multiple bus stops within 2 blocks. Subway station 10 minute walk.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-real-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <div>
                          <span className="font-medium">Highways</span>
                          <p className="text-sm text-gray-600">
                            Easy access to Highway 101 (1.5 miles) and Interstate 280 (3 miles).
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Similar Properties */}
        <section className="py-12 bg-real-light-gray">
          <div className="container px-4 md:px-8">
            <h2 className="text-2xl font-bold mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockProperties
                .filter(p => p.id !== property.id && p.type === property.type)
                .slice(0, 3)
                .map(similarProperty => (
                  <PropertyCard key={similarProperty.id} property={similarProperty} />
                ))
              }
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
