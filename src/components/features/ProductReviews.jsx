import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, ThumbsUp } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

const ProductReviews = ({ productId, productName }) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewData, setReviewData] = useState({
        name: '',
        email: '',
        review: ''
    });
    const [submitted, setSubmitted] = useState(false);

    // Sample reviews (in a real app, these would come from a database)
    const reviews = [
        {
            id: 1,
            name: "Ahmed Khan",
            rating: 5,
            date: "2 weeks ago",
            review: "Excellent quality printing! The wedding cards turned out beautiful. Highly recommended for anyone looking for professional printing services in Pakistan.",
            helpful: 12
        },
        {
            id: 2,
            name: "Fatima Ali",
            rating: 5,
            date: "1 month ago",
            review: "Very satisfied with the branding package. The team was professional and delivered on time. Great value for money!",
            helpful: 8
        },
        {
            id: 3,
            name: "Hassan Raza",
            rating: 4,
            date: "1 month ago",
            review: "Good quality prints. Delivery was a bit delayed but the final product was worth the wait. Will order again.",
            helpful: 5
        }
    ];

    const handleSubmitReview = (e) => {
        e.preventDefault();

        const message = `📝 *New Product Review*%0A%0A🆔 *Product:* ${productName}%0A⭐ *Rating:* ${rating}/5%0A👤 *Name:* ${reviewData.name}%0A📧 *Email:* ${reviewData.email}%0A%0A💬 *Review:*%0A${reviewData.review}`;

        window.open(`https://wa.me/${siteConfig.whatsapp.number}?text=${message}`, '_blank');

        setSubmitted(true);
        setTimeout(() => {
            setShowReviewForm(false);
            setSubmitted(false);
            setRating(0);
            setReviewData({ name: '', email: '', review: '' });
        }, 2000);
    };

    const StarRating = ({ value, interactive = false, size = 20 }) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        disabled={!interactive}
                        onClick={() => interactive && setRating(star)}
                        onMouseEnter={() => interactive && setHoverRating(star)}
                        onMouseLeave={() => interactive && setHoverRating(0)}
                        className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
                    >
                        <Star
                            size={size}
                            className={`${star <= (interactive ? (hoverRating || rating) : value)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                } transition-colors`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    return (
        <div className="bg-white border border-border-primary p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-border-primary">
                <div>
                    <h3 className="text-2xl font-serif mb-3">Customer Reviews</h3>
                    <div className="flex items-center gap-4">
                        <StarRating value={averageRating} />
                        <span className="text-sm text-brand-black/60">
                            {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-8 py-3 bg-brand-black text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-accent transition-colors"
                >
                    Write a Review
                </button>
            </div>

            {/* Review Form */}
            <AnimatePresence>
                {showReviewForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-12 overflow-hidden"
                    >
                        <div className="bg-bg-secondary p-8 border border-border-primary">
                            {submitted ? (
                                <motion.div
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ThumbsUp size={32} />
                                    </div>
                                    <h4 className="text-xl font-serif mb-2">Thank You!</h4>
                                    <p className="text-sm text-brand-black/60">Your review has been submitted via WhatsApp.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmitReview} className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-black/60 mb-3">
                                            Your Rating *
                                        </label>
                                        <StarRating value={rating} interactive={true} size={32} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-black/60 mb-3">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={reviewData.name}
                                                onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-border-primary bg-white focus:border-brand-accent outline-none transition-colors text-sm"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-black/60 mb-3">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={reviewData.email}
                                                onChange={(e) => setReviewData({ ...reviewData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-border-primary bg-white focus:border-brand-accent outline-none transition-colors text-sm"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-black/60 mb-3">
                                            Your Review *
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={reviewData.review}
                                            onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
                                            className="w-full px-4 py-3 border border-border-primary bg-white focus:border-brand-accent outline-none transition-colors text-sm resize-none"
                                            placeholder="Share your experience with this product..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={rating === 0}
                                        className="flex items-center gap-2 px-8 py-4 bg-brand-black text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send size={16} />
                                        Submit Review
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reviews List */}
            <div className="space-y-8">
                {reviews.map((review) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="pb-8 border-b border-border-primary last:border-0"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h4 className="font-bold text-brand-black mb-1">{review.name}</h4>
                                <div className="flex items-center gap-3">
                                    <StarRating value={review.rating} size={16} />
                                    <span className="text-xs text-brand-black/40">{review.date}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-brand-black/70 leading-relaxed mb-4">
                            {review.review}
                        </p>
                        <button className="flex items-center gap-2 text-xs text-brand-black/40 hover:text-brand-accent transition-colors">
                            <ThumbsUp size={14} />
                            Helpful ({review.helpful})
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductReviews;
