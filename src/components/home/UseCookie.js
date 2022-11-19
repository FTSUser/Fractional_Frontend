import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export function useCookie(name, options) {
  const [data, setData] = useState(cookies.get(name, options) || null);
  const onCookieChange = ({
    name: _name,
    value = null,
    options: _options = {},
  }) => {
    if (_name === name) {
      options = _options;
      setData(value);
    }
  };
  const setCookie = (value) => {
    cookies.set(name, value, options);
    setData(value);
  };
  useEffect(() => {
    cookies.addChangeListener(onCookieChange);
    return () => {
      cookies.removeChangeListener(onCookieChange);
    };
  });
  return [data, setCookie];
}