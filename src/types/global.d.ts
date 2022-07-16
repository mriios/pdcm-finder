export type ParsedChartData = {
    id: string;
    data: {
      x: string | number;
      y: number | null;
    }[];
}[];

export type ParsedData = {
  chartData: ParsedChartData;
  geneOptions: string[] | undefined;
  diagnosisOptions: string[] | undefined;
}