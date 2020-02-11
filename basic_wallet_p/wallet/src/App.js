import React from "react";
import axios from "axios";

import AppContainer from "./components/DesignComponents/AppStyles";
import Header from "./components/SharedComponents/Header";
import Routes from "./Routes";

axios.defaults.baseURL = "http://localhost:5000";

const App = () => {
	return (
		<AppContainer>
			<Header />
			<Routes />
		</AppContainer>
	);
};

export default App;
