import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TeamContext } from '../App';
import LogedTeam from '../components/LogedTeam';

const MyAccountScreen = () => {
  // Hooks
  const history = useHistory();
  // - States
  // -- Global
  const { setTeamInLocalStorage } = useContext(TeamContext);
  // -- Local
  const [allTeamsData, setAllTeamsData] = useState([]);
  const [logedInTeamData, setLogedInTeamData] = useState({});
  const [allTeamsdataLoading, setallTeamsdataLoading] = useState(true);
  const [logedInTeamDataLoading, setlogedInTeamDataLoading] = useState(true);
  const [fetchAllError, setFetchAllError] = useState('');
  const [fetchLogedTeamError, setFetchLogedTeamError] = useState('');
  const [allVotes, setAllVotes] = useState([]);
  const [allVotesError, setAllVotesError] = useState('');
  const [allVotesLoading, setAllVotesLoading] = useState(true);
  const [logedInTeamVoted, setLogedInTeamVoted] = useState();

  // side effects
  // get all team data
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/teams')
      .then((res) => {
        setAllTeamsData(res.data);
      })
      .catch((err) => setFetchAllError(err))
      .finally(() => {
        !fetchAllError
          ? setallTeamsdataLoading(false)
          : console.log(fetchAllError);
      });
  }, [logedInTeamVoted]);
  // get loged in team data
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/teams/${localStorage.getItem('team')}`)
      .then((res) => {
        setLogedInTeamData(res.data);
        setLogedInTeamVoted(res.data.voted);
        console.log(res.data.voted);
      })
      .catch((err) => setFetchLogedTeamError(err))
      .finally(() => {
        !fetchLogedTeamError
          ? setlogedInTeamDataLoading(false)
          : console.log(fetchLogedTeamError);
      });
  }, [logedInTeamVoted]);

  // get all votes
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/votes')
      .then((res) => {
        setAllVotes(res.data);
      })
      .catch((err) => setAllVotesError(err))
      .finally(() => {
        !allVotesError ? setAllVotesLoading(false) : console.log(allVotesError);
      });
  }, [logedInTeamVoted]);

  // custom functions
  const logout = () => {
    localStorage.removeItem('team');
    history.push('/login');
    setTeamInLocalStorage(false);
  };

  const voting = (e) => {
    let votedOnTeamsId = e.target.value;
    let voteValue = e.target.textContent === '-' ? -1 : 1;

    // put -- adding vote status to a single team
    axios
      .put(`http://127.0.0.1:5000/teams/${localStorage.getItem('team')}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .put(`http://127.0.0.1:5000/votes/${votedOnTeamsId}`, {
        value: voteValue,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLogedInTeamVoted(true));
  };

  return allTeamsdataLoading || logedInTeamDataLoading || allVotesLoading ? (
    <main>Loading</main>
  ) : !logedInTeamVoted ? (
    <main>
      <LogedTeam logedTeamData={logedInTeamData} logout={logout} />
      <div className='cards'>
        {allTeamsData.map((item) => (
          <div className='card' key={item._id}>
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <span>
              Score:
              {allVotes.reduce((total, teamVotes) => {
                return (total +=
                  item._id === teamVotes.team_Id ? teamVotes.votes : null);
              }, 0)}
            </span>
            <div className='buttonWrap'>
              <button value={item._id} onClick={(e) => voting(e)}>
                -
              </button>
              <button value={item._id} onClick={(e) => voting(e)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  ) : (
    <main>
      <LogedTeam logedTeamData={logedInTeamData} logout={logout} />

      <div className='cards'>
        {allTeamsData.map((item) => (
          <div className='card' key={item._id}>
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <span>
              Score:
              {allVotes.reduce((total, teamVotes) => {
                return (total +=
                  item._id === teamVotes.team_Id ? teamVotes.votes : null);
              }, 0)}
            </span>
            <div className='buttonWrap'>
              <button disabled>-</button>
              <button disabled>+</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyAccountScreen;
