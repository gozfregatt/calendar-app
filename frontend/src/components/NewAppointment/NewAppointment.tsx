import { useState } from "react";
import SimpleModal from "../SimpleModal/SimpleModal";

import AppointmentContent from "../AppointmentContent/AppointmentContent";

interface Props {
  refetchAppointments:() => void;
}

function NewAppointment({refetchAppointments}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
  <>
    <button onClick={openModal} 
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >Add new appointment</button>
    <SimpleModal isOpen={isOpen} closeModal={closeModal} title="New Appointment">
      <AppointmentContent closeModal={closeModal} refetchAppointments={refetchAppointments}/>
    </SimpleModal>    
  </>
  )
}

export default NewAppointment;