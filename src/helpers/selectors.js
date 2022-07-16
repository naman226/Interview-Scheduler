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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewDetails = {};
  const interviewerId = interview.interviewer;
  interviewDetails['student'] = interview.student;
  interviewDetails['interviewer'] = state.interviewers[interviewerId];
  return interviewDetails
};

export function getInterviewersForDay(state, day) {
  const interviewersArray = [];
  for (let today of state.days) {
    if (today.name === day) {
      today.interviewers.forEach(each => {
        interviewersArray.push(state.interviewers[each]);
      })
    }
  }
  return interviewersArray;
};