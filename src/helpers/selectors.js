export function getAppointmentsForDay(state, day) {
  const appointmentsArray = [];
  const filteredlist = state.days.filter(element => element.name === day);
  if (!filteredlist.length) {
    return [];
  }
  const matches = filteredlist[0].appointments;
  for (let match of matches) {
    appointmentsArray.push(state.appointments[match]);
  }
  return appointmentsArray;
};