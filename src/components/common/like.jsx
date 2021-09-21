const Like = ({ status, onLiked }) => {
  let classes = "text-primary fa fa-thumbs-";
  classes += status ? "up" : "o-up";
  return (
    <button className="butn like">
      <i onClick={onLiked} className={classes}></i>
    </button>
  );
};

export default Like;
