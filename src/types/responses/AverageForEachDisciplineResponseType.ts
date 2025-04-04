export type AverageForEachDisciplineResponseType = {
  averageByDiscipline: Map<string, number>;
  links: [
    {
      rel: string;
      href: string;
      type: string;
      template: boolean;
    }
  ];
};
