import "./index.css";

export const ListCard = ({ item, onclick, onCheckItem }) => {
  return (
    <div className="list-card-container">
      <img
        onClick={() => onCheckItem(item)}
        className="checkbox"
        src={`/images/${item?.checked ? "checked.svg" : "unchecked.svg"}`}
        alt="ckecked-item"
      ></img>
      <div onClick={() => onclick(item)} className="list-card-text-container">
        <span className="list-card-title">{item?.name} </span>
        <span className="list-card-subtitle">{item?.quantity} Unidades</span>
      </div>
      <img
        onClick={() => onclick(item)}
        src="/images/arrow.svg"
        alt="arrow-icon"
        className="arrow-icon"
      />
    </div>
  );
};
