import { ListCard } from "../ListCard";
import "./index.css";

export const ListRender = ({ list, onEdit, onCheckItem }) => {
  if (list?.length === 0) {
    return (
      <h3>
        Sua lista está vazia, adicione um novo item clicando no botão de
        "Adicionar"
      </h3>
    );
  }
  return (
    <div className="list-render-container">
      {list.map((item) => (
        <ListCard
          onCheckItem={onCheckItem}
          onclick={onEdit}
          item={item}
          key={item?._id}
        />
      ))}
    </div>
  );
};
