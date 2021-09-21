import _ from "lodash";
const Paginate = (itemsList, pageSize, pageNum) => {
  const startIndex = (pageNum - 1) * pageSize;
  return _(itemsList).slice(startIndex).take(pageSize).value();
};

export default Paginate;
