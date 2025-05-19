
import { useState, useEffect } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyCard, { Property } from '@/components/properties/PropertyCard';
import { mockProperties } from '@/data/mockData';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);

  useEffect(() => {
    // Filter properties that are in the favorites list
    const favProps = mockProperties.filter(property => 
      favorites.includes(property.id)
    );
    setFavoriteProperties(favProps);
  }, [favorites]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-real-light-gray py-12">
          <div className="container px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
                <p className="text-gray-600">Your saved properties in one place</p>
              </div>
            </div>

            {!isAuthenticated ? (
              <div className="bg-white p-8 rounded-lg text-center">
                <div className="mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Sign in to save your favorites</h2>
                <p className="text-gray-600 mb-6">Create an account or sign in to keep track of your favorite properties</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/register">Create Account</Link>
                  </Button>
                </div>
              </div>
            ) : favoriteProperties.length === 0 ? (
              <div className="bg-white p-8 rounded-lg text-center">
                <div className="mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
                <p className="text-gray-600 mb-6">Start saving properties you're interested in by clicking the heart icon</p>
                <Button asChild>
                  <Link to="/properties">Browse Properties</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
