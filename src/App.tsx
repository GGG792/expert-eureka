import { useAppStore } from '@/store';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Home from '@/pages/Home';
import Editor from '@/pages/Editor';
import Scripts from '@/pages/Scripts';
import SettingsPage from '@/pages/Settings';

export default function App() {
  const { currentPage } = useAppStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'editor':
        return <Editor />;
      case 'scripts':
        return <Scripts />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <main className="pt-20 relative z-10">
        {renderPage()}
      </main>

      <BottomNav />
    </div>
  );
}
