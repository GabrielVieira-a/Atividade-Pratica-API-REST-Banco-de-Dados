const prisma = require("../prisma");

// GET /categories
exports.getAll = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao listar categorias."
        });
    }
};

// GET /categories/:id
exports.getById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const category = await prisma.category.findUnique({
            where: { id }
        });

        if (!category) {
            return res.status(404).json({
                error: "Category not found."
            });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao buscar categoria."
        });
    }
};

// POST /categories
exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;

        const category = await prisma.category.create({
            data: {
                name,
                description
            }
        });

        res.status(201).json(category);
    } catch (error) {
        console.error("ERRO REAL:", error);

        res.status(500).json({
            error: error.message
        });
    }
};
// PUT /categories/:id
exports.update = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const { name, description } = req.body;

        const category = await prisma.category.findUnique({
            where: { id }
        });

        if (!category) {
            return res.status(404).json({
                error: "Category not found."
            });
        }

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name,
                description
            }
        });

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao atualizar categoria."
        });
    }
};

// DELETE /categories/:id
exports.remove = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const category = await prisma.category.findUnique({
            where: { id }
        });

        if (!category) {
            return res.status(404).json({
                error: "Category not found."
            });
        }

        await prisma.category.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Category deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            error: "Erro ao remover categoria."
        });
    }
};