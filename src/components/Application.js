import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application() {

  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({...state, day });
  console.log(state.day);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments")
    ]).then((res) => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data}));
      console.log(res[1].data);
      })
  }, []);

  const appointmentsData = dailyAppointments.map(appointment => {
    console.log(appointment);
    return (<Appointment
      key={appointment.id}
      {...appointment}
    />)
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsData}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
