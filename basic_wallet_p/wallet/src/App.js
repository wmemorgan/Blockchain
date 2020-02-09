import React from "react";
import AppContainer from "./components/DesignComponents/AppStyles";

import Header from "./components/SharedComponents/Header";
import Routes from "./Routes";

const App = () => {
	return (
		<AppContainer>
			<Header />
			<Routes />
		</AppContainer>
	);
};

export default App;
