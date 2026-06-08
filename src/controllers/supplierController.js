const prisma = require("../prisma");

// GET /suppliers
exports.getAll = async (req, res) => {
    try {
        const suppliers = await prisma.supplier.findMany();

        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao listar fornecedores."
        });
    }
};

// GET /suppliers/:id
exports.getById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const supplier = await prisma.supplier.findUnique({
            where: { id }
        });

        if (!supplier) {
            return res.status(404).json({
                error: "Supplier not found."
            });
        }

        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao buscar fornecedor."
        });
    }
};

// POST /suppliers
exports.create = async (req, res) => {
    try {
        const { name, cnpj, email, phone } = req.body;

        const supplier = await prisma.supplier.create({
            data: {
                name,
                cnpj,
                email,
                phone
            }
        });

        res.status(201).json(supplier);
    } catch (error) {
        console.error("ERRO REAL:", error);

        res.status(500).json({
            error: error.message
        });
    }
};

// PUT /suppliers/:id
exports.update = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const { name, cnpj, email, phone } = req.body;

        const supplier = await prisma.supplier.findUnique({
            where: { id }
        });

        if (!supplier) {
            return res.status(404).json({
                error: "Supplier not found."
            });
        }

        const updatedSupplier = await prisma.supplier.update({
            where: { id },
            data: {
                name,
                cnpj,
                email,
                phone
            }
        });

        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao atualizar fornecedor."
        });
    }
};

// DELETE /suppliers/:id
exports.remove = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const supplier = await prisma.supplier.findUnique({
            where: { id }
        });

        if (!supplier) {
            return res.status(404).json({
                error: "Supplier not found."
            });
        }

        await prisma.supplier.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Supplier deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            error: "Erro ao remover fornecedor."
        });
    }
};