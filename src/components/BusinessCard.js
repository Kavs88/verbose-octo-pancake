import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, StarIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const BusinessCard = ({ business, onToggleFavorite, isFavorite = false }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
    if (onToggleFavorite) {
      onToggleFavorite(business.id, !favorite);
    }
  };

  const handleRatingClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Scroll to reviews section on business detail page
    console.log('Scroll to reviews for business:', business.id);
  };

  return (
    <Link to={`/business/${business.id}`} className="block">
      <div className="card overflow-hidden hover:shadow-md transition-all duration-200 group">
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <img 
            src={business.coverPhoto || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'} 
            alt={business.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-default shadow-sm hover:bg-white transition-all duration-200"
          >
            {favorite ? (
              <HeartSolidIcon className="w-5 h-5 text-primary" />
            ) : (
              <HeartIcon className="w-5 h-5 text-text-secondary" />
            )}
          </button>
          
          {/* Member Deal Badge */}
          {business.hasMemberDeal && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-metallic-gold to-metallic-goldLight text-white text-xs font-semibold rounded-default shadow-metallic">
              Member Deal
            </div>
          )}
          
          {/* Premium Badge */}
          {business.isPremium && (
            <div className="absolute bottom-3 left-3 px-3 py-1 bg-gradient-to-r from-gunmetal to-gunmetal-light text-white text-xs font-semibold rounded-default">
              Premium
            </div>
          )}
        </div>
        
        <div className="p-4">
          {/* Business Info */}
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-text group-hover:text-primary transition-colors duration-200 mb-2">
              {business.name}
            </h3>
            <div className="flex items-center space-x-2 text-text-secondary text-sm mb-2">
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                {business.category}
              </span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <MapPinIcon className="w-4 h-4" />
                <span>{business.neighborhood}</span>
              </div>
            </div>
          </div>
          
          {/* Rating Section - Clickable for Reviews */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleRatingClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="flex items-center space-x-1">
                <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-text">{business.rating}</span>
              </div>
              <span className="text-sm text-text-secondary">({business.reviewCount} reviews)</span>
            </button>
            
            {/* Status Indicator */}
            {business.isOpen !== undefined && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                business.isOpen 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {business.isOpen ? 'Open' : 'Closed'}
              </span>
            )}
          </div>
          
          {/* Member Deal Highlight */}
          {business.hasMemberDeal && business.dealHighlight && (
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-default p-3 mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm text-primary font-medium">
                  {business.dealHighlight}
                </p>
              </div>
            </div>
          )}
          
          {/* Amenities Preview */}
          {business.amenities && business.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {business.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 text-text-secondary rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {business.amenities.length > 3 && (
                <span className="text-xs px-2 py-1 bg-gray-100 text-text-secondary rounded-full">
                  +{business.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border-light">
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <UserIcon className="w-3 h-3" />
              <span>Member benefits available</span>
            </div>
            <span className="text-xs text-primary font-medium group-hover:text-primary-dark transition-colors duration-200">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;
