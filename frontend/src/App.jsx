import Chatbot from '@/components/Chatbot';
import logo from '@/assets/images/logo.png';

function App() {
  return (
    <div className='flex flex-col min-h-screen w-full max-w-3xl mx-auto px-4'>
      <header className='relative shrink-0 z-20 bg-white'>
        <div className='flex flex-col items-center gap-2 py-4'>
          <a
            href='https://tech-trends-chatbot-2ey.pages.dev'
            className='flex items-center justify-center bg-gray-800 p-4 rounded-md'
            aria-label='Navigate to Tech Trends Chatbot Home'
          >
            <img src={logo} className='w-32' alt='Tech Trends Chatbot Logo' />
          </a>
          <h1 className='font-urbanist text-xl font-semibold text-center'>
            Stock Analysis Assistance
          </h1>
        </div>
      </header>
      <main className='flex-grow'>
        <Chatbot />
      </main>
    </div>
  );
}

export default App;
