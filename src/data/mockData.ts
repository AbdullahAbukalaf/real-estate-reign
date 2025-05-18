
import { Property } from '@/components/properties/PropertyCard';

export const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    address: "123 Oceanview Drive, Malibu, CA",
    price: 2750000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3800,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    type: "house",
    status: "For Sale"
  },
  {
    id: 2,
    title: "Downtown Loft Apartment",
    address: "456 Urban Ave, New York, NY",
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    type: "apartment",
    status: "For Sale"
  },
  {
    id: 3,
    title: "Classic Suburban Home",
    address: "789 Maple St, Chicago, IL",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    type: "house",
    status: "For Sale"
  },
  {
    id: 4,
    title: "Waterfront Condominium",
    address: "101 Harbor View, Seattle, WA",
    price: 1200000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    type: "condo",
    status: "For Sale"
  },
  {
    id: 5,
    title: "City Center Apartment",
    address: "555 Downtown Blvd, San Francisco, CA",
    price: 3500,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 850,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    type: "apartment",
    status: "For Rent"
  },
  {
    id: 6,
    title: "Rustic Country Estate",
    address: "777 Rural Route, Austin, TX",
    price: 1750000,
    bedrooms: 6,
    bathrooms: 4.5,
    sqft: 4200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    type: "house",
    status: "For Sale"
  },
  {
    id: 7,
    title: "Modern Office Space",
    address: "888 Business Park, Denver, CO",
    price: 875000,
    bedrooms: 0,
    bathrooms: 2,
    sqft: 2500,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    type: "commercial",
    status: "For Sale"
  },
  {
    id: 8,
    title: "Beachfront Vacation Home",
    address: "222 Shore Dr, Miami, FL",
    price: 1950000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    type: "house",
    status: "For Sale"
  },
  {
    id: 9,
    title: "Mountain View Cabin",
    address: "333 Alpine Way, Aspen, CO",
    price: 820000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1650,
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    type: "house",
    status: "For Sale"
  }
];

export const mockAgents = [
  {
    id: 1,
    name: "Jennifer Moore",
    title: "Senior Real Estate Agent",
    phone: "(555) 123-4567",
    email: "jennifer@estatehub.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "With over 15 years of experience in luxury real estate, Jennifer specializes in high-end properties and investment opportunities.",
    listings: 24,
    specialties: ["Luxury Homes", "Waterfront Properties", "Investment Properties"]
  },
  {
    id: 2,
    name: "Michael Stephens",
    title: "Commercial Property Specialist",
    phone: "(555) 234-5678",
    email: "michael@estatehub.com",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Michael has a background in commercial real estate development and helps businesses find the perfect location for their needs.",
    listings: 18,
    specialties: ["Commercial", "Office Spaces", "Retail Properties"]
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    title: "Residential Sales Specialist",
    phone: "(555) 345-6789",
    email: "sophia@estatehub.com",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "Sophia is passionate about helping first-time homebuyers find their dream home within their budget.",
    listings: 30,
    specialties: ["Residential", "First-time Buyers", "Urban Apartments"]
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Luxury Property Consultant",
    phone: "(555) 456-7890",
    email: "david@estatehub.com",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    bio: "David specializes in exclusive properties and has a network of high-net-worth clients looking for their next investment.",
    listings: 15,
    specialties: ["Luxury Estates", "Private Sales", "International Clients"]
  }
];
