import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from "./Login/Login";
import {Routes, Route} from 'react-router-dom'
import AuctionList from "./AuctionList/AuctionList";
import AuctionDetail from "./AuctionDetail/AuctionDetail";

function App() {

    return (
        <Routes>
            <Route path={"/"} element={<Login/>} />
            <Route
                path={"/list"}
                element={<AuctionList />}
            />
            <Route path={"/list/:no"} element={<AuctionDetail />} />

        </Routes>
    );
};

export default App;
