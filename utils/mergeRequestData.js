export const mergeRequestData = (req) => {
  return { ...req.body, ...req.query };
};
