export function handleActionResponseClient(response: unknown) {
  if (typeof window === "undefined") return;
  if (response && typeof response === "object") {
    if (
      "error" in response &&
      typeof response.error === "string"
    ) {
      const url = new URL(window.location.toString());
      url.searchParams.set("error", response.error);
      history.pushState({}, "", url);
    } else if (
      "successMsg" in response &&
      typeof response.successMsg === "string"
    ) {
      const url = new URL(window.location.toString());
      url.searchParams.set("successMsg", response.successMsg);
    }
  }
}
