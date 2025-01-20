import { Router } from '@/router/Routes.tsx';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <div className="font-sans">
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </div>
  );
}

export default App;
