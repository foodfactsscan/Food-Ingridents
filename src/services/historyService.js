
import authService from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class HistoryService {
    // Add product to user history
    async addToHistory(product) {
        if (!authService.isAuthenticated()) return { success: false, error: 'User not logged in' };

        try {
            const token = authService.getToken();

            // Extract relevant data
            const historyItem = {
                barcode: product._id || product.code,
                productName: product.product_name || 'Unknown Product',
                brand: product.brands || '',
                image: product.image_front_small_url || product.image_front_url || '',
                grade: product.nutrition_grades || '?',
            };

            const response = await fetch(`${API_URL}/profile/history`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(historyItem)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add to history');
            }

            return { success: true, history: data.history };
        } catch (error) {
            console.error('Add history error:', error);
            return { success: false, error: error.message };
        }
    }

    // Remove product from history
    async removeFromHistory(barcode) {
        if (!authService.isAuthenticated()) return { success: false, error: 'User not logged in' };

        try {
            const token = authService.getToken();

            const response = await fetch(`${API_URL}/profile/history/${barcode}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to remove from history');
            }

            return { success: true, history: data.history };
        } catch (error) {
            console.error('Delete history error:', error);
            return { success: false, error: error.message };
        }
    }

    // Get user history (via profile)
    async getHistory() {
        if (!authService.isAuthenticated()) return { success: false, error: 'User not logged in' };

        try {
            const token = authService.getToken();

            // We fetch the full profile as history is embedded
            const response = await fetch(`${API_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch history');
            }

            return { success: true, history: data.profile?.history || [] };
        } catch (error) {
            console.error('Get history error:', error);
            return { success: false, error: error.message };
        }
    }
}

const historyService = new HistoryService();
export default historyService;
