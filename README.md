# Dragon's hoard Exchange

A dead simple D&D currency converter designed to make your adventuring life easier! With this tool, you can seamlessly manage and distribute treasure across your party, convert it into optimal denominations, and even check its real-world value in USD.

---

## Features

- **Optimal Distribution**: Automatically calculates the best distribution of D&D currencies (gold, silver, copper, platinum) for any input value.
- **Electrum-Free**: Electrum is ignored entirely for a smoother experience (because who likes electrum, anyway?).
- **Party Splitting**: Divide treasure equally among party members, with leftover amounts clearly displayed.
- **USD Conversion**: See the converted treasure value in USD for a fun perspective.

---

## Getting Started

### Prerequisites

- **Node.js** (version 18 or higher recommended)
- **pnpm** (installed globally on your machine)

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd dnd-currency-converter
pnpm install
```

### Running the Project

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5174`.

### Building for Production

Generate a production build:

```bash
pnpm build
```

### Running Tests

Execute the test suite to ensure everything works as expected:

```bash
pnpm tests
```

---

## Tech Stack

- **Frontend Framework**: [Vue](https://vuejs.org/)
- **Routing**: [vue-router](https://router.vuejs.org/)
- **Styling**: CSS Modules for scoped styling
- **Build Tool**: [Vite](https://vitejs.dev/)

---

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests. Ensure all changes pass the test suite before submitting a PR.

---

Enjoy treasure hunting! 🪙✨
