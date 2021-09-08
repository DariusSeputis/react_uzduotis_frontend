import React from 'react';

const LogedTeam = ({ logedTeamData, logout }) => {
  return (
    <div className='user'>
      <h4>{logedTeamData.name}</h4>
      <h5>{logedTeamData.email}</h5>
      <span>Voted: {logedTeamData.voted ? 'Yes' : 'No'}</span>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default LogedTeam;
