import { queryStringCreator } from "../utils/index";
const DISCORD_ENDPOINT = "https://discord.com";
const DISCORD_CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.REACT_APP_DISCORD_CLIENT_SECRET;
const v_1 = "1.1";
const v_2 = "2.0";
const PATH = {
  oauth_2: "/api/oauth2/token",
};
const DISCORD_AUTH_PARAMS = {
  client_id: DISCORD_CLIENT_ID,
  client_secret: DISCORD_CLIENT_SECRET,
  grant_type: "authorization_code",
};

const requestAuthToken = async (params) => {
  try {
    const authParams = {
      ...DISCORD_AUTH_PARAMS,
      ...params,
    };
    console.log(authParams);
    await post(`https://discord.com/api/oauth2/token`, {
      ...authParams,
    });
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
        Accept: "application/json",
        "Content-Type": "application/json",
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

const post = async (domain, params) => {
  try {
    const headers = {};

    const param = new URLSearchParams();
    const keys = Object.keys(params);
    keys.map((el) => {
      param.append(el, params[el]);
    });
    const rsp = await fetch(domain, {
      method: "POST",
      headers: {
        ...headers,
        Accept: "application/json",
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

export { requestAuthToken };
