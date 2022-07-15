const tsvToJson = (tsv) => {
  const parsedData = [];

  // tsv to json format
  const [headers, ...rows] = tsv
    .trim()
    .split("\n")
    .map((r) => r.split("\t"));

  const jsonData = rows.reduce(
    (a, r) => [
      ...a,
      Object.assign(
        ...r.map((x, i, _, c = x.trim()) => ({
          [headers[i].trim()]: isNaN(c) ? c : Number(c)
        }))
      )
    ],
    []
  );

  // divide data into gene symbols
  const dividedData = jsonData.reduce((r, gene) => {
    (r[gene.gene_symbol] = r[gene.gene_symbol] || []).push({
      x: gene.model_id,
      y: gene.z_score
    });

    return r;
  }, {});

  for (const modelId in dividedData) {
    // structure data for chart
    const modelData = dividedData[modelId];
    const averagedValues = Object.entries(
      modelData.reduce(
        (acc, { x, y }) => ({
          ...acc,
          [x]: [...(acc[x] || []), y]
        }),
        {}
      )
    ).map(([x, ys]) => ({
      x,
      y: ys.reduce((acc, cur) => acc + cur, 0) / ys.length
    }));

    parsedData.push({
      id: modelId,
      data: averagedValues
    });
  }

  // sort data by gene symbol
  parsedData.sort((a, b) => {
    if (b.id > a.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  });

  return parsedData;
};

export default tsvToJson;
