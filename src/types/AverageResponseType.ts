type AverageResponseType = {
  average: number;
  links: [
    {
      rel: string;
      href: string;
      type: string;
      template: boolean;
    }
  ];
};

export type { AverageResponseType as AverageResponse };
