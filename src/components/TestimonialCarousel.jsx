import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ali Raza",
    company: "Marketing Director, TechCorp",
    content: "Exceptional quality and fast delivery! The wedding cards turned out better than expected. Will definitely order again.",
    rating: 5,
    avatar: "AR"
  },
  {
    id: 2,
    name: "Fatima Khan",
    company: "Event Planner",
    content: "Professional service and amazing attention to detail. The panaflex printing was perfect for our client's shop signage.",
    rating: 5,
    avatar: "FK"
  },
  {
    id: 3,
    name: "Usman Siddiqui",
    company: "Restaurant Owner",
    content: "Great prices and even better quality. The visiting cards helped establish our brand identity perfectly.",
    rating: 4,
    avatar: "US"
  },
  {
    id: 4,
    name: "Zara Ahmed",
    company: "Fashion Designer",
    content: "Outstanding customer service! They accommodated our custom design requests and delivered on time despite tight deadlines.",
    rating: 5,
    avatar: "ZA"
  },
  {
    id: 5,
    name: "Bilal Mahmood",
    company: "Real Estate Agent",
    content: "Reliable partner for all our printing needs. The roll-up standees are perfect for property exhibitions.",
    rating: 4,
    avatar: "BM"
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="px-6 md:px-20 max-w-7xl mx-auto py-20 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-electric-blue">Clients Say</span>
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our satisfied customers have to say about our services.
        </p>
      </div>

      <div 
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Quote Icon */}
        <div className="absolute -top-6 left-8 bg-neon-purple p-3 rounded-full">
          <Quote className="text-white" size={24} />
        </div>

        {/* Testimonial Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={20} />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-xl md:text-2xl text-white/80 mb-8 italic leading-relaxed">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-purple to-electric-blue flex items-center justify-center text-white font-bold">
                {currentTestimonial.avatar}
              </div>
              <div className="text-left">
                <div className="font-bold text-white">{currentTestimonial.name}</div>
                <div className="text-sm text-white/50">{currentTestimonial.company}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="text-white" size={20} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10"
          aria-label="Next testimonial"
        >
          <ChevronRight className="text-white" size={20} />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-neon-purple scale-125' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-4xl font-bold text-neon-purple mb-2">200+</div>
          <div className="text-white/60">Happy Clients</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-electric-blue mb-2">500+</div>
          <div className="text-white/60">Projects Completed</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-neon-green mb-2">4.9★</div>
          <div className="text-white/60">Average Rating</div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;