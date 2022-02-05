import { useState } from "react";

const useModal = () => {
const [openModal, setOpenModal] = useState(false);

    const onOpenModal = () => {
        setOpenModal(true);
    };

    const onCloseModal = () => {
        setOpenModal(false);
    };

    return { openModal, onOpenModal, onCloseModal };
};

export default useModal;