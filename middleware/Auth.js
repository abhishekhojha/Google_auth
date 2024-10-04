exports.hasRole = (role) => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }

        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden: Access denied' });
        }

        return next();
    };
};