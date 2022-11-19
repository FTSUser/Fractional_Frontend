import { useCookie } from "./UseCookie";
export function FinalCookie(props) {
  const [cookie, setCookie] = useCookie("allow-cookie", {
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  });
  if (cookie) return null;
  return (
    <div className="cookie-cus-center-align">
      <div className="cookie-cus-box">
        <p>
          Our website uses cookies to help us improve your browsing and shopping experience.
        </p>
        <p>By continuing, you agree to our use of <span>cookies</span> . <span onClick={() => setCookie("true")}>Accept</span></p>
      </div>
    </div>
  );
}