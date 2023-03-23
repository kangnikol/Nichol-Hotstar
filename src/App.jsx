import "./App.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Routes from "./config/Routes"

function App() {
  return (
    <Router>
      <Route
        render={(props) => (
          <>
            <div className="bg-gray-900">
              <Header {...props} />
              <Routes />
              <Footer />
            </div>
          </>
        )}
      />
    </Router>
  )
}

export default App
