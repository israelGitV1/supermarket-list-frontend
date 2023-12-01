import { useEffect, useState } from "react";
import "./index.css";
import { Input, Button } from "../../components";
import { createItem, UpdateItem, DeleteItem } from "../../services/request";

export const Modal = ({ onClose, item }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const validateBeforeSave = () => {
    if (name.length < 3) {
      alert("Nome tem que ter mais de 3 carecteres");
      return false;
    }
    if (quantity < 1) {
      alert("Quantidade não pode ser menor que 1");
      return false;
    }
    return true;
  };

  const callAddItem = async () => {
    const validate = validateBeforeSave();

    if (validate) {
      const result = await createItem({ name, quantity: Number(quantity) });
      if (!result?.error) {
        alert("Item salvo com sucesso");
        onClose();
      }
    }
  };

  const callUpdateItem = async () => {
    const validate = validateBeforeSave();

    if (validate) {
      const result = await UpdateItem(item?._id, {
        name,
        quantity: Number(quantity),
        cheked: item?.cheked,
      });
      if (!result?.error) {
        alert("Item Atualizado com sucesso");
        onClose();
      }
    }
  };

  const callDeleteItem = async () => {
    const result = await DeleteItem(item?._id);
    if (!result?.error) {
      alert("Item Deletado ");
      onClose();
    }
  };

  useEffect(() => {
    if (item?.name && item?.quantity) {
      setName(item?.name);
      setQuantity(item?.quantity);
    }
  }, [item]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1>{item ? "Editar item" : "Adicionar novo item"}</h1>
          <button onClick={onClose} className="modal-close-button"></button>
        </div>
        <Input
          onChange={(text) => setName(text)}
          value={name}
          label="Nome"
          placeholder="Ex: Arroz"
        />
        <Input
          onChange={(text) => setQuantity(text)}
          value={quantity}
          label="Quantidade"
          type="number"
        />
        <div className="buttons-container">
          {item && (
            <Button icon="trash" variante="outline" onClick={callDeleteItem}>
              Deletar item
            </Button>
          )}
          <Button onClick={item ? callUpdateItem : callAddItem}>
            {item ? "Atualizar" : "Adicionar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
