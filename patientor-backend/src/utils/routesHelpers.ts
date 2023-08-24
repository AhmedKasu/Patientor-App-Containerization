const arrayToRecordByKey = <T>(items: T[], key: keyof T): Record<string, T> => {
  return items.reduce((acc, item) => {
    acc[String(item[key])] = item;
    return acc;
  }, {} as Record<string, T>);
};

export default arrayToRecordByKey;
