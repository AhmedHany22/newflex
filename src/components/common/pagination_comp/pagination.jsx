import "./pagination.css";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ tNum, pSize, onPageChange, cPage }) => {
  let pagesCount = tNum / pSize;
  const pages = _.range(1, pagesCount + 1);
  return (
    <div>
      {pagesCount > 1 && (
        <nav className="d-flex">
          <ul className="pagination mx-auto bg-dark rounded">
            {pages.map((p) => (
              <li
                key={p}
                className={cPage === p ? "page-item active" : "page-item"}
              >
                <a
                  className="page-link bg-dark border-dark rounded my"
                  onClick={() => {
                    onPageChange(p);
                  }}
                >
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

Pagination.propTypes = {
  tNum: PropTypes.number.isRequired,
  pSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  cPage: PropTypes.number.isRequired,
};

export default Pagination;
