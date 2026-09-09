import Navbar from '../../components/Landing Page/Navbar';
import Hero from '../../components/Landing Page/Hero';
import HowItWorks from '../../components/Landing Page/HowItWorks';
import PopularProblems from '../../components/Landing Page/PopularProblems';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <PopularProblems />
      </main>
    </div>
  );
}
