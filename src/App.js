import React, { useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { queryParser } from "./utils/index";
import { requestAuthToken, requestTweeterAuthToken } from "./apis/api";

const Page = () => {
  const location = window.location;
  const domain = location.origin;
  console.log(domain);
  const { search } = useLocation();
  const { code, state } = queryParser(search);
  console.log(state);
  const getDiscordAuthToken = useCallback(async () => {
    try {
      const result = await requestAuthToken({
        code,
        redirect_uri: domain,
      });
      console.log(result);
    } catch (e) {
      throw e;
    }
  }, [code, domain]);

  const getTweeterAuthToken = useCallback(async () => {
    try {
      const result = await requestTweeterAuthToken({
        code,
      });
      console.log(result);
    } catch (e) {
      throw e;
    }
  }, [domain, code]);

  useEffect(() => {
    if (!!code) {
      getDiscordAuthToken();
      getTweeterAuthToken();
    }
  }, [code]);

  useEffect(() => {}, []);

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
      <div>
        <div>Tweeter</div>
        <button
          onClick={() => {
            const encodedURL = encodeURIComponent("http://10.211.0.130:3000");
            window.location = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=ZDdOa0RjWlJYLWZQUHFHa0tCMmw6MTpjaQ&redirect_uri=${encodedURL}&scope=tweet.read%20users.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;
            // getTweeterAuthToken();
          }}
        >
          Login To Tweeter
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
