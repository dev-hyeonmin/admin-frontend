import {Router} from '@/router/Routes.tsx';
import {HelmetProvider} from 'react-helmet-async';
import {ModalProvider} from '@/module/react-modal';
import ReactQueryProvider from "@/api/query";

function App() {
  return (
    <div className="font-sans">
      <HelmetProvider>
        <ModalProvider>
          <ReactQueryProvider>
            <Router/>
          </ReactQueryProvider>
        </ModalProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
