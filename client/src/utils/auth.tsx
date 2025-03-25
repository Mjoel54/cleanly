import { type JwtPayload, jwtDecode } from "jwt-decode";

// Extending the JwtPayload interface to include additional data fields specific to the application.
interface ExtendedJwt extends JwtPayload {
  data: {
    username: string;
    email: string;
    id: string;
  };
}

class AuthService {
  // This method decodes the JWT token to get the user's profile information.
  getProfile() {
    const token = this.getToken();
    if (!token) {
      throw new Error("Unauthorised");
    }
    return jwtDecode<ExtendedJwt>(token);
  }

  // This method checks if the user is logged in by verifying the presence and validity of the token.
  loggedIn() {
    const token = this.getToken();
    // Returns true if the token exists and is not expired.
    return token ? !this.isTokenExpired(token) : false;
  }

  // This method checks if the provided token is expired.
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded?.exp ? decoded.exp < Date.now() / 1000 : true;
    } catch {
      // If we can't decode the token, it's invalid and should be considered expired
      return true;
    }
  }

  // This method retrieves the ID token from localStorage and throws an error if not found.
  getToken(): string {
    const idToken = localStorage.getItem("id_token");
    if (!idToken) {
      throw new Error("Unauthorised");
    }
    return idToken;
  }

  // This method logs in the user by storing the token in localStorage and redirecting to the home page.
  login(idToken: string): void {
    try {
      // Validate the token before storing
      jwtDecode<ExtendedJwt>(idToken);
      localStorage.setItem("id_token", idToken);
      window.location.assign("/");
    } catch {
      throw new Error("Unauthorised");
    }
  }

  // This method logs out the user by removing the token from localStorage and redirecting to the home page.
  logout(): void {
    try {
      localStorage.removeItem("id_token");
      window.location.assign("/");
    } catch {
      // If localStorage fails, we should still try to redirect
      window.location.assign("/");
    }
  }
}

export default new AuthService();
