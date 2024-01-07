module.exports = class Transform {

    transformCollection(items) {
        if(this.withPaginateStatus) {
            return {
                [this.CollectionName()] : items.docs.map(this.transform.bind(this)),
                ...this.paginateItem(items)
            }
        }
        return items.map(this.transform.bind(this))
    }

    paginateItem(items) {
        return {
            total : items.total,
            limit : items.limit,
            page : items.page,
            pages : items.pages
        }
    }

    CollectionName() {
        return 'items';
    }

    withPaginate() {
        this.withPaginateStatus = true;
        return this;
    }

}