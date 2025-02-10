# Journey Builder React Coding Challenge

This project is a solution to the **Journey Builder React Coding Challenge**. The challenge involves reimplementing a small portion of a node-based UI that displays a Directed Acyclic Graph (DAG) of forms. The UI allows users to configure prefill mappings for form fields, where values from one form can be used to prefill fields in downstream forms.

## Overview

The application consists of the following key features:

1. **Rendering a DAG of Forms**: The UI renders nodes and edges based on data fetched from the `action-blueprint-graph-get` endpoint.
2. **Prefill Configuration**: Users can configure prefill mappings for form fields. The prefill data can come from:
   - Directly dependent forms (e.g., Form B for Form D).
   - Transitively dependent forms (e.g., Form A for Form D).
   - Global data (e.g., Action Properties or Client Organization Properties).
3. **Prefill Modal**: A modal allows users to select the source of prefill data for a specific field.

## Prerequisites

- **React**: The project is built using React.
- **TypeScript**: TypeScript is used for type safety.
- **Build Tool**: The project uses Vite.
- **Mock Server**: A mock server is provided in this [repository](https://github.com/mosaic-avantos/frontendchallengeserver) to simulate the `action-blueprint-graph-get` endpoint.

## Local Development

### Prerequisites

- PNPM (preferred package manager)

### Setup

#### Server App

Please navigate to this [repository](https://github.com/mosaic-avantos/frontendchallengeserver) and follow instructions.

#### Client App

1. Clone the repository:
   ```bash
   git clone git@github.com:BajicMladen/journey-builder-challenge.git
   cd journey-builder-challenge
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start development servers:
   ```bash
   pnpm run dev
   ```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.
