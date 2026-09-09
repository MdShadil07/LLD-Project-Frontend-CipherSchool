import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Landing Page/HomePage';
import LoginPage from './pages/Login Page/LoginPage';
import SignupPage from './pages/Signup Page/SignupPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProblemPage from './pages/Problem/ProblemPage';
import ProblemsPage from './pages/Problems/ProblemsPage';
import { ThemeProvider } from './contexts/ThemeContext';
import PracticePage from './pages/Practice Page/Practice';
import EvaluationPage from './pages/Evaluation Page/EvaluationPage';
import MyAttemptsPage from './pages/My Attempts/MyAttemptsPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/practice/:id" element={<PracticePage />} />
        <Route path="/my-attempts" element={<MyAttemptsPage />} />
        <Route path="/evaluation/:attemptId" element={<EvaluationPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/parking-lot" element={<ProblemPage />} />
        <Route path="/problems/:slug" element={<ProblemPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
