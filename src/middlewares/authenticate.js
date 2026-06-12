const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {


    const authHeader = req.headers.authorization;

    
}

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: "Unauthorized. Missing or invalid token."
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({
            error: "Unauthorized. Missing or invalid token."
        });
    }

    const [scheme, token] = parts;

    if (scheme !== "Bearer") {
        return res.status(401).json({
            error: "Unauthorized. Missing or invalid token."
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            error: "Unauthorized. Missing or invalid token."
        });
    }
};