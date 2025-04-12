module.exports = {
    calculateMatchScore: (userPreferences, matchPreferences) => {
        let score = 0;
        const categories = ['ethnicity', 'hobbies', 'activities'];

        categories.forEach(category => {
            if (userPreferences[category] === matchPreferences[category]) {
                score++;
            }
        });

        return score;
    },

    isGoodMatch: (score) => {
        return score >= 3; // A good match is defined as matching on all three categories
    },

    sanitizeInput: (input) => {
        return input.replace(/<[^>]*>/g, ''); // Simple HTML tag removal for sanitization
    },

    generateUniqueId: () => {
        return 'id-' + Math.random().toString(36).substr(2, 16); // Generates a unique ID
    },

    formatDate: (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(date).toLocaleDateString('ar-SA', options);
    },

    generateAvatarUrl: (name) => {
        const encodedName = encodeURIComponent(name);
        return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff`;
    },

    sanitizeUser: (user) => {
        if (!user) return null;

        const { password, __v, ...sanitizedUser } = user.toObject ? user.toObject() : user;
        return sanitizedUser;
    },

    filterUsers: (users, filters = {}) => {
        return users.filter(user => {
            if (filters.minAge && user.age < filters.minAge) return false;
            if (filters.maxAge && user.age > filters.maxAge) return false;

            if (filters.gender && user.gender !== filters.gender) return false;

            if (filters.ethnicity && user.ethnicity !== filters.ethnicity) return false;

            if (filters.hobbies && filters.hobbies.length > 0) {
                const hasMatchingHobby = user.hobbies.some(hobby =>
                    filters.hobbies.includes(hobby)
                );
                if (!hasMatchingHobby) return false;
            }

            if (filters.activities && filters.activities.length > 0) {
                const hasMatchingActivity = user.activities.some(activity =>
                    filters.activities.includes(activity)
                );
                if (!hasMatchingActivity) return false;
            }

            return true;
        });
    },

    getEthnicityCategories: () => {
        return [
            'عربي',
            'آسيوي',
            'أفريقي',
            'أوروبي',
            'أمريكي',
            'متعدد الأعراق',
            'آخر'
        ];
    },

    getHobbyCategories: () => {
        return [
            'القراءة',
            'السفر',
            'الطبخ',
            'الرياضة',
            'الموسيقى',
            'الفن',
            'السينما',
            'التصوير',
            'التكنولوجيا',
            'تعلم اللغات',
            'اليوغا',
            'التأمل',
            'المشي',
            'ركوب الدراجة',
            'السباحة',
            'التسوق',
            'البستنة',
            'ألعاب الفيديو',
            'الحرف اليدوية',
            'الغناء'
        ];
    },

    getActivityCategories: () => {
        return [
            'زيارة المعالم السياحية',
            'التنزه في الحدائق',
            'تناول الطعام في المطاعم',
            'الذهاب إلى السينما',
            'الذهاب إلى الحفلات الموسيقية',
            'زيارة المتاحف',
            'التسوق',
            'ممارسة الرياضة',
            'الذهاب إلى النوادي',
            'حضور الفعاليات الثقافية',
            'تجربة المأكولات المحلية',
            'ركوب القوارب',
            'القيام برحلات سفاري',
            'التزلج',
            'ركوب الخيل',
            'الغوص',
            'ركوب الأمواج',
            'تسلق الجبال',
            'التخييم',
            'المشي لمسافات طويلة'
        ];
    }
};