import "./App.css";
import BookCard from "./Components/BookCard";
import CardContainer from "./Layout/CardContainer";
import Footer from "./Layout/Footer";
import NavBar from "./Layout/NavBar";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <CardContainer title="something">
        <BookCard></BookCard>
      </CardContainer>
      <Footer></Footer>
    </>
  );
}

export default App;
