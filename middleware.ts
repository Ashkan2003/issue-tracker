export { default } from "next-auth/middleware";

//this is the middleware functionality that is provided by next-auth so the only thing that we have to do is to config it.
export const config = {
  // every route in this array will secured by middleware
  // it means that is the user come to this route without login , it will redirected to the login or signup page
  matcher: ["/issues/new", "/issues/edit/:id+"],
};

// *: zero or more paramers
// +: one or more paramers
// ?: zero or one paramers
