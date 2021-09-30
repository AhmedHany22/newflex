import "./listGroup.css";

const ListGroup = ({ genres, onItemSelect, selectedItem }) => {
  return (
    <ul className="list-group rounded-0 py-3 px-4">
      {genres.map((genre) => (
        <li
          key={genre._id}
          className={
            selectedItem === genre
              ? "list-group-item border-0 mbtn active"
              : "list-group-item border-0 mbtn"
          }
          onClick={() => onItemSelect(genre)}
        >
          <i
            className={
              genre.name === "All Genres"
                ? "fa fa-home pe-3"
                : "fa fa-film pe-3"
            }
          ></i>{" "}
          {genre.name}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = { kProp: "_id", tProp: "name" };

export default ListGroup;
