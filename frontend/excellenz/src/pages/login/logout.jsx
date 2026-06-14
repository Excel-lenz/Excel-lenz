export function logout(navigate) {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("companySetupDone");
  localStorage.removeItem("user");

  navigate("/");
}