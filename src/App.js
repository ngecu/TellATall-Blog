import logo from './logo.svg';
import HomeScreen from './screens/HomeScreen';
import './style.css'
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';

function App() {
  return (
    <>
     <Header/>
    <div className="App"   style={{minHeight: "75rem",paddingTop:"4.5rem",backgroundColor:"#f2f3f5"}}>
      <HomeScreen/>
    
    </div>
    <Footer/>
    </>
    
  );
}

export default App;
