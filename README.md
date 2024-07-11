# Bhujo Expense Tracker

Bhujo Expense Tracker is a web application designed to help users monitor their expenses and provide various analyses to better understand their financial habits. 

## Features

- **Authentication**: JWT token-based user login/signup.
- **Expense/Income Tracking**: Categorized tracking of expenses and incomes.
- **Visualization**: Dynamic charts and tables for financial data.
- **Data Export**: PDF export functionality for user records.
- **Analysis**: Tabular and graphical transaction views.

## Tools and Technologies

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MongoDB

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Utkarsha-Pandey/bhujo.git
   cd bhujo
Install dependencies:

bash
Copy code
npm install
cd client
npm install
cd ..
Set up environment variables:

Create a .env file in the root directory and add the following:

makefile
Copy code
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the application:

bash
Copy code
npm run dev
The application should now be running on http://localhost:3000.

Usage
Register/Login:

Create a new account or log in using existing credentials.
Track Expenses/Income:

Add, edit, and delete expense/income entries.
View Analysis:

Use the dashboard to view categorized expense/income data.
Utilize dynamic charts and tables for detailed financial analysis.
Export Data:

Export your financial records to PDF for offline access and sharing.
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.

Fork the repository
Create your feature branch (git checkout -b feature/YourFeature)
Commit your changes (git commit -m 'Add some feature')
Push to the branch (git push origin feature/YourFeature)
Open a pull request
License
This project is licensed under the MIT License.

Contact
For any inquiries, please reach out to Us.
