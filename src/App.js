import React, { useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { queryParser } from "./utils/index";
import { requestAuthToken } from "./apis/api";

const Page = () => {
  const location = window.location;
  const domain = location.origin;
  console.log(domain);
  const { search } = useLocation();
  const { code } = queryParser(search);

  const getDiscordAuthToken = useCallback(async () => {
    try {
      console.log(domain);
      const result = await requestAuthToken({
        code,
        redirect_uri: domain,
      });
      console.log(result);
    } catch (e) {
      throw e;
    }
  }, [code, domain]);

  useEffect(() => {
    if (!!code) {
      getDiscordAuthToken();
    }
  }, [code]);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div>
        <div>Discord</div>
        <button
          onClick={() => {
            window.location =
              "https://discord.com/api/oauth2/authorize?client_id=1073174155798777937&redirect_uri=http%3A%2F%2F10.241.0.113%3A3000&response_type=code&scope=identify%20guilds";
          }}
        >
          Login To Discord
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Page />}></Route>
    </Routes>
  );
};

export default App;
