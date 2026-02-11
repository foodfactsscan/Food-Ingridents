import express from 'express';
import { authenticateToken } from './auth-simple.js';
import { profilesDB } from '../db.js';

const router = express.Router();

// ═══════════════════════════════════════════
// GET /api/profile - Get user profile
// ═══════════════════════════════════════════
router.get('/', authenticateToken, (req, res) => {
    try {
        const profile = profilesDB.get(req.userEmail) || null;
        res.json({ success: true, profile });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ═══════════════════════════════════════════
// PUT /api/profile - Update user profile
// ═══════════════════════════════════════════
router.put('/', authenticateToken, (req, res) => {
    try {
        const {
            firstName,
            lastName,
            profilePhoto,
            gender,
            age,
            heightCm,
            weightKg,
            goal,
            chronicDiseases,
            temporaryIssues,
            customHealthIssues,
            customGoals
        } = req.body;

        const existingProfile = profilesDB.get(req.userEmail) || {};

        const updatedProfile = {
            ...existingProfile,
            email: req.userEmail,
            firstName: firstName !== undefined ? firstName : (existingProfile.firstName || ''),
            lastName: lastName !== undefined ? lastName : (existingProfile.lastName || ''),
            profilePhoto: profilePhoto !== undefined ? profilePhoto : (existingProfile.profilePhoto || ''),
            gender: gender !== undefined ? gender : (existingProfile.gender || ''),
            age: age !== undefined ? age : (existingProfile.age || null),
            heightCm: heightCm !== undefined ? heightCm : (existingProfile.heightCm || null),
            weightKg: weightKg !== undefined ? weightKg : (existingProfile.weightKg || null),
            goal: goal !== undefined ? goal : (existingProfile.goal || ''),
            chronicDiseases: chronicDiseases !== undefined ? chronicDiseases : (existingProfile.chronicDiseases || []),
            temporaryIssues: temporaryIssues !== undefined ? temporaryIssues : (existingProfile.temporaryIssues || []),
            customHealthIssues: customHealthIssues !== undefined ? customHealthIssues : (existingProfile.customHealthIssues || []),
            customGoals: customGoals !== undefined ? customGoals : (existingProfile.customGoals || []),
            updatedAt: new Date().toISOString()
        };

        // Save to file DB — persists across restarts
        profilesDB.set(req.userEmail, updatedProfile);

        res.json({
            success: true,
            message: 'Profile updated successfully',
            profile: updatedProfile
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ═══════════════════════════════════════════
// DELETE /api/profile/temporary-issue
// ═══════════════════════════════════════════
router.delete('/temporary-issue', authenticateToken, (req, res) => {
    try {
        const { issue } = req.body;
        const profile = profilesDB.get(req.userEmail);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.temporaryIssues = (profile.temporaryIssues || []).filter(i => i !== issue);
        profilesDB.set(req.userEmail, profile);

        res.json({ success: true, profile });
    } catch (error) {
        console.error('Delete temporary issue error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
