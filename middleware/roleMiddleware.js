const roleMiddleware = (allowedRoles) => (req, res, next) => {
    const userRole = req.user.role;

    if (allowedRoles?.includes(userRole)) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Access denied. You do not have the required permissions.",
        });
    }
}

module.exports = roleMiddleware