import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  // Fetch all businesses
  const fetchBusinesses = useCallback(async (params = {}) => {
    console.log('🔍 fetchBusinesses called with params:', params);
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getBusinesses(params);
      console.log('📡 API Response:', response);
      console.log('📊 Response data:', response.data);
      setBusinesses(response.data || []);
      return response;
    } catch (err) {
      console.error('❌ Failed to fetch businesses:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch businesses with filters
  const fetchBusinessesWithFilters = useCallback(async (newFilters) => {
    setFilters(newFilters);
    await fetchBusinesses(newFilters);
  }, [fetchBusinesses]);

  // Search businesses
  const searchBusinesses = useCallback(async (query) => {
    if (!query.trim()) {
      await fetchBusinesses();
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.searchBusinesses(query, filters);
      setBusinesses(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Failed to search businesses:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, fetchBusinesses]);

  // Get businesses by category
  const getBusinessesByCategory = useCallback(async (category) => {
    console.log('🏷️ getBusinessesByCategory called with:', category);
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getBusinessesByCategory(category);
      console.log('📡 Category API Response:', response);
      setBusinesses(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch businesses by category:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get businesses by neighborhood
  const getBusinessesByNeighborhood = useCallback(async (neighborhood) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getBusinessesByNeighborhood(neighborhood);
      setBusinesses(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch businesses by neighborhood:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get premium businesses
  const getPremiumBusinesses = useCallback(async () => {
    console.log('⭐ getPremiumBusinesses called');
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getPremiumBusinesses();
      console.log('📡 Premium API Response:', response);
      const businessesData = response.data || [];
      setBusinesses(businessesData);
      return { data: businessesData }; // Return the data in the expected format
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch premium businesses:', err);
      return { data: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get businesses with deals
  const getBusinessesWithDeals = useCallback(async () => {
    console.log('🎯 getBusinessesWithDeals called');
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getBusinessesWithDeals();
      console.log('📡 Deals API Response:', response);
      const businessesData = response.data || [];
      setBusinesses(businessesData);
      return { data: businessesData }; // Return the data in the expected format
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch businesses with deals:', err);
      return { data: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get recommended businesses
  const getRecommendedBusinesses = useCallback(async () => {
    console.log('🌟 getRecommendedBusinesses called');
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getRecommendedBusinesses();
      console.log('📡 Recommended API Response:', response);
      const businessesData = response.data || [];
      setBusinesses(businessesData);
      return { data: businessesData }; // Return the data in the expected format
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch recommended businesses:', err);
      return { data: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new business
  const createBusiness = useCallback(async (businessData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.createBusiness(businessData);
      setBusinesses(prev => [response.data, ...prev]);
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Failed to create business:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update business
  const updateBusiness = useCallback(async (id, businessData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.updateBusiness(id, businessData);
      setBusinesses(prev => 
        prev.map(business => 
          business.id === id ? response.data : business
        )
      );
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Failed to update business:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete business
  const deleteBusiness = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await apiService.deleteBusiness(id);
      setBusinesses(prev => prev.filter(business => business.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Failed to delete business:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    console.log('🚀 useBusinesses hook mounted, calling fetchBusinesses');
    fetchBusinesses();
  }, [fetchBusinesses]);

  return {
    businesses,
    loading,
    error,
    filters,
    fetchBusinesses,
    fetchBusinessesWithFilters,
    searchBusinesses,
    getBusinessesByCategory,
    getBusinessesByNeighborhood,
    getPremiumBusinesses,
    getBusinessesWithDeals,
    getRecommendedBusinesses,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    setFilters
  };
};
