import React, { useState, useEffect, useCallback } from 'react';
import web3 from './web3';
import {
  registerMember,
  createProposal,
  voteOnProposal,
  closeVoting,
  getProposalDetails,
  getProposalResults,
  getActiveProposals,
  getClosedProposals,
  getTotalMembers
} from './daoCooperative';
import './App.css';
import logo from './eyekyam.png'; // Import your logo here

function App() {
  const [account, setAccount] = useState('');
  const [newMember, setNewMember] = useState('');
  const [description, setDescription] = useState('');
  const [votingDurationMinutes, setVotingDurationMinutes] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [option5, setOption5] = useState('');
  const [proposalId, setProposalId] = useState('');
  const [optionIndex, setOptionIndex] = useState(0);
  const [proposalDetails, setProposalDetails] = useState(null);
  const [proposalResults, setProposalResults] = useState(null);
  const [activeProposals, setActiveProposals] = useState([]);
  const [closedProposals, setClosedProposals] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [error, setError] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    async function loadAccount() {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }

    loadAccount();

    window.ethereum.on('accountsChanged', function (accounts) {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount('');
      }
    });
  }, []);

  const loadAllData = useCallback(async () => {
    await loadActiveProposals();
    await loadClosedProposals();
    await loadTotalMembers();
  }, []);

  useEffect(() => {
    if (account) {
      loadAllData();
    }
  }, [account, loadAllData]);

  const handleRegisterMember = async () => {
    if (!account) {
      setError('No account selected');
      return;
    }
    try {
      await registerMember(account, newMember);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateProposal = async () => {
    if (!account) {
      setError('No account selected');
      return;
    }
    try {
      await createProposal(account, description, votingDurationMinutes, option1, option2, option3, option4, option5);
      loadActiveProposals();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVote = async () => {
    if (!account) {
      setError('No account selected');
      return;
    }
    try {
      await voteOnProposal(account, proposalId, optionIndex);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCloseVoting = async () => {
    if (!account) {
      setError('No account selected');
      return;
    }
    try {
      await closeVoting(account, proposalId);
      loadClosedProposals();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetProposalDetails = async () => {
    if (!proposalId) {
      setError('Please enter a proposal ID');
      return;
    }
    try {
      const details = await getProposalDetails(proposalId);
      setProposalDetails({
        ...details,
        votingEndTime: new Date(Number(details.votingEndTime) * 1000).toLocaleString(),
        totalVotes: Number(details.totalVotes)
      });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetProposalResults = async () => {
    if (!proposalId) {
      setError('Please enter a proposal ID');
      return;
    }
    try {
      const results = await getProposalResults(proposalId);
      setProposalResults({
        ...results,
        winningOptionIndex: Number(results.winningOptionIndex),
        voteCounts: results.voteCounts.map(voteCount => Number(voteCount))
      });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const loadActiveProposals = async () => {
    try {
      const proposals = await getActiveProposals();
      setActiveProposals(proposals);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadClosedProposals = async () => {
    try {
      const proposals = await getClosedProposals();
      setClosedProposals(proposals);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadTotalMembers = async () => {
    try {
      const total = await getTotalMembers();
      setTotalMembers(Number(total));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <div className="header-container">
        <img src={logo} alt="Company Logo" className="logo" />
        <h1 className="header">Cooperative Proposals Management dApp</h1>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="description-container">
        <button className="button" onClick={() => setShowDescription(!showDescription)}>
          {showDescription ? 'Hide' : 'Show'} Description
        </button>
        {showDescription && (
          <div className="description">
            <h2>How the DAOcooperative System Works</h2>
            <p>The DAOcooperative smart contract facilitates decentralized governance by allowing members to create, vote on, and manage proposals.</p>
            <h3>Registering as a Member</h3>
            <p>Only the Chairman can register new members. Once registered, members can participate in voting and proposal creation.</p>
            <h3>Creating Proposals</h3>
            <p>Members can create proposals by providing a description and options for voting. Each proposal has a specified voting duration.</p>
            <h3>Voting on Proposals</h3>
            <p>Members can vote on active proposals. Once the voting period ends, the proposal is automatically closed, or it can be manually closed by the Chairman or the proposal creator.</p>
            <h3>Viewing Proposal Details</h3>
            <p>Members can view details of a proposal, including its description, options, and vote counts.</p>
            <h3>Viewing Proposal Results</h3>
            <p>Once voting is closed, members can view the results, including the winning option and vote counts for each option.</p>
          </div>
        )}
      </div>
      <div className="section">
        <h2>Register Member</h2>
        <input
          type="text"
          value={newMember}
          onChange={e => setNewMember(e.target.value)}
          placeholder="New Member Address"
          className="input"
        />
        <button onClick={handleRegisterMember} className="button">Register Member</button>
      </div>
      <div className="section">
        <h2>Create Proposal</h2>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Proposal Description"
          className="textarea"
        />
        <input
          type="number"
          value={votingDurationMinutes}
          onChange={e => setVotingDurationMinutes(e.target.value)}
          placeholder="Voting Duration (minutes)"
          className="input"
        />
        <input
          type="text"
          value={option1}
          onChange={e => setOption1(e.target.value)}
          placeholder="Option 1"
          className="input"
        />
        <input
          type="text"
          value={option2}
          onChange={e => setOption2(e.target.value)}
          placeholder="Option 2"
          className="input"
        />
        <input
          type="text"
          value={option3}
          onChange={e => setOption3(e.target.value)}
          placeholder="Option 3"
          className="input"
        />
        <input
          type="text"
          value={option4}
          onChange={e => setOption4(e.target.value)}
          placeholder="Option 4"
          className="input"
        />
        <input
          type="text"
          value={option5}
          onChange={e => setOption5(e.target.value)}
          placeholder="Option 5"
          className="input"
        />
        <button onClick={handleCreateProposal} className="button">Create Proposal</button>
      </div>
      <div className="section">
        <h2>Vote on Proposal</h2>
        <input
          type="text"
          value={proposalId}
          onChange={e => setProposalId(e.target.value)}
          placeholder="Proposal ID"
          className="input"
        />
        <input
          type="number"
          value={optionIndex}
          onChange={e => setOptionIndex(parseInt(e.target.value, 10))}
          placeholder="Option Index"
          className="input"
        />
        <button onClick={handleVote} className="button">Vote</button>
      </div>
      <div className="section">
        <h2>Close Voting</h2>
        <input
          type="text"
          value={proposalId}
          onChange={e => setProposalId(e.target.value)}
          placeholder="Proposal ID"
          className="input"
        />
        <button onClick={handleCloseVoting} className="button">Close Voting</button>
      </div>
      <div className="section">
        <h2>Get Proposal Details</h2>
        <input
          type="text"
          value={proposalId}
          onChange={e => setProposalId(e.target.value)}
          placeholder="Proposal ID"
          className="input"
        />
        <button onClick={handleGetProposalDetails} className="button">Get Details</button>
        {proposalDetails && (
          <div>
            <h3>Proposal Details</h3>
            <p>ID: {proposalDetails.id}</p>
            <p>Creator: {proposalDetails.creator}</p>
            <p>Description: {proposalDetails.description}</p>
            <p>Voting End Time: {proposalDetails.votingEndTime}</p>
            <p>Is Closed: {proposalDetails.isClosed ? 'Yes' : 'No'}</p>
            <p>Total Votes: {proposalDetails.totalVotes}</p>
            <h4>Options</h4>
            <ul>
              {proposalDetails.optionDescriptions.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="section">
        <h2>Get Proposal Results</h2>
        <input
          type="text"
          value={proposalId}
          onChange={e => setProposalId(e.target.value)}
          placeholder="Proposal ID"
          className="input"
        />
        <button onClick={handleGetProposalResults} className="button">Get Results</button>
        {proposalResults && (
          <div>
            <h3>Proposal Results</h3>
            <p>Voting Closed: {proposalResults.votingClosed ? 'Yes' : 'No'}</p>
            {proposalResults.votingClosed && (
              <>
                <p>Winning Option Index: {proposalResults.winningOptionIndex}</p>
                <h4>Vote Counts</h4>
                <ul>
                  {proposalResults.voteCounts.map((count, index) => (
                    <li key={index}>Option {index + 1}: {count} votes</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
      <div className="section">
        <h2>Active Proposals</h2>
        <button onClick={loadActiveProposals} className="button">Get Proposals</button>
        <p>{activeProposals.join(', ')}</p>
      </div>
      <div className="section">
        <h2>Closed Proposals</h2>
        <button onClick={loadClosedProposals} className="button">Get Proposals</button>
        <p>{closedProposals.join(', ')}</p>
      </div>
      <div className="section">
        <h2>Total Members</h2>
        <button onClick={loadTotalMembers} className="button">Load Total Members</button>
        <p>{totalMembers}</p>
      </div>
    </div>
  );
}

export default App;
