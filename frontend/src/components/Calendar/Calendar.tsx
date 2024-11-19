import { useCallback, useEffect, useState } from "react";
import { isSameDay } from "../../utils/calendarUtils";
import NewAppointment from "../NewAppointment/NewAppointment";
import LeftIcon from "../Icons/LeftIcon";
import RightIcon from "../Icons/RightIcon";
import { appointmentApi } from "../../services/api";
import { Appointment } from "../../types/types";

export function Calendar() {
 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [visibleAppointments, setVisibleAppointments] = useState<Appointment[]>([])

  function refetchAppointments() {
    fetchAppointments()
  }

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await appointmentApi.getAll();
      setAppointments(response.data);
    } catch (err) {
      alert('Failed to fetch Appointments');
    }
  }, [appointmentApi.getAll]);

  useEffect(() =>{
    fetchAppointments()
  }, [fetchAppointments])


  useEffect(() => {
    const visible = appointments.filter(appointment => isSameDay(new Date(appointment.start_time), selectedDate))
    setVisibleAppointments(visible)    
  }, [appointments, selectedDate])
    

  // Generate time slots from 00:00 to 23:00
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });
  
  // Calculate position for a given time (returns percentage from top)
  const getTimePosition = (time:string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours) * 60 + minutes;
    const totalDayMinutes = 24 * 60; // 24 hours (00:00 to 23:00)
    return (totalMinutes / totalDayMinutes) * 100;
  };

  // Calculate appointment styles based on start and end times
  const getAppointmentStyle = (start:string, end:string) => {
    
    const startTime = start.split('T')[1]
    const endTime = end.split('T')[1]

    const topPosition = getTimePosition(startTime);
    const bottomPosition = getTimePosition(endTime);
    const height = bottomPosition - topPosition;
    
    return {
      top: `${topPosition}%`,
      height: `${height}%`
    };
  };

  function handleSelectedDate(delta:number) {
    const newDay = new Date(selectedDate);
    newDay.setDate(selectedDate.getDate() + delta);
    setSelectedDate(newDay);
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 text-center">
      <p className="font-semibold mb-2 text-lg">Company Calendar</p>
      
      <div className="flex justify-center">
        <button 
          className="bg-blue-500 text-white px-2 py-0.5 me-2 rounded hover:bg-blue-600"
          onClick={() => handleSelectedDate(-1)}
        >
          <LeftIcon/>
        </button>

        <h2 className="text-lg font-semibold text-gray-800">
          {selectedDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h2>

        <button
          className="bg-blue-500 text-white px-2 py-0.5 ms-2 rounded hover:bg-blue-600"
          onClick={() => handleSelectedDate(1)}
        >
          <RightIcon/>
        </button>
      </div>
      <button
          className="bg-blue-500 text-white px-2 py-0.5 mb-2 ms-2 rounded hover:bg-blue-600"
          onClick={() => setSelectedDate(new Date())}
        > Today
      </button>

      <div className="bg-white rounded-lg shadow-lg mb-3">

        {/* Calendar Grid */}
        <div className="relative border-t border-gray-200"
        style={{"height": "900px"}}>
          {/* Time slots and grid lines */}
          <div className="absolute inset-0 flex">
            {/* Time labels column */}
            <div className="w-16 flex-shrink-0 border-r ps-3 border-gray-200">
              {timeSlots.map((time) => (
                <div
                  key={`timelabels-${time}`}
                  className="absolute text-sm text-gray-500"
                  style={{ 
                    top: `${getTimePosition(time)}%`, 
                    transform: 'translateY(-50%)' 
                  }}
                >
                  {(time === "00:00" ? '' : time)}
                </div>
              ))}
            </div>

            {/* Grid lines column*/}
            <div className="flex-grow relative">
              {timeSlots.map((time) => (
                <div
                  key={`gridlines-${time}`}
                  className="absolute w-full border-t border-gray-100"
                  style={{ top: `${getTimePosition(time)}%` }}
                />
              ))}

              {/* Appointments */}
              {visibleAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="absolute left-1 right-1 bg-blue-100 border border-blue-300 rounded p-2 text-sm"
                  style={getAppointmentStyle(appointment.start_time, appointment.end_time)}
                >
                  <div className="font-semibold">{appointment.title}</div>
                  <div className="text-xs text-gray-600">
                    {appointment.start_time} - {appointment.end_time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <NewAppointment refetchAppointments={refetchAppointments}/> 
    </div>
  )
}

export default Calendar;