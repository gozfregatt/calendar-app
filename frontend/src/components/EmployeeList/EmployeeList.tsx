import { ReactNode } from "react";
import { Employee } from "../../types/types";

interface Props {
  employees:Employee[]
  handleClick(employee: Employee):void
  buttonContent?:string
  buttonColor:string
  placeholder:string
  children?:ReactNode
}

function EmployeeList ({employees, handleClick, buttonContent, buttonColor, placeholder, children} : Props) {

  const className = `bg-${buttonColor}-200 text-gray-800 px-4 rounded hover:bg-${buttonColor}-300 h-7`

  return(
    <ul className="grid mb-4 min-h-24 max-h-24 overflow-y-auto border">
    {!employees.length && (
      <p className="text-gray-400 justify-self-start p-1" >{placeholder}</p>
    )}
    {employees.map(employee => (
      <li className="grid-cols-7 grid pb-1">
        <span className=" justify-self-start col-span-2">{employee.name}</span>
        <span className=" justify-self-start col-span-4">{employee.email}</span> 
        <button className={className} onClick={() => handleClick(employee)}>{buttonContent ? buttonContent : children}</button>
      </li>
    ))}
  </ul>
  )

}

export default EmployeeList;