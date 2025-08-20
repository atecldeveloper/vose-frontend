// "postbuild": "react-snap",
export const variables = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  // apiUrl: 'http://localhost:8090',
  local_storage_version: "CONTEXT_LPIN_VERSION_1.0",
  baseUrl: "/",
  websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL,
  EMAIL_SERVICE_ADDRESS: "info@atecl.com.my",
  tinymce_key: "w1p9ygpbxjg9p1ekwgdjz0tesslhwry0wylgwqbvw32ku2rj",
  requestCode: {
    "400": "Invalid request params",
    "401": "Request unauthorized",
    "403": "Permission denied",
    "404": "Page not found",
    "500": "Something went wrong, please try again",
  },
};
