
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative container px-4 md:px-8 flex flex-col items-center text-center py-32 md:py-40 lg:py-48 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl animate-fade-in">
          Find Your Perfect Place to Call Home
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl text-white/90">
          Discover exceptional properties in your desired location with our personalized real estate services.
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link to="/properties">Browse Properties</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="bg-transparent text-white border-white hover:bg-white/10">
            <Link to="/contact">Contact an Agent</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
