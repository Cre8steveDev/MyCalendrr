# MyCalendrr - Neon Open Source Starter Kit

MyCalendrr is a powerful open source starter kit for building a multi-user appointment manager application. It uses a Neon Postgres database for efficient data storage and retrieval. The project is my submission for the Neon OSS Starter Kit Challenge on DEV and aims to provide developers with a solid foundation for quickly setting up a ReactJS Frontend and Flask Server Project in developing appointment management applications.

## Features

- Multi-user support: MyCalendrr allows multiple users to manage their appointments efficiently and share links to clients to book appointments.
- Frontend Stack: TypeScript-ReactJS, TailwindCSS, and Vite.
- Backend: Python/Flask and SQLAlchemy and Neon Postgres Database.
- Monorepo setup: This kit follows a monorepo setup, allowing for better code organization and easier collaboration among developers.
- GitHub Actions workflow: Basic setup for GitHub Actions workflow - customizable based on your project needs.

## Getting Started

- Clone the repository:

```bash
git clone https://github.com/Cre8steveDev/Neon_Postgres_Flask_SqlAlchemy_ReactJS_Starter_Kit.git
```

- Install the required dependencies

```bash
# For the frontend
cd client && npm install

# For the backend
cd server && python3 -m venv ./venv

# On Linux Machines
source ./venv/bin/activate

# Install dependencies for the backend
pip install -r requirements.txt

```

## Update Credentials in the .env in the server/ directory

```bash
DEV_BRANCH_NEON_DATABASE_URI=""
MAIN_BRANCH_NEON_DATABASE_URI=""
FLASK_APP_SECRET=""

```

## Start the Project

1. Start the frontend development server: `npm run dev`
2. Start the backend server: `python app.py`
3. Access MyCalendrr in your browser at `http://localhost:3000`

## Contributing

Update coming soon. Till then, happy coding.

## License

MyCalendrr is released under the [MIT License](LICENSE).

## AUTHOR

- Stephen Omoregie: Creator and maintainer of MyCalendrr

## 🙏 Acknowledgements

Thanks to Neon for hosting this challenge and providing an amazing Postgres platform!
Challenge Link: <https://dev.to/t/neonchallenge>
