
# Cooperative Proposals Management dApp

Welcome to the Cooperative Proposals Management DApp! This project aims to provide a decentralized platform for managing proposals and voting within a cooperative organization. Built with Solidity and leveraging the power of Ethereum blockchain, this DApp ensures transparency, security, and democratic decision-making.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Smart Contract Details](#smart-contract-details)
4. [DApp Interface](#dapp-interface)
5. [Getting Started](#getting-started)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

In the age of decentralization, organizations need innovative solutions to manage their internal processes transparently and securely. The Cooperative Proposals Management DApp is designed to meet this need by providing a decentralized platform for proposal creation, voting, and member management. By leveraging blockchain technology, this DApp ensures that all actions are recorded on an immutable ledger, fostering trust and accountability.

## Features

- **Member Management:** Register new members with a unique ID and address.
- **Proposal Creation:** Create proposals with multiple voting options.
- **Voting System:** Members can vote on proposals, ensuring democratic decision-making.
- **Automatic Voting Closure:** Proposals close automatically when the voting period ends.
- **Manual Voting Closure:** Proposal creators and chairmen can close voting manually.
- **Proposal Results:** Retrieve proposal details and results transparently.
- **User-Friendly Interface:** Interact with the smart contract through a sleek and intuitive web interface.

## Smart Contract Details

The `DAOcooperative.sol` smart contract is the backbone of this DApp. It manages members, proposals, and the voting process. Below are the key components of the smart contract:

### Roles

- **Chairman:** Has the authority to register members and close voting manually.
- **Member:** Can create and vote on proposals.

### Structs

- **Member:** Stores member ID, address, and active status.
- **Option:** Represents a voting option with a description and vote count.
- **Proposal:** Contains proposal ID, creator, description, voting end time, options, and status.

### Functions

- **registerMember(address newMember):** Registers a new member (only callable by the chairman).
- **createProposal(string description, uint256 votingDurationMinutes, string[] options):** Creates a new proposal with specified options (only callable by members).
- **vote(uint256 proposalId, uint256 optionIndex):** Casts a vote on a proposal (only callable by members).
- **closeVoting(uint256 proposalId):** Closes the voting for a proposal manually (only callable by the proposal creator or chairman).
- **closeExpiredProposals():** Automatically closes proposals whose voting period has ended.
- **getProposalDetails(uint256 proposalId):** Retrieves the details of a proposal.
- **getProposalResults(uint256 proposalId):** Retrieves the results of a closed proposal.
- **getTotalMembers():** Returns the total number of registered members.
- **getPendingProposalsToVote():** Returns a list of proposals that the member has not voted on.
- **getVotedProposals():** Returns a list of proposals that the member has voted on.
- **getNotVotedProposals():** Returns a list of proposals that the member has not voted on.
- **getActiveProposals():** Returns a list of active proposals.
- **getClosedProposals():** Returns a list of closed proposals.
- **getMemberInfo(address memberAddress):** Retrieves the details of a member.

## DApp Interface

The DApp interface is built with React and interacts with the smart contract using Web3.js. It provides a user-friendly way to manage members, create proposals, vote, and retrieve proposal details and results.

### Key Components

- **Register Member:** Form to register a new member.
- **Create Proposal:** Form to create a new proposal with multiple voting options.
- **Vote on Proposal:** Form to cast a vote on a proposal.
- **Close Voting:** Button to manually close the voting on a proposal.
- **Get Proposal Details:** Button to retrieve and display proposal details.
- **Get Proposal Results:** Button to retrieve and display proposal results.
- **Active Proposals:** Button to display a list of active proposals.
- **Closed Proposals:** Button to display a list of closed proposals.
- **Total Members:** Button to display the total number of registered members.

## Getting Started

To get started with the Cooperative Proposals Management DApp, follow these steps:

### Prerequisites

- Node.js and npm installed
- MetaMask installed and configured
- A local Ethereum node or an Infura project ID

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/coopDApp.git
   cd coopDApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the smart contract:
   ```bash
   npx hardhat compile
   ```

4. Deploy the smart contract:
   ```bash
   npx hardhat run scripts/deploy.js --network yourNetwork
   ```

5. Update the DApp configuration with your deployed contract address.

### Running the DApp

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

## Deployment

To deploy the DApp to a decentralized hosting service like IPFS, follow these steps:

1. Build the DApp for production:
   ```bash
   npm run build
   ```

2. Deploy to IPFS using a service like Fleek:
   - Sign up for an account at [Fleek](https://fleek.co/).
   - Create a new site and follow the deployment instructions.

## Contributing

We welcome contributions to enhance the Cooperative Proposals Management DApp! If you have suggestions, bug reports, or would like to contribute code, please open an issue or submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-or-bugfix-name
   ```

3. Commit your changes:
   ```bash
   git commit -m "Description of your changes"
   ```

4. Push to your branch:
   ```bash
   git push origin feature-or-bugfix-name
   ```

5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Colour Scheme Details

Here are the exact hex values of the colours used in the `App.css` file for different elements:

1. **Body Background Color**
   - Hex Value: `#e0f7fa` (Very light teal background)

2. **Text Color**
   - Hex Value: `#34495e` (Darker text for better readability)

3. **App Background Color**
   - Hex Value: `#ffffff` (White background for better contrast)

4. **Header Text Color**
   - Hex Value: `#009688` (Bright teal color)

5. **Section Background Color**
   - Hex Value: `#e0f7fa` (Very light teal background)

6. **Input and Textarea Border Color**
   - Hex Value: `#009688` (Bright teal color)

7. **Button Background Color**
   - Hex Value: `#009688` (Bright teal color)

8. **Button Hover Background Color**
   - Hex Value: `#00796b` (Darker teal color on hover)


Thank you for your interest in the Cooperative Proposals Management DApp! We believe that decentralized solutions can transform the way organizations operate, and we are excited to have you join us on this journey. Together, we can build a more transparent, secure, and democratic future.
