import logo from './logo.svg';
import HomeScreen from './screens/HomeScreen';
import './style.css'
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import PostScreen from './screens/PostScreen';
function App() {
  return (
    <Router>
    
     <Header/>
    <div className="App"   style={{minHeight: "75rem",paddingTop:"4.5rem",backgroundColor:"#f2f3f5"}}>
      <Route path="/" component={HomeScreen} exact />    
      <Route path="/post/:id" component={PostScreen}/>
    </div>
    <Footer/>
    </Router>
    
  );
}

export default App;
