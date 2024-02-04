import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import UserList from "./components/UserList";

function App() {
  return (
    <div className=" flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-blue-600">
      <div className="App">
        <h1 className=" ">Hello world!</h1>
        <UserList />
      </div>
    </div>
  );
}

export default App;
