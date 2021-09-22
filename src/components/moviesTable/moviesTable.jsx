import "./moviesTable.css";
import Like from "../common/like";

const MoviesTable = ({ moviesList, onDelete, onLiked }) => {
  return (
    <table className="table main__table mb-3">
      <thead>
        <tr>
          <th colSpan="1">TITLE</th>
          <th colSpan="1">GENRA</th>
          <th colSpan="1">STOCK</th>
          <th colSpan="1">RATING</th>
          <th colSpan="2">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {moviesList.map((m) => (
          <tr key={m._id}>
            <td>
              <div className="main__table-text mt-1">
                <a href="">{m.title}</a>
              </div>
            </td>
            <td>
              <div className="main__table-text mt-1">{m.genre.name}</div>
            </td>
            <td>
              <div className="main__table-text mt-1">{m.numberInStock}</div>
            </td>
            <td>
              <div className="main__table-text mt-1">
                <i className="fa fa-star text-warning"></i>
                {m.dailyRentalRate}
              </div>
            </td>
            <td>
              <Like
                status={m.like}
                onLiked={() => {
                  onLiked(m);
                }}
              />
            </td>
            <td>
              <button className="butn del" onClick={() => onDelete(m)}>
                <i className="fa fa-trash text-danger"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
