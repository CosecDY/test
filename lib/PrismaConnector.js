const { PrismaClient } = require('@prisma/client');

class PrismaConnector {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async connect() {
        // Prisma Client connects automatically, so no explicit connect method is needed
    }

    async disconnect() {
        await this.prisma.$disconnect();
        console.log('Disconnected from database');
    }

    async insert(table, data) {
        return this.prisma[table].create({ data });
    }

    async update(table, data, condition) {
        return this.prisma[table].update({
            where: condition,
            data,
        });
    }

    async delete(table, condition) {
        return this.prisma[table].delete({
            where: condition,
        });
    }

    async search(table, condition) {
        return this.prisma[table].findMany({
            where: condition,
        });
    }

    async searchById(table, id) {
        return this.prisma[table].findUnique({
            where: {
                id: parseInt(id),
            },
        });
    }
}

module.exports = PrismaConnector;
