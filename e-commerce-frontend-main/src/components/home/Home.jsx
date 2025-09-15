import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BestDealsHome from "./BestDealsHome";
import BestOfElectronics from "./BestOfElectronics";
import BestSellersHome from "./BestSellersHome";
import SearchBar from "./SearchBar";
import TopStyles from "./TopStyles";
import Alert from "../Alert.jsx";

const Home = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState("");
    const [alert, setAlert] = useState(null);
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (state?.alert) {
            setAlert(state.alert);
            // Clear the navigation state to prevent alert reappearing on back/forward navigation
            navigate("/", { state: {}, replace: true });
        }
    }, [state, navigate]);

    const handleSearchResults = (results, searchQuery) => {
        setSearchResults(results);
        setQuery(searchQuery);
    };

    return (
        <>
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}
            <SearchBar onSearchResults={handleSearchResults} />

            {/* Render default sections only when no search query */}
            {!query && (
                <>
                    <BestOfElectronics />
                    <TopStyles />
                    <BestDealsHome />
                    <BestSellersHome />
                </>
            )}
        </>
    );
};

export default Home;