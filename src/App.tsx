import { Slide, ToastContainer } from 'react-toastify';
import { Layout } from './components/Layout';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Layout>
      <AppRoutes />
      <ToastContainer
        autoClose={3000}
        position="bottom-right"
        draggable
        theme="light"
        transition={Slide}
      />
    </Layout>
  );
}

export default App;
