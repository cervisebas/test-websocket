export function slicePath(path: string) {
  let secondSlide = path.slice(1).indexOf('/');
  secondSlide = secondSlide === -1 ? -1 : secondSlide + 1;

  const module = path.slice(0, secondSlide);
  const route = secondSlide === -1 ? '' : path.slice(secondSlide);

  return {
    module: module.slice(1),
    route: route.slice(1),
  };
}
