export type GeneData = {
  x: string | number;
  y: number | null;
  diagnosis: string;
}

export type ParsedChartData = {
    id: string;
    data: GeneData[];
}[];

export type ParsedData = {
  chartData: ParsedChartData;
  geneOptions: string[] | undefined;
  diagnosisOptions: string[] | undefined;
  allValues: string[] | undefined;
}