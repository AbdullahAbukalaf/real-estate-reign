
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import SearchForm from "@/components/home/SearchForm";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialSection from "@/components/home/TestimonialSection";
import ContactForm from "@/components/contact/ContactForm";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container">
          <SearchForm />
        </div>
        <FeaturedProperties />
        <WhyChooseUs />
        <TestimonialSection />
        
        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-8">
            <div className="bg-real-navy rounded-lg p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Find Your Dream Property?</h2>
                <p className="text-white/80 mb-6 md:pr-8">
                  Contact our team today to start your property journey. We're here to answer your questions and help you find the perfect home.
                </p>
              </div>
              <div className="lg:w-1/2 bg-white p-6 rounded-lg w-full">
                <h3 className="text-xl font-semibold mb-6 text-center">Send Us a Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
