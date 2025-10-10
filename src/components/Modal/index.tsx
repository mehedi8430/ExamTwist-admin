import CategoryForm from "@/pages/Dashboard/Categories/components/CategoryForm";
import useModal from "./useModal";

export default function Modals() {
  const { Modal } = useModal();

  return (
    <>
      <Modal modalId="modal" openId="category">
        <CategoryForm />
      </Modal>
    </>
  );
}
