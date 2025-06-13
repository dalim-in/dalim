import { useState } from 'react';
import { Visual, CreateVisualData } from '@/src/types/visual';

// Mock data for demonstration - replace with actual API calls
const mockVisuals: Visual[] = [];

export const useVisuals = () => {
  const [visuals, setVisuals] = useState<Visual[]>(mockVisuals);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVisual = async (data: CreateVisualData): Promise<Visual> => {
    setLoading(true);
    try {
      // Simulate API call
      const newVisual: Visual = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description || null,
        category: data.category,
        image: typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image),
        link: data.link || null,
        tags: data.tags,
        viewCount: 0,
        visitCount: 0,
        featured: data.featured,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '1',
        user: {
          id: '1',
          name: 'Admin User',
          email: 'contact@dalim.in',
          image: null,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          role: 'ADMIN' as any,
          username: 'admin'
        }
      };
      
      setVisuals(prev => [newVisual, ...prev]);
      return newVisual;
    } catch (err) {
      setError('Failed to create visual');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateVisual = async (id: string, data: Partial<CreateVisualData>): Promise<Visual> => {
    setLoading(true);
    try {
      const visual = visuals.find(v => v.id === id);
      if (!visual) throw new Error('Visual not found');

      const updatedVisual = {
        ...visual,
        ...data,
        image: typeof data.image === 'string' ? data.image : 
               data.image ? URL.createObjectURL(data.image) : visual.image,
        updatedAt: new Date()
      };

      setVisuals(prev => prev.map(v => v.id === id ? updatedVisual : v));
      return updatedVisual;
    } catch (err) {
      setError('Failed to update visual');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteVisual = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      setVisuals(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      setError('Failed to delete visual');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (id: string): Promise<void> => {
    const visual = visuals.find(v => v.id === id);
    if (visual) {
      await updateVisual(id, { featured: !visual.featured });
    }
  };

  return {
    visuals,
    loading,
    error,
    createVisual,
    updateVisual,
    deleteVisual,
    toggleFeatured
  };
};