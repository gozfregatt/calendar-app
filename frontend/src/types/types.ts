// Types
export interface Appointment {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  employees: number[];
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
}