import Subforum from './components/Subforum';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ForumContextProvider from './context/ForumContextProvider';
import Thread from './components/Thread';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ForumContextProvider>
          <main className="container">
            <Switch>
              <Route exact path="/" component={Subforum} />
              <Route exact path="/threads" component={Thread} />
            </Switch>
          </main>
        </ForumContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
