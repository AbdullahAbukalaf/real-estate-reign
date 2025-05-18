
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  type: string;
  status: 'For Sale' | 'For Rent' | 'Sold';
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="property-card bg-white overflow-hidden">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-64 object-cover transition-transform duration-500"
        />
        <Badge 
          className={`absolute top-4 left-4 ${
            property.status === 'For Sale' ? 'bg-real-gold' : 
            property.status === 'For Rent' ? 'bg-blue-500' : 'bg-gray-500'
          }`}
        >
          {property.status}
        </Badge>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-1 truncate">{property.title}</h3>
        <p className="text-gray-600 mb-2 text-sm truncate">{property.address}</p>
        <p className="text-real-gold text-xl font-bold mb-4">{formatPrice(property.price)}</p>
        
        <div className="flex justify-between mb-5 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            {property.sqft} sqft
          </span>
        </div>
        
        <Button asChild className="w-full">
          <Link to={`/properties/${property.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
