import { useEffect } from 'react';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const LoginPrompt = ( { setAccessToken } ) => {
  /* Code Verifier */
  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  }


  /* Code Challenge */
  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  const handleLogin = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    // Store codeVerifier for later use
    localStorage.setItem('code_verifier', codeVerifier);

    // Redirect to Spotify auth
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    window.location.href = authUrl;
  }

  // Handle the callback from Spotify
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      getAccessToken(code)
    }
  }, []);

  const getAccessToken = async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', payload);
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorBody}`);
      }
      const data = await response.json();

      if (data.access_token) {
        // Store and set token
        sessionStorage.setItem('accessToken', data.access_token);
        setAccessToken(data.access_token);

        // Clean up URL
        window.history.replaceState({}, document.title, '/');

        // Clean up localStorage
        localStorage.removeItem('code_verifier');
      }
    } catch (error) {
      console.log('Error getting access token:', error)
    }
  };

  return (
    <div className="glass-panel">
      <p>In order to use this app, you must login using Spotify.</p>
      <button className="glass-button" onClick={handleLogin}>Login with Spotify</button>
    </div>
  )
}

export default LoginPrompt;