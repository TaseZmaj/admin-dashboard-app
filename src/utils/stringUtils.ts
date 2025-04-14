function capitalize(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function normalizePathname(pathname: string) {
  return capitalize(pathname.slice(1).replace("-", " "));
}

export { capitalize, normalizePathname };
