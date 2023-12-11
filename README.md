# Pronto Portal

Pronto Portal is a Next.js web application designed to streamline the management and coordination of translators and interpreters. It provides a comprehensive platform for scheduling, tracking, and facilitating communication between language professionals and their clients.

## Getting Started

These instructions will guide you in setting up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following tools installed:

-   [Node.js](https://nodejs.org/en/) (preferably the latest stable version)
-   [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the Repository**

    Clone the repository to your local machine:

    ```bash
    git clone https://github.com/pronto-portal/pronto-portal.git
    cd pronto-portal
    ```

2. **Set Up Environment Variables**

    Copy the `env.example` file to a new file named `.env.local` in the root of the project and populate it with the necessary environment variables:

    ```env
    # .env.local
    NEXT_PUBLIC_API_URL=[Backend API URL]
    GOOGLE_CLIENT_ID=[Your Google Client ID]
    GOOGLE_CLIENT_SECRET=[Your Google Client Secret]
    # Add other necessary environment variables here
    ```

3. **Install Dependencies**

    Install the project dependencies:

    ```bash
    npm install
    ```

4. **Run the Application**

    Start the development server:

    ```bash
    npm run dev
    ```

    The application will be running at [http://localhost:3000](http://localhost:3000).

### Setting Up Google Login

To use Google login, you must configure it in the Google Developers Console:

1. Go to the [Google Developers Console](https://console.developers.google.com/).
2. Create a new project or select an existing one.
3. In the "Credentials" section, create credentials for an OAuth 2.0 client ID.
4. Ensure that your specific Google email address is added and verified in the Google Developers Console to use it for login in this application.

**Note:** The Google account used for login must be correctly set up and verified in the Google Developers Console to prevent issues with account verification during login.

### Backend and Stripe Webhook

For the Pronto Portal to function correctly, the backend API needs to be running, with the Stripe webhook active:

1. Ensure the backend server is up and running. Refer to the [Pronto Portal Backend Repository](https://github.com/pronto-portal/pronto-api) for setup instructions.
2. Make sure the Stripe webhook is configured and active, as it is crucial for handling payments and related functionalities in the application.
