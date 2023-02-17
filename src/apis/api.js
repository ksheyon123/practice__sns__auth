import { queryStringCreator } from "../utils/index";

const DISCORD_ENDPOINT = "https://discord.com";
const TWITTER_ENDPOINT = "https://api.twitter.com";
const DISCORD_CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.REACT_APP_DISCORD_CLIENT_SECRET;
const TWITTER_CLIENT_ID = process.env.REACT_APP_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.REACT_APP_TWITTER_CLIENT_SECRET;
const TWITTER_BEARER_TOKEN = process.env.REACT_APP_TWITTER_BEARER_TOKEN;
const v_1 = "1.1";
const v_2 = "2.0";
const PATH = {
  discord: {
    oauth_2: "/api/oauth2/token",
  },
  twitter: {
    oauth_2: "/2/oauth2/token",
  },
};
const DISCORD_AUTH_PARAMS = {
  client_id: DISCORD_CLIENT_ID,
  client_secret: DISCORD_CLIENT_SECRET,
  grant_type: "authorization_code",
};

const TWITTER_AUTH_PARAMS = {
  client_id: TWITTER_CLIENT_ID,
  // client_secret: TWITTER_CLIENT_SECRET,
  grant_type: "authorization_code",
  code_verifier: "challenge",
  redirect_uri: encodeURIComponent("http://10.211.1.22:3000/callback"),
};

const requestAuthToken = async (params) => {
  try {
    const authParams = {
      ...DISCORD_AUTH_PARAMS,
      ...params,
    };
    console.log("Discord", authParams);
    await post(
      `${DISCORD_ENDPOINT}${PATH.discord.oauth_2}`,
      {
        ...authParams,
      },
      {},
      {}
    );
  } catch (e) {
    throw e;
  }
};

const requestTweeterAuthToken = async (params, queryString) => {
  try {
    const authParams = {
      ...TWITTER_AUTH_PARAMS,
      ...params,
    };
    console.log("authParams", authParams);
    console.log(
      "Twitter",
      btoa(`${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}$`)
    );
    const rsp = await post(
      `${TWITTER_ENDPOINT}${PATH.twitter.oauth_2}`,
      {},
      { ...authParams },
      {}
    );
    console.log(rsp);
  } catch (e) {
    throw e;
  }
};

const get = async (domain, params) => {
  try {
    const queryStr = queryStringCreator(params);
    const headers = {};
    const rsp = await fetch(`${domain}${queryStr}`, {
      method: "GET",
      headers: {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (rsp.ok) {
      const data = await rsp.json();
      return data;
    } else {
      throw new Error(JSON.stringify({ code: rsp.status }));
    }
  } catch (e) {
    throw e;
  }
};

const post = async (domain, params, queryString, headers) => {
  try {
    const qs = queryStringCreator(queryString);
    const param = new URLSearchParams();
    const keys = Object.keys(params);
    keys.map((el) => {
      param.append(el, params[el]);
    });
    const rsp = await fetch(`${domain}${qs}`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: param,
    });
    const data = await rsp.json();
    console.log(data);
    if (rsp.ok) {
      return data;
    } else {
      throw new Error(JSON.stringify({ code: rsp.status }));
    }
  } catch (e) {
    throw e;
  }
};

export { requestAuthToken, requestTweeterAuthToken };
