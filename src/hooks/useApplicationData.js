import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((res) => {
      setState(prev => ({ ...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
    })
  }, []);

  const setDay = day => setState(prev => ({ ...prev, day }));

  function updateSpots(updatedAppointments) {

    return state.days.map(day => {
      let numberOfSpots = 0;
      day.appointments.forEach(appointment => {
        if (!updatedAppointments[appointment].interview) {
          numberOfSpots += 1;
        }
      });
      return { ...day, spots: numberOfSpots }
    })
  };


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(appointments);
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => setState({
        ...state,
        appointments,
        days
      }))
  };


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(appointments);
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState({
        ...state,
        appointments,
        days
      }));
  }

  return { state, setDay, bookInterview, cancelInterview };
}