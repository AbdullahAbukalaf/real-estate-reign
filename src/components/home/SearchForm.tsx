
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SearchForm = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Create query parameters for search
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (priceRange) params.append('price', priceRange);
    
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="bg-white shadow-lg rounded-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-4 -mt-16 relative z-10 mx-4 md:mx-8"
    >
      <div>
        <label className="block text-sm font-medium mb-1 text-real-dark-gray">Location</label>
        <Input 
          type="text" 
          placeholder="Enter city, address" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1 text-real-dark-gray">Property Type</label>
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
        <label className="block text-sm font-medium mb-1 text-real-dark-gray">Price Range</label>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Price</SelectItem>
            <SelectItem value="0-100000">Under $100,000</SelectItem>
            <SelectItem value="100000-300000">$100,000 - $300,000</SelectItem>
            <SelectItem value="300000-500000">$300,000 - $500,000</SelectItem>
            <SelectItem value="500000-1000000">$500,000 - $1,000,000</SelectItem>
            <SelectItem value="1000000+">Over $1,000,000</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-end">
        <Button className="w-full" type="submit">
          Search Properties
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
