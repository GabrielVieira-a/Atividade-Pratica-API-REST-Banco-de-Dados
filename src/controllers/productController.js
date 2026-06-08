const prisma = require("../prisma");

// GET /products
exports.getAll = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                supplier: true
            }
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// GET /products/:id
exports.getById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                supplier: true
            }
        });

        if (!product) {
            return res.status(404).json({
                error: "Product not found."
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// POST /products
exports.create = async (req, res) => {
    try {
        const {
            name,
            description,
            unity,
            minimumStock,
            categoryId,
            supplierId
        } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                unity,
                minimumStock,
                categoryId,
                supplierId
            }
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// PUT /products/:id
exports.update = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const {
            name,
            description,
            unity,
            minimumStock,
            categoryId,
            supplierId
        } = req.body;

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                unity,
                minimumStock,
                categoryId,
                supplierId
            }
        });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// DELETE /products/:id
exports.remove = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.product.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Product deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};