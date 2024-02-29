import React, { useEffect } from "react"
import config from "./config.json"
import Home from "./home"
import { Hex2Rgba } from "utils/helpers";

const App = () => {

    useEffect(() => {
        document.title = config.name
    }, [])

    return (
            <Home />
    )
}

export default App