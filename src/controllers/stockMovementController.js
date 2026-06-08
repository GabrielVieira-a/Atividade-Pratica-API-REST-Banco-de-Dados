const prisma = require("../prisma");

// GET /movements
exports.getAll = async (req, res) => {
    try {
        const movements = await prisma.stockMovement.findMany({
            include: {
                product: true
            }
        });

        res.status(200).json(movements);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// POST /movements
exports.create = async (req, res) => {
    try {
        const { type, quantity, notes, productId } = req.body;

        // Validação de campos obrigatórios
        if (!type || !quantity || !productId) {
            return res.status(400).json({
                error: "Type, quantity and productId are required."
            });
        }

        // Validação da quantidade
        if (quantity <= 0) {
            return res.status(400).json({
                error: "Quantity must be greater than zero."
            });
        }

        // Validação do tipo
        if (type !== "IN" && type !== "OUT") {
            return res.status(400).json({
                error: "Type must be IN or OUT."
            });
        }

        const product = await prisma.product.findUnique({
            where: {
                id: Number(productId)
            }
        });

        if (!product) {
            return res.status(404).json({
                error: "Product not found."
            });
        }

        let newStock = product.currentStock;

        if (type === "IN") {
            newStock += quantity;
        }

        if (type === "OUT") {
            if (quantity > product.currentStock) {
                return res.status(400).json({
                    error: "Insufficient stock."
                });
            }

            newStock -= quantity;
        }

        const movement = await prisma.stockMovement.create({
            data: {
                type,
                quantity,
                notes,
                productId: Number(productId)
            }
        });

        await prisma.product.update({
            where: {
                id: Number(productId)
            },
            data: {
                currentStock: newStock
            }
        });

        res.status(201).json(movement);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// GET /stock-movements/:id
exports.getById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const movement = await prisma.stockMovement.findUnique({
            where: { id },
            include: {
                product: true
            }
        });

        if (!movement) {
            return res.status(404).json({
                error: "Movement not found."
            });
        }

        res.status(200).json(movement);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// GET /stock-movements/product/:productId
exports.getByProduct = async (req, res) => {
    try {
        const productId = Number(req.params.productId);

        const movements = await prisma.stockMovement.findMany({
            where: {
                productId
            },
            include: {
                product: true
            }
        });

        res.status(200).json(movements);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};