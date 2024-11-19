import { useEffect, useState } from "react";
import SimpleModal from "../SimpleModal/SimpleModal";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { appointmentApi, departmentApi } from "../../services/api"
import { Appointment, Department, Employee } from "../../types/types";
import dayjs from 'dayjs';
import DeleteIcon from "../Icons/DeleteIcon";
import EmployeeList from "../EmployeeList/EmployeeList";

interface Props {
  closeModal:() => void;
  refetchAppointments:() => void;
}

function AppointmentContent({closeModal, refetchAppointments}: Props) {

  const [departments, setDepartments] = useState<Department[]>([]);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [participants, setParticipants] = useState<Employee[]>([]);

  const [selectedDepartment, setselectedDepartment] = useState('');
  const [startDateTime, setStartDateTime] = useState<Date>();
  const [endDateTime, setEndDateTime] = useState<Date>();
  const [appointmentTitle, setAppointmentTitle] = useState<string>('');
  const [appointmentDescription, setAppointmentDescription] = useState<string>('');

  useEffect(() => {
    async function fetchDepartments () {
      try {
        const response = await departmentApi.getAll();
        setDepartments(response.data);
      } catch (err) {

        alert('Failed to fetch departments');
      }
    };

    fetchDepartments();
  }, []);

  const handleSelectDepartment = (department: string) => {
    setselectedDepartment(department);
    fetchEmployeesOfDepartment(department)
  };

  async function fetchEmployeesOfDepartment(selected: string) {
    try {
      const selectedDepartmentId = departments.find(department => department.name === selected)?.id
      if (selectedDepartmentId) {
        const response = await departmentApi.getEmployeesByDepartment(selectedDepartmentId);
        setEmployees(response.data)
      }
    } catch (err) {
      alert('Failed to fetch department employees');
    }
  }

  function addParticipant(employee: Employee) {
    if (participants.find(element => element.id === employee.id)) return;

    setParticipants(prevStateArray => [...prevStateArray, employee])
  }

  function removeParticipant(employee: Employee) {
    setParticipants(prevStateArray => prevStateArray.filter(prevEmployee => prevEmployee.id !== employee.id))
  }

  async function handleSaveAppointment() {
    const appointmentData: Partial<Appointment> = {
      title : appointmentTitle,
      description: appointmentDescription,
      start_time: dayjs(startDateTime).format('YYYY-MM-DDTHH:mm'),
      end_time: dayjs(endDateTime).format('YYYY-MM-DDTHH:mm'),
      employees: employees.map(employee => employee.id)
    }
    try {
      await appointmentApi.create(appointmentData);
      closeModal()
      refetchAppointments()
    } catch (err) {
      alert("Failed to create Appointment, please try again. ")
    }
  }

  return (
    <div className="">
      <p className="font-semibold mb-2">Title</p>
      <input className="w-full border mb-2 p-1" placeholder="Add appointment title" onChange={event => setAppointmentTitle(event.target.value as string)}></input>
      <div className="grid-cols-2 grid mb-4">
        <div>
          <p className="font-semibold mb-2">Start Date</p>
          <input className="border" aria-label="Date and time" type="datetime-local" 
            defaultValue={dayjs().format('YYYY-MM-DDTHH:mm')} 
            onChange={event => {setStartDateTime(new Date(event.target.value)); console.log("Change: ", event.target.value)}}/>
        </div>
        <div>
          <p className="font-semibold mb-2">End Date</p>
          <input className="border" aria-label="Date and time" type="datetime-local" 
            value={startDateTime ? dayjs(startDateTime).format('YYYY-MM-DDTHH:mm') : dayjs().format('YYYY-MM-DDTHH:mm')}
            onChange={event => setEndDateTime(new Date(event.target.value))}/>
        </div>
      </div>
      <p className="font-semibold mb-2">Appointment description</p>
      <input className="w-full border mb-2 p-1" placeholder="Add appointment description..." onChange={event => setAppointmentDescription(event.target.value as string)}></input>

      
      <p className="font-semibold mb-2">Department</p>
      <DropdownMenu
        className="w-full border mb-2"
        values={departments.map(department => department.name)} 
        selectedValue={selectedDepartment} 
        handleValueChange={handleSelectDepartment}/>

      <p className="font-semibold mb-2">Employees</p>
      <EmployeeList employees={employees} handleClick={addParticipant} buttonContent={"Add"} buttonColor={"green"} placeholder="Select department..."/>

      <p className="font-semibold mb-2">Attendees</p>
      <EmployeeList employees={participants} handleClick={removeParticipant} buttonColor={"red"} placeholder="Add participants..."><DeleteIcon/></EmployeeList>
      
      <div className="flex justify-end space-x-2">
      <button 
          onClick={handleSaveAppointment} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button 
          onClick={closeModal} 
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AppointmentContent;