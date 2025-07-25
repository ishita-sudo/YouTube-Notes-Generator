import { Routes, Route } from 'react-router-dom';
import Generate from './components/Generate';
import Landinpage from './components/Landinpage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landinpage />} />
    <Route path="/generate" element={<Generate />} />
  </Routes>
);

export default AppRoutes;