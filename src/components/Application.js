import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import { useApplicationData } from "hooks/useApplicationData";
import { getInterviewersForDay } from "helpers/selectors";

export default function Application() {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const appointmentsData = getAppointmentsForDay(state, state.day).map(appointment => {

    return (<Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={getInterview(state, appointment.interview)}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
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
        <Appointment
          key="last"
          time="5pm"
          bookInterview={bookInterview} />
      </section>
    </main>
  );
};
