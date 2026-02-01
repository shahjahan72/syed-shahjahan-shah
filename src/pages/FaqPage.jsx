import React, { useState } from 'react';
import { Link, ChevronDown, ArrowLeft } from 'lucide-react';

const FaqPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Kya aap poore Pakistan mein delivery karte hain?",
            answer: "Ji haan, hum Karachi ke sath sath poore Pakistan mein delivery service provide karte hain. Karachi ke liye hum Bykea/Indriver ya apna rider istemal karte hain, aur baqi shehron ke liye TCS ya Leopard Couriers ke zariye parcels bheje jaate hain."
        },
        {
            question: "Agar mere paas design pehle se maujood ho, to kya prices kam hongi?",
            answer: "Ji bilkul! Hamare plans mein design aur printing dono shamil hain. Agar aapka design \"Print-ready\" (PDF, AI, ya CDR format) mein maujood hai, to hum aapko sirf printing ki discounted price quote karenge."
        },
        {
            question: "Order dene ke baad kitne din mein kaam mukammal ho jata hai?",
            answer: "Normal orders (Business cards, Flyers) 3 se 5 working days mein tayyar ho jaate hain. Special finishes (Spot UV, Foil) aur packaging orders mein 7 se 10 din lag sakte hain. Urgent delivery ke liye extra charges apply hote hain."
        },
        {
            question: "Kya main printing se pehle sample dekh sakta hoon?",
            answer: "Hum digital proof (soft copy) lazmi check karwaate hain. Physical sample ke liye aap hamari shop visit kar sakte hain jahan mukhtalif paper qualities aur finishes ke samples maujood hain. Direct sample print karwane par sample fees lag sakti hai."
        },
        {
            question: "Payment ka kya tareeqakar (Method) hai?",
            answer: "Hum 50% advance payment par order confirm karte hain aur baqi 50% kaam mukammal hone par (delivery se pehle) li jati hai. Aap Bank Transfer, JazzCash, EasyPaisa, ya Cash ke zariye payment kar sakte hain."
        },
        {
            question: "Kya aap bulk orders par discount dete hain?",
            answer: "Ji haan! Hamari pricing quantity ke sath kam hoti rehti hai. Agar aapki quantity hamare plans se zyada hai, to aap \"Custom Quote\" ke liye humse rabta kar sakte hain, hum aapko special corporate rates denge."
        },
        {
            question: "Agar print mein koi ghalti ho to kya hoga?",
            answer: "Agar ghalti hamari taraf se hogi (Printing error ya wrong material), to hum usay bila-muawza (free of cost) re-print kar ke denge. Is liye hum mashwara dete hain ke digital proof ko achi tarah check kar ke approve karein."
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-brand-white selection:bg-brand-black selection:text-white">
            {/* Header */}
            <header className="border-b border-brand-black/10">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <Link 
                        to="/shop" 
                        className="flex items-center gap-2 text-brand-black/60 hover:text-brand-black transition-colors mb-6"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm">Back to Shop</span>
                    </Link>
                    
                    <h1 className="text-4xl md:text-5xl font-serif text-brand-black mb-4">Frequently Asked Questions</h1>
                    <p className="text-brand-black/60 max-w-2xl">
                        Sab se ziada poochhe jane wale sawalat aur unke jawab
                    </p>
                </div>
            </header>

            {/* FAQ Content */}
            <main className="max-w-4xl mx-auto px-6 py-16">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-brand-black/10 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="font-bold text-brand-black text-lg">{faq.question}</h3>
                                <ChevronDown 
                                    size={20} 
                                    className={`text-brand-black transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                                />
                            </button>
                            
                            {openIndex === index && (
                                <div className="p-6 pt-0 bg-white border-t border-brand-black/5">
                                    <p className="text-brand-black/70 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Additional Help Section */}
                <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-serif text-brand-black mb-4">Still Have Questions?</h2>
                    <p className="text-brand-black/60 mb-6">
                        Hamari team aapki madad ke liye hamesha tayar hai
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`https://wa.me/${siteConfig.whatsapp.number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors"
                        >
                            Chat on WhatsApp
                        </a>
                        <Link 
                            to="/contact" 
                            className="px-6 py-3 bg-brand-black text-white font-bold rounded-md hover:bg-brand-accent transition-colors"
                        >
                            Send Message
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

import { siteConfig } from '../config/siteConfig';

export default FaqPage; 