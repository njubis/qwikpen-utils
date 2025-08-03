export const renameObjectKey = function <T extends Record<string, any>>(
  obj: T,
  oldName: keyof T,
  newName: string,
) {
  const oldToNew = {
    [oldName]: newName,
  };
  const renamed = Object.fromEntries(
    Object.entries(obj).map(([key, val]) => {
      return [oldToNew[key] || key, val];
    }),
  );
  return renamed;
};
