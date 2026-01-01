export const broadcastSignout = () => {
  localStorage.setItem("dadachat-signout", Date.now().toString());
};
