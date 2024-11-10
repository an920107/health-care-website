export default class PagerEntity {
    currentPage: number;
    totalPage: number;

    constructor({
        currentPage = 1,
        totalPage = 1,
    }: {
        currentPage?: number,
        totalPage?: number,
    }) {
        this.currentPage = currentPage < 1 ? 1 : currentPage;
        this.totalPage = totalPage < 1 ? 1 : totalPage;
    }

    get hasPrevious(): boolean {
        return this.currentPage > 1;
    }

    get hasNext(): boolean {
        return this.currentPage < this.totalPage;
    }

    previous({ amount = 1 }: { amount?: number }): PagerEntity {
        if (amount < 1)
            throw new Error("Amount must be greater than zero.");
        return new PagerEntity({
            currentPage: (this.currentPage - amount >= 1)
                ? this.currentPage - amount
                : 1,
            totalPage: this.totalPage,
        });
    }

    next({ amount = 1 }: { amount?: number }): PagerEntity {
        if (amount < 1)
            throw new Error("Amount must be greater than zero.");
        return new PagerEntity({
            currentPage: (this.currentPage + amount <= this.totalPage)
                ? this.currentPage + amount
                : this.totalPage,
            totalPage: this.totalPage,
        })
    }
}
