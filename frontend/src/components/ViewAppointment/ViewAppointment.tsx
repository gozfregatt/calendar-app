import { forwardRef, useImperativeHandle, useState } from "react";
import SimpleModal from "../SimpleModal/SimpleModal";
import AppointmentContent from "../AppointmentContent/AppointmentContent";

interface Props {
  refetchAppointments:() => void;
}

export interface ViewAppointmentHandle {
  openModal: () =>void;
  closeModal: () => void;
}

const ViewAppointment = forwardRef<ViewAppointmentHandle, Props>(({refetchAppointments}: Props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal() {
      setIsOpen(true);
    },

    closeModal() {
      setIsOpen(false);
    }
  }))

  function closeModalView() {
    setIsOpen(false);
  }


  return (
    <>
      <SimpleModal isOpen={isOpen} closeModal={closeModalView} title="New Appointment">
        <AppointmentContent closeModal={closeModalView} refetchAppointments={refetchAppointments}/>
      </SimpleModal>    
    </>
    )
});

export default ViewAppointment;