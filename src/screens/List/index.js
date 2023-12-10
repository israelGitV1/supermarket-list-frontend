import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { getList, UpdateItem } from "../../services/request";
import { ListCard, Loader, ListRender, Button, Modal } from "../../components";

export const ListScreen = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [listData, setListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadListItems = async () => {
    setloading(true);
    const result = await getList();
    setListData(result);
    setloading(false);
  };

  useEffect(() => {
    loadListItems();
  }, []);

  const onClickAddButton = () => {
    setSelectedItem(null);
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
    loadListItems();
    setSelectedItem(null);
  };

  const onCloseList = () => {
    navigate("/");
  };

  const onEditItem = (item) => {
    console.log("On");
    setModalVisible(true);
    setSelectedItem(item);
  };

  const onCheckItem = async (item) => {
    const result = await UpdateItem(item?._id, {
      name: item.name,
      quantity: Number(item.quantity),
      checked: !item.checked,
    });

    if (!result.error) {
      await loadListItems();
    }
  };

  return (
    <div className="list-screen-container">
      <div className="list-screen-content-container">
        <div className="list-screen-header">
          <div className="list-screen-title-container">
            <img
              className="logo-image"
              src="/images/logo.png"
              alt="supermarket-list-log"
            ></img>
            <h1 className="list-screen-header-title">Lista Supermercado</h1>
          </div>
          <div className="list-screen-header-button-container">
            <Button onClick={onClickAddButton} width={"button-mini"}>
              {window.innerWidth <= 440 ? "+" : "Adicionar"}
            </Button>
            <button
              onClick={onCloseList}
              className="modal-close-button"
            ></button>
          </div>
        </div>
        <div className="list-screen-list-container">
          {loading ? (
            <Loader />
          ) : (
            <ListRender
              onCheckItem={onCheckItem}
              onEdit={onEditItem}
              list={listData}
            />
          )}
        </div>
      </div>
      {modalVisible && <Modal item={selectedItem} onClose={onCloseModal} />}
    </div>
  );
};
