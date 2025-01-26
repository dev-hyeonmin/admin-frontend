import { Router } from '@/router/Routes.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { ModalProvider } from '@/module/react-modal';

function App() {
  return (
    <div className="font-sans">
      <HelmetProvider>
        <ModalProvider>
          <Router />
        </ModalProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
