
import { useState, useEffect } from 'react';
import PropertyCard, { Property } from '@/components/properties/PropertyCard';
import { mockProperties } from '@/data/mockData';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  
  useEffect(() => {
    // In a real app, we would fetch from an API
    // For now, use mock data and filter to show only 3 featured properties
    setProperties(mockProperties.slice(0, 3));
  }, []);

  return (
    <section className="py-16 bg-real-light-gray">
      <div className="container px-4 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties. Each one has been carefully selected for exceptional quality and value.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
