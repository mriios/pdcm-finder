const parseHeatmapData = (tsv) => {
  const parsedData = [],
    geneOptions = [],
    diagnosisOptions = [],
    allValues = [];

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
      y: gene.z_score,
      diagnosis: gene.diagnosis
    });

    return r;
  }, {});

  for (const modelId in dividedData) {
    // structure data for chart
    const modelData = dividedData[modelId];

    let averagedValues = Object.entries(
      modelData.reduce(
        (acc, { x, y }) => ({
          ...acc,
          [x]: [...(acc[x] || []), y]
        }),
        {}
      )
    )
      .map(([x, ys]) => {
        let currentDiagnosis = modelData.find((el) => el.x === x).diagnosis;
        let geneAveragedValue =
          ys.reduce((acc, cur) => acc + cur, 0) / ys.length;

        if (diagnosisOptions.indexOf(currentDiagnosis) === -1) {
          diagnosisOptions.push(currentDiagnosis);
        }

        if (allValues.indexOf(geneAveragedValue) === -1) {
          allValues.push(geneAveragedValue);
        }

        return {
          x,
          y: geneAveragedValue,
          diagnosis: currentDiagnosis
        };
      })
      .sort((a, b) => {
        if (b.diagnosis > a.diagnosis) {
          return -1;
        }
        if (a.diagnosis > b.diagnosis) {
          return 1;
        }
        return 0;
      });

    parsedData.push({
      id: modelId,
      data: averagedValues
    });

    geneOptions.push(modelId);
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

  allValues.sort((a, b) => b - a);

  return { chartData: parsedData, geneOptions, diagnosisOptions, allValues };
};

export default parseHeatmapData;
