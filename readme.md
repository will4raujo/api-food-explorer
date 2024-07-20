# API Project Food Explorer

This project is a Node.js API that provides various endpoints for managing resources. The project is structured to be easily extensible and maintainable.

## Installation

To get started with this project, you'll need to clone the repository and install the required dependencies.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later recommended)
- [Git](https://git-scm.com/)

## Steps

1. **Clone the repository:**

```sh
  git clone https://github.com/will4raujo/api-food-explorer.git
```

2. **Install Node Dependence**

```sh
  npm install
```

3. **Environment Variables**

Before running the application, make sure to set up your environment variables. replace the ".env.example" file in the root of the project to ".env", and add the following variables:

```sh
AUTH_SECRET=your_auth_secret
PORT=your_preferred_port
```

Replace your_auth_secret with a secret key for authentication and your_preferred_port with the port number you want the application to run on (e.g., 3333).

## Usage

To start the development server and view the application, run:

```sh
npm run dev
```