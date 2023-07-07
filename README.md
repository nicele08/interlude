# Interlude

Unlock the Power of High-Quality Breaks

Revolutionize productivity and well-being with Interlude. Empowering individuals and organizations to embrace rejuvenating breaks for optimal performance.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Interlude is a web application designed to help individuals and organizations harness the power of high-quality breaks. By embracing rejuvenating breaks, users can enhance their productivity and well-being, leading to optimal performance.

## Features

- Customizable session length and break duration
- End-of-session and end-of-break sound alarms
- Real-time countdown timer with session and break tracking
- Informative display of current phase and session/break number

## Getting Started

To get started with Interlude, follow these steps:

1. Clone the repository: `git clone https://github.com/nicele08/interlude.git`
2. Install the dependencies: `npm install`
3. Configure the environment variables in the `.env.local` file using `.env.local.example` as a template
4. Run the application: `npm dev` or `npm build` then `npm start`
5. Access Interlude in your browser at `http://localhost:3000`

## Usage

Interlude provides a simple and intuitive interface for managing your work sessions and breaks. Follow these steps to use the application:

1. Set your desired session length and break duration.
2. Click the "Start" button to begin the timer.
3. The timer will display the remaining time for the current session or break.
4. When the session or break ends, an end-of-session or end-of-break sound will play.
5. To stop the timer, click the "Stop" button.

## Configuration

Interlude allows you to configure various settings to customize your experience. These settings can be found in the `.env.local` file:

- `MONGODB_URI`: The URI of the MongoDB database.
- `JWT_SECRET`: The secret key used to sign the JWT.

Update these settings to meet your preferences and requirements.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please submit a pull request or open an issue on the GitHub repository.
