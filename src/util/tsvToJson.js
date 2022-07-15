const tsvToJson = (tsv) => {
  const parsedData = [];

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

  const dividedData = jsonData.reduce(function (r, gene) {
    (r[gene.gene_symbol] = r[gene.gene_symbol] || []).push({
      x: gene.model_id,
      y: gene.z_score
    });

    return r;
  }, {});

  for (const modelId in dividedData) {
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

  return parsedData;
};

export default tsvToJson;
