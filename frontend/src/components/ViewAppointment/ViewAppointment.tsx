import { forwardRef, useImperativeHandle, useState } from "react";
import SimpleModal from "../SimpleModal/SimpleModal";
import AppointmentContent from "../AppointmentContent/AppointmentContent";
import { Appointment } from "../../types/types";

interface Props {
  refetchAppointments:() => void;
  appointment?: Appointment;
}

export interface ViewAppointmentHandle {
  openModal: () =>void;
  closeModal: () => void;
}

const ViewAppointment = forwardRef<ViewAppointmentHandle, Props>(({refetchAppointments, appointment}: Props, ref) => {
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
      <SimpleModal isOpen={isOpen} closeModal={closeModalView} title="Appointment details">
        <AppointmentContent closeModal={closeModalView} refetchAppointments={refetchAppointments} selectedAppointment={appointment}/>
      </SimpleModal>    
    </>
    )
});

export default ViewAppointment;