export function getAppointmentsForDay(state, day) {
  const appointmentsArray = [];
  for (let today of state.days) {
    if (today.name === day) {
      today.appointments.forEach(each => {
        appointmentsArray.push(state.appointments[each]);
      })
    }
  }
  return appointmentsArray;
};