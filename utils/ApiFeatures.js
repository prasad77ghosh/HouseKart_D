class ApiFeatures {
  constructor(query, queryStr) {
    // ex --> find, create, update, delete in mongo DB
    this.query = query;
    // ex --> page : 2 , keyword: lenovo ideapd
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const copyQuery = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete copyQuery[key]);
    // this.query = this.query.find(copyQuery);

    // filter by price
    let queryStr = JSON.stringify(copyQuery);
    // console.log(queryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    // console.log(queryStr);

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
