import { makeStyles } from '@material-ui/core'
import React from 'react'
import { BrowserRouter,Route } from 'react-router-dom'
import Header from './Components/Header'
import Coinpages from './Pages/Coinpages'
import HomePages from './Pages/HomePages'
import Alert from "./Components/Alert";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight:"100vh",
  },
}));
const App = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Route path="/" component={HomePages} exact />
        <Route path="/coins/:id" component={Coinpages} exact />
      </div>
      <Alert />
    </BrowserRouter>
    
  )
}

export default App
