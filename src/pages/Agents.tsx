
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { mockAgents } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const Agents = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-real-navy">
          <div className="container px-4 md:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Expert Agents</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Meet our team of experienced real estate professionals dedicated to helping you achieve your property goals.
            </p>
          </div>
        </section>
        
        {/* Agent List Section */}
        <section className="py-16">
          <div className="container px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {mockAgents.map(agent => (
                <div key={agent.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1">
                  <div className="aspect-[4/3]">
                    <img 
                      src={agent.image} 
                      alt={agent.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
                    <p className="text-gray-600 mb-3">{agent.title}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="bg-real-light-gray">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {agent.listings} listings
                      </span>
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-real-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Top Agent
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-6">{agent.bio}</p>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" asChild>
                        <a href={`mailto:${agent.email}`}>Email</a>
                      </Button>
                      <Button asChild>
                        <a href={`tel:${agent.phone.replace(/[^\d]/g, '')}`}>Call</a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Join Our Team CTA */}
            <div className="mt-16 bg-real-navy rounded-lg p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
              <p className="max-w-2xl mx-auto mb-8">
                Are you a passionate real estate professional looking for a dynamic team? We're always on the lookout for talented individuals to join EstateHub.
              </p>
              <Button variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white hover:text-real-navy">
                <a href="/careers">View Career Opportunities</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Agents;
